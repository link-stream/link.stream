<template>
    <div id="login-page" class="my-4">
        <b-container>
            <b-row class="text-center">
                <b-col cols="12" class="my-2">
                    <b-button pill class="btn-round instagram" @click="authenticateInstagram">
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
                        <span class="m-0">Sign in with Instagram</span>
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
                        <span class="m-0">Sign in with Google</span>
                        <span></span>
                    </GoogleLogin>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <label class="text-black fs-1 font-weight-bold">Or sign in with your email</label>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-form @submit.stop.prevent="onSubmit" @reset="resetForm" :novalidate="true" id="login-form">
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
                        <b-form-group label="Password" label-for="input_password" class="mb-4 password-form-group">
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
                            <b-button class="btn btn-show-pwd" variant="transparent" @click="showPwd = !showPwd">
                                <b-icon font-scale="1.5" :icon="showPwd ? 'eye' : 'eye-slash'" />
                            </b-button>
                            <b-form-invalid-feedback id="password-live-feedback">
                                {{ veeErrors.first('input_password') }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-button pill type="submit" class="btn-round pink text-uppercase d-block mt-5">
                            Sign In
                        </b-button>
                    </b-form>
                </b-col>
                <b-col cols="12" class="my-3">
                    <b-link to="/forgot">Forgot Password?</b-link>
                </b-col>
                <b-col cols="12" class="fs--1 my-4">
                    Don't have an account? <b-link to="/signup">Sigin up</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { call } from '~/services'
import { authentication } from '~/mixins'

export default {
    name: 'Login',
    mixins: [authentication],
    data() {
        return {
            form: {
                email: null,
                password: null,
            },
            showPwd: false,
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
                password: null,
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
                const params = { ...this.form }
                const { status, data } = await call('/users/login', params, 'POST')
                if (status === 'success') {
                    console.log(data)
                    this.$toast.success('Success')
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
#login-form {
    .password-form-group {
        .form-control {
            + .btn-show-pwd {
                position: absolute;
                right: 0;
                top: 0;
                height: $input-height;
                display: flex;
                background: none;
                border: none;
                box-shadow: none;
            }
            &.is-invalid + .btn-show-pwd {
                right: $input-height-inner-half;
            }
        }
    }
}
</style>
