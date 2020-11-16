<template>
    <div class="landing-preview-lead" :style="landingBackStyle">
        <div class="landing-container">
            <div class="landing-header">
                <div class="landing-logo">
                    <img
                        v-if="landingData.logo"
                        :src="`${mediaURL}${landingData.logo}`"
                        alt="Logo"
                    />
                    <img v-else :src="defaultLogo" alt="Logo" />
                </div>
            </div>
            <div class="landing-body">
                <div class="real-body">
                    <b-row>
                        <b-col cols="12" md="9" xl="6" class="text-content">
                            <h1 class="title">
                                {{ landingData.headline }}
                            </h1>
                            <div class="description">
                                {{ landingData.body }}
                            </div>
                            <b-form-group v-if="url" class="email-form">
                                <template v-slot:label>
                                    <span class="font-weight-bold">
                                        Email Address
                                    </span>
                                </template>
                                <b-form-input
                                    v-model="$v.form.email.$model"
                                    type="email"
                                    placeholder="Email"
                                    :state="!$v.form.email.$error"
                                ></b-form-input>
                                <b-form-invalid-feedback>
                                    <template v-if="!$v.form.email.required">
                                        Enter a email.
                                    </template>
                                    <template v-else-if="!$v.form.email.email">
                                        Enter a vaild email.
                                    </template>
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group v-else class="email-form">
                                <template v-slot:label>
                                    <span class="font-weight-bold">
                                        Email Address
                                    </span>
                                </template>
                                <b-form-input />
                            </b-form-group>
                            <BasicButton
                                class="btn-signup"
                                :style="{
                                    backgroundColor: landingData.button_color,
                                    borderColor: landingData.button_color,
                                }"
                                @click="handleSignupClick()"
                            >
                                Sign Up
                            </BasicButton>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import { api } from '~/services'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'LandingPreviewLead',
    props: {
        landingData: {
            type: Object,
        },
        url: {
            type: String,
        },
    },
    data: () => ({
        mediaURL: appConstants.mediaURL,
        defaultLogo: appConstants.emailDefaultLogo,
        form: {
            email: '',
        },
    }),
    validations: {
        form: {
            email: {
                required,
                email,
            },
        },
    },
    computed: {
        landingBackStyle() {
            return {
                backgroundImage: `url(${this.mediaURL}${this.landingData.background_image})`,
            }
        },
    },
    methods: {
        async handleSignupClick() {
            if (!this.url) return
            this.$v.form.$touch()
            if (this.$v.form.$invalid) {
                return
            }
            const params = {
                landing_page_id: this.landingData.id,
                user_id: this.landingData.user_id,
                email: this.form.email,
            }
            console.log(params)
            const {
                status,
                message,
                error,
            } = await api.profiles.addPageSubscriber(params)
            if (status === 'success') {
                this.$toast.success(message)
            } else {
                this.$toast.error(error)
            }
        },
    },
}
</script>
