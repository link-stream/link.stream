<template>
    <div class="page-login my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="my-2">
                    <MultiStateButton
                        instagram
                        class="btn-auth"
                        :loading="status.loading.instagram"
                        :error="status.error.instagram"
                        @onClick="authenticateInstagram"
                    >
                        <font-awesome-icon
                            :icon="['fab', 'instagram']"
                            size="lg"
                        />
                        <span class="m-0">Sign in with Instagram</span>
                        <span></span>
                    </MultiStateButton>
                </b-col>
                <b-col cols="12" class="my-2">
                    <GoogleLogin
                        class="btn-auth btn-transparent col px-0"
                        :params="google"
                        :onSuccess="onGoogleSuccess"
                    >
                        <MultiStateButton
                            google
                            :loading="status.loading.google"
                            :error="status.error.google"
                        >
                            <font-awesome-icon
                                :icon="['fab', 'google']"
                                size="1x"
                            />
                            <span class="m-0">Sign in with Google</span>
                            <span></span>
                        </MultiStateButton>
                    </GoogleLogin>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <label class="text-black fs-1 font-weight-bold"
                        >Or sign in with your email</label
                    >
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-form
                        @submit.stop.prevent="onSubmit"
                        @reset="resetForm"
                        :novalidate="true"
                        id="login-form"
                    >
                        <b-form-group
                            label="Email Address"
                            label-for="input_email"
                            class="mb-4 error-l-110"
                        >
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
                        <b-form-group
                            label="Password"
                            label-for="input_password"
                            class="mb-4 password-form-group error-l-75"
                        >
                            <b-form-input
                                id="input_password"
                                name="input_password"
                                :type="showPwd ? 'text' : 'password'"
                                v-model="form.password"
                                v-validate="{ required: true }"
                                :state="validateState('input_password')"
                                aria-describedby="password-live-feedback"
                                data-vv-as="password"
                                autocomplete="current-password"
                            ></b-form-input>
                            <b-button
                                class="btn btn-show-pwd"
                                variant="transparent"
                                @click="showPwd = !showPwd"
                            >
                                <b-icon
                                    font-scale="1.5"
                                    :icon="showPwd ? 'eye' : 'eye-slash'"
                                />
                            </b-button>
                            <b-form-invalid-feedback
                                id="password-live-feedback"
                            >
                                {{ veeErrors.first('input_password') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <MultiStateButton
                            type="submit"
                            class="btn-auth text-uppercase mt-5"
                            :loading="status.loading.signin"
                            :error="status.error.signin"
                        >
                            <span></span>
                            <span class="m-0">Sign In</span>
                            <span></span>
                        </MultiStateButton>
                    </b-form>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-link to="/forgot">Forgot Password?</b-link>
                </b-col>
                <b-col cols="12" class="fs--1 my-4">
                    Don't have an account? <b-link to="/signup">Sign up</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { setStatusChange } from '~/utils'
import { lsApi } from '~/services/lsApi'
import { authentication } from '~/mixins'
import { MultiStateButton } from '~/components/Button'

export default {
    name: 'Login',
    mixins: [authentication],
    components: {
        MultiStateButton,
    },
    data() {
        return {
            form: {
                email: null,
                password: null,
            },
            showPwd: false,
            status: {
                loading: {
                    signin: false,
                },
                error: {
                    signin: null,
                },
            },
        }
    },
    methods: {
        validateState(ref) {
            if (
                this.veeFields[ref] &&
                (this.veeFields[ref].dirty || this.veeFields[ref].validated)
            ) {
                return !this.veeErrors.has(ref)
            }
            return null
        },
        resetForm() {
            this.form = {
                email: null,
                password: null,
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
                this.status.loading.signin = true
                const { email, password } = { ...this.form }
                const { status, data, error } = await lsApi.users.login({
                    email,
                    password,
                })
                if (status === 'success') {
                    setStatusChange(this, 'status.error.signin', false)
                    setTimeout(() => {
                        this.$store.dispatch('auth/login', { user: data })
                    }, 1500)
                } else {
                    setStatusChange(this, 'status.error.signin')
                    this.$toast.error(error)
                }
                this.status.loading.signin = false
            })
        },
    },
}
</script>
