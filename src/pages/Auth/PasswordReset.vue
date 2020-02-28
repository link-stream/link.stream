<template>
    <div id="password-reset-page" class="my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="mt-5">
                    <h2 class="text-black font-weight-bolder">Password Reset</h2>
                    <p class="fs-1 mx-auto my-4">
                        Enter the email address you used at sign up and we’ll send you password reset instructions.
                    </p>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-form
                        @submit.stop.prevent="onSubmit"
                        @reset="resetForm"
                        :novalidate="true"
                        id="password-reset-form"
                    >
                        <b-form-group label="Email Address" label-for="input_email" class="mb-4">
                            <b-form-input
                                id="input_email"
                                name="input_email"
                                type="email"
                                v-model="form.email"
                                v-validate="{ required: true, email: true }"
                                :state="validateState('input_email')"
                                aria-describedby="email-live-feedback"
                                data-vv-as="email"
                                autocomplete="username"
                            ></b-form-input>
                            <b-form-invalid-feedback id="email-live-feedback">
                                {{ veeErrors.first('input_email') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-button
                            pill
                            type="submit"
                            class="btn-round pink text-uppercase mt-5"
                            :disabled="loading.reset"
                        >
                            <span></span>
                            <span class="m-0 flex-fill">Reset</span>
                            <b-spinner class="btn-spinner" v-if="loading.reset"></b-spinner>
                            <span v-else></span>
                        </b-button>
                    </b-form>
                </b-col>
                <b-col cols="12" class="fs--1 my-2"> Need help? <b-link to="/" class="ml-2">Contact Us</b-link> </b-col>
                <b-col cols="12" class="fs--1 my-2">
                    Already have an account? <b-link to="/login">Sigin in</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { call } from '~/services'

export default {
    name: 'PasswordReset',
    data() {
        return {
            form: {
                email: null,
            },
            loading: {
                reset: false,
            },
        }
    },
    methods: {
        validateState(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.veeErrors.has(ref)
            }
            return null
        },
        resetForm() {
            this.form = {
                email: null,
            }

            this.$nextTick(() => {
                this.$validator.reset()
            })
        },
        onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return
                }
                this.loading.reset = true
                try {
                    const params = { ...this.form }
                    const { status, error = null } = await call('/users/forgot_password', params, 'POST')
                    if (status === 'success') {
                        this.$toast.success('We have emailed password resent link successfully.')
                    } else {
                        this.$toast.error(error)
                    }
                } catch (e) {
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }
                this.loading.reset = false
            })
        },
    },
}
</script>

<style lang="scss" scoped>
#password-reset-page {
    p {
        width: 380px;
        max-width: 100%;
        line-height: 2;
    }

    .btn-round {
        width: 170px;
        max-width: 100%;
    }
}
</style>
