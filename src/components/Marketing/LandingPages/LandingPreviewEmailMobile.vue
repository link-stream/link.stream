<template>
    <div class="landing-preview-email">
        <div class="landing-content mobile">
            <div class="landing-frame" :style="landingBackStyle">
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
                        <b-row class="m-0">
                            <b-col
                                cols="12"
                                sm="6"
                                class="artwork-container p-0"
                            >
                                <img
                                    v-if="landingData.artwork"
                                    :src="`${mediaURL}${landingData.artwork}`"
                                    alt="Artwork"
                                />
                                <img v-else :src="defaultCoverArt" />
                            </b-col>
                            <b-col cols="12" sm="6" class="text-content">
                                <h1 class="title">
                                    {{ landingData.headline }}
                                </h1>
                                <div class="description">
                                    {{ landingData.body }}
                                </div>
                                <div v-if="url">
                                    <b-form-group label="Name">
                                        <b-form-input
                                            v-model="$v.form.name.$model"
                                            placeholder="Name"
                                            :state="!$v.form.name.$error"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>
                                            <template v-if="!$v.form.name.required">
                                                Enter a name.
                                            </template>
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group label="Email">
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
                                </div>
                                <div v-else>
                                    <b-form-group label="Name">
                                        <b-form-input />
                                    </b-form-group>
                                    <b-form-group label="Email">
                                        <b-form-input />
                                    </b-form-group>
                                </div>
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
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import { api } from '~/services'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: 'LandingPreviewEmailMobile',
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
        defaultCoverArt: appConstants.defaultCoverArt,
        form: {
            email: '',
            name: '',
        },
    }),
    validations: {
        form: {
            email: {
                required,
                email,
            },
            name: {
                required,
            },
        },
    },
    computed: {
        landingBackStyle() {
            return {
                backgroundColor: this.landingData.background_color,
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
                name: this.form.name,
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
