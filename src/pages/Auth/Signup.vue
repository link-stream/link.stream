<template>
    <div id="signup-page" class="my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="my-2">
                    <b-button pill class="btn-round instagram" @click="authenticateInstagram">
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
                        <span class="m-0">Sign up with Instagram</span>
                        <span></span>
                    </b-button>
                </b-col>
                <b-col cols="12" class="my-2">
                    <GoogleLogin
                        class="btn btn-round google btn-secondary rounded-pill"
                        :params="google"
                        :onSuccess="onGoogleSuccess"
                    >
                        <font-awesome-icon :icon="['fab', 'google']" size="1x" />
                        <span class="m-0">Sign up with Google</span>
                        <span></span>
                    </GoogleLogin>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <label class="text-black fs-1 font-weight-bold">Or sign up with your email</label>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-form @submit.stop.prevent="onSubmit" @reset="resetForm" :novalidate="true" id="signup-form">
                        <b-form-group label="Username" label-for="input_username" class="mb-4">
                            <b-form-input
                                id="input_username"
                                name="input_username"
                                type="text"
                                v-model="form.name"
                                v-validate="{ required: true, min: 5 }"
                                :state="validateState('input_username')"
                                aria-describedby="username-live-feedback"
                                data-vv-as="username"
                                autocomplete="username"
                            ></b-form-input>
                            <b-form-invalid-feedback id="username-live-feedback">
                                {{ veeErrors.first('input_username') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
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
                            ></b-form-input>
                            <b-form-invalid-feedback id="email-live-feedback">
                                {{ veeErrors.first('input_email') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Password" label-for="input_password" class="mb-4">
                            <b-form-input
                                id="input_password"
                                name="input_password"
                                type="password"
                                v-model="form.password"
                                v-validate="{ required: true, min: 8 }"
                                :state="validateState('input_password')"
                                aria-describedby="password-live-feedback"
                                data-vv-as="password"
                                autocomplete="new-password"
                                ref="password"
                            ></b-form-input>
                            <b-form-invalid-feedback id="password-live-feedback">
                                {{ veeErrors.first('input_password') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label="Retype Password" label-for="input_password_confirm" class="mb-4">
                            <b-form-input
                                id="input_password_confirm"
                                name="input_password_confirm"
                                type="password"
                                v-model="form.repassword"
                                v-validate="{ required: true, min: 8, confirmed: 'password' }"
                                :state="validateState('input_password_confirm')"
                                aria-describedby="password-confirm-live-feedback"
                                data-vv-as="password"
                                autocomplete="new-password"
                            ></b-form-input>
                            <b-form-invalid-feedback id="password-confirm-live-feedback">
                                {{ veeErrors.first('input_password_confirm') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group class="fs--2 text-center text-gray mb-2 px-md-5">
                            By clicking Sign Up below, you agree to our
                            <b-link to="/legal" target="_blank">Terms of Use</b-link>
                            and <b-link to="/legal" target="_blank">Privacy Policy</b-link>.
                        </b-form-group>
                        <b-button pill type="submit" class="btn-round pink text-uppercase d-block mt-4">
                            Sign Up
                        </b-button>
                    </b-form>
                </b-col>
                <b-col cols="12" class="fs--1 my-4">
                    Already have an account? <b-link to="/login">Sigin in</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { call } from '~/services'
import { authentication } from '~/mixins'

export default {
    name: 'Signup',
    mixins: [authentication],
    data() {
        return {
            form: {
                name: null,
                email: null,
                password: null,
                repassword: null,
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
                name: null,
                email: null,
                password: null,
                repassword: null,
            }

            this.$nextTick(() => {
                this.$validator.reset()
            })
        },
        async onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return
                }
                try {
                    const params = {
                        user_name: this.form.name,
                        email: this.form.email,
                        password: this.form.password,
                    }
                    const { status, data } = await call('/users/registration', params, 'POST')
                    if (status === 'success') {
                        console.log(data)
                        this.$toast.success('Success')
                    }
                } catch (e) {
                    this.$toast.error(e.response.data.error || e.message || e || 'Unexpected error')
                }
            })
        },
    },
}
</script>
