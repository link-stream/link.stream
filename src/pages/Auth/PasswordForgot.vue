<template>
    <div id="forgot-password-page" class="my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="mt-5">
                    <h2 class="text-black font-weight-bolder">Forgot Password?</h2>
                    <p class="fs-1 mx-auto my-4">
                        Enter the email address you used at sign up and we’ll send you password reset instructions.
                    </p>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-form
                        @submit.stop.prevent="onSubmit"
                        @reset="resetForm"
                        :novalidate="true"
                        id="forgot-password-form"
                    >
                        <b-form-group label="Email Address" label-for="input_email" class="error-l-110 mb-4">
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
                        <MultiStateButton
                            type="submit"
                            class="text-uppercase mt-5"
                            :loading="status.loading.reset"
                            :error="status.error.reset"
                        >
                            <span></span>
                            <span class="m-0">Reset</span>
                            <span></span>
                        </MultiStateButton>
                    </b-form>
                </b-col>
                <b-col cols="12" class="fs--1 my-2"> Need help? <b-link to="/" class="ml-2">Contact Us</b-link> </b-col>
                <b-col cols="12" class="fs--1 my-2">
                    Already have an account? <b-link to="/login">Sign in</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { setStatusChange } from '~/utils'
import { call } from '~/services'
import { MultiStateButton } from '~/components/Button'

export default {
    name: 'PasswordForgot',
    components: {
        MultiStateButton,
    },
    data() {
        return {
            form: {
                email: null,
            },
            status: {
                loading: {
                    reset: false,
                },
                error: {
                    reset: null,
                },
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
                this.status.loading.reset = true
                try {
                    const params = { ...this.form }
                    const { status, error = null } = await call('/users/forgot_password', params, 'POST')
                    if (status === 'success') {
                        setStatusChange(this, 'status.error.reset', false, () => {
                            this.resetForm()
                        })
                        this.$toast.success('We have emailed password resent link successfully.')
                    } else {
                        setStatusChange(this, 'status.error.reset')
                        this.$toast.error(error)
                    }
                } catch (e) {
                    setStatusChange(this, 'status.error.reset')
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }
                this.status.loading.reset = false
            })
        },
    },
}
</script>

<style lang="scss" scoped>
#forgot-password-page {
    p {
        width: 380px;
        max-width: 100%;
        line-height: 2;
    }

    .btn-multiple-state {
        width: 170px;
        max-width: 100%;
    }
}
</style>
