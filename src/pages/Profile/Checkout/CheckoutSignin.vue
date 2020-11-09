<template>
    <div class="page page-login my-4"> 
        <b-container>
            <b-row class="text-center d-flex justify-content-center">
                <!-- <b-col cols="12" class="my-2">
                    <spinner-button
                        instagram
                        class="auth-btn"
                        :loading="status.loading.instagram"
                        :error="status.error.instagram"
                        @click="authenticateInstagram"
                    >
                        <i class="ig-ico fab fa-instagram fa-lg"></i>
                        Signin with Instagram
                    </spinner-button>
                </b-col>-->
                <b-col cols="12" class="mt-4">
                    <label class="sign-in-text">Sign In</label>
                </b-col>
                <b-col cols="12" class="my-3 d-flex justify-content-center">
                    <b-form
                        @submit.stop.prevent="onSubmit"
                        @reset="resetForm"
                        :novalidate="true"
                        id="login-form"
                    >
                        <b-form-group
                            label="Email Address"
                            label-for="input_email"
                            class="mb-3 error-l-110 email-form-group"
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
                            <b-form-invalid-feedback id="email-live-feedback">{{
                                veeErrors.first('input_email')
                            }}</b-form-invalid-feedback>
                        </b-form-group>

                        <div class="mb-4 pwd-form-group error-l-75">
                            <label
                                for="input_password"
                                class="mb-2 pwd-form-group error-l-75 float-left"
                                >Password</label
                            >
                            <b-link class="float-right" to="/forgot"
                                >Forgot?</b-link
                            >
                            <b-form-input
                                id="input_password"
                                class="pwd-input"
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
                                class="toggle-pwd-btn"
                                variant="transparent"
                                @click="showPwd = !showPwd"
                            >
                                <b-icon
                                    font-scale="1"
                                    :icon="showPwd ? 'eye' : 'eye-slash'"
                                />
                            </b-button>
                            <b-form-invalid-feedback
                                id="password-live-feedback"
                                >{{
                                    veeErrors.first('input_password')
                                }}</b-form-invalid-feedback
                            >
                        </div>
                        <spinner-button
                            type="submit"
                            class="auth-btn mt-3 signin-btn"
                            :loading="status.loading.signin"
                            :error="status.error.signin"
                            >Sign In</spinner-button
                        >
                        <b-row class="my-2" align="center" style="justify-content:center;">
                            <b-col cols="12" xl="10" lg="11" md="11" sm="10" class="mt-3">
                                <b-link
                                    :to="{
                                        name: 'publicProfile',
                                        params: { url: url_profile },
                                    }"
                                    class="return-links"
                                >
                                    <font-awesome-icon :icon="['fas', 'chevron-left']" size="1x" class="mr-2" />Return to profile
                                </b-link>
                            </b-col>
                    </b-row>
                    </b-form>
                </b-col>
                <b-col cols="12" class="btn-divider">
                    <div class="separator">or</div>   
                    <a
                        class="g-login-btn-wrap google-component col"
                        href="#"
                        @click.prevent="handleClickSignIn"
                    >
                        <spinner-button
                            google
                            class="auth-btn google-btn"
                            :loading="status.loading.google"
                            :error="status.error.google"
                        >
                            <img
                                class="float-left"
                                src="@/assets/img/ico/logo_googleg.svg"
                            />
                            Sign in with Google
                        </spinner-button>
                    </a>                 
                </b-col>
                <b-col cols="12" class="fs--1 my-3">
                    Don't have an account?
                    <b-link to="/signup-as">Sign up</b-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { setStatusChange } from '~/utils'
import { api } from '~/services'
import { authentication } from '~/mixins'
import Cookies from 'js-cookie'

export default {
    name: 'Login',
    mixins: [authentication],
    data() {
        return {
            params_url: [],
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
			url_profile: '',
        }
    },
    mounted(){
        this.params_url = Cookies.getJSON('params_url')
		
		var first_url = this.$route.fullPath.split('/')
        this.url_profile = first_url[1]
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
                const { status, data, error } = await api.users.login({
                    email,
                    password,
                })
                if (status === 'success') {
                    setStatusChange(this, 'status.error.signin', false)
                    setTimeout(() => {
                        var previous_route = Cookies.getJSON('previous_route')
                        this.$store.dispatch('auth/login', {
                            user: data,
                            route: previous_route,
                        })
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
