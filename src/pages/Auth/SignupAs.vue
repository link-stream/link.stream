<template>
    <div class="page page-signupas my-5 h-100">
        <b-container>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-center">
                    <label class="sign-in-text mb-5">Sign up as</label>
                </b-col>
            </b-row>
            <b-row class="text-center d-flex justify-content-center mb-4">
                <b-col
                    cols="12"
                    sm="12"
                    md="6"
                    class="d-flex justify-content-md-end justify-content-center"
                >
                    <b-card no-body class="user-card" tag="button" @click="signupAsProducer">
                        <img class="mb-4" src="@/assets/img/ico/equalizer.svg" />
                        <div class="user-card-body">
                            <span>Producer</span>
                            <p>Sell and market your beats in your own store.</p>
                            <b-button
                                variant="primary"
                                class="btn-primary-signup"
                                @click="signupAsProducer"
                            >Sign Up</b-button>
                        </div>
                    </b-card>
                </b-col>
                <b-col
                    cols="12"
                    sm="12"
                    md="6"
                    class="d-flex justify-content-md-start justify-content-center artist-listener-card"
                >
                    <b-card no-body class="user-card" tag="button" @click="signupAsArtist">
                        <img class="mb-4" src="@/assets/img/ico/fa-solid_headphones.svg" />
                        <div class="user-card-body mt-2">
                            <span>Artist or Listener</span>
                            <p>
                                Our free account for buying beats and following
                                producers.
                            </p>
                            <b-button
                                variant="primary"
                                class="btn-primary-signup"
                                @click="signupAsArtist"
                            >Sign Up</b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="d-flex justify-content-center">
                    <span class="sign-in-span">
                        Already have an account?
                        <b-link class="signin-link" to="/login">Sign in</b-link>
                    </span>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name: 'SignupAs',
    data() {
        return {}
    },
    methods: {
        signupAsProducer() {
            Cookies.set('user_type', 'producer')
            this.$router
                .push({
                    name: 'signup',
                })
                .catch(err => {})
        },
        signupAsArtist() {
            Cookies.set('user_type', 'listener')
            this.$router
                .push({
                    name: 'signup',
                })
                .catch(err => {})
        },
    },
}
</script>
