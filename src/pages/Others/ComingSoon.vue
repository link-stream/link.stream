<template>
    <div class="page page-coming-soon">
        <header class="page-header">
            <span class="logo ico"></span>
            <div class="social-links">
                <a href="https://www.facebook.com/linkstreamofficial">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/lnkstream">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com/LinkStream_com">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
        </header>
        <main class="page-body">
            <div class="left-col">
                <h1 class="page-title">
                    LinkStream is <br />
                    coming soon
                </h1>
                <p class="notify-text">
                    We’re building a better way to sell and create music.<br />
                    Sign up for our email list and be the first to know when we
                    launch!
                </p>
                <form action="/" method="post" @submit="handleSubmit">
                    <b-form-group>
                        <b-form-input
                            v-model="email"
                            placeholder="Enter Email Address"
                            :state="!$v.email.$error"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                            Enter a valid email address
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <spinner-button
                        variant="banana"
                        type="submit"
                        :loading="processing"
                    >
                        Notify Me
                    </spinner-button>
                </form>
            </div>
            <div class="right-col">
                <img src="@/assets/img/coming-soon.png" />
            </div>
        </main>
    </div>
</template>

<script>
import { scrollToTop } from '~/utils'
import { api } from '~/services'
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'ComingSoon',
    data() {
        return {
            email: null,
            processing: false,
        }
    },
    validations: {
        email: {
            required,
            email,
        },
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault()
            this.$v.email.$touch()
            if (this.$v.email.$invalid) {
                return
            }
            this.processing = true
            const { status, error } = await api.misc.earlyAccess({
                email: this.email,
            })
            if (status === 'success') {
                this.$toast.success("You've been added to our email list!")
                this.email = null
                this.$v.email.$reset()
                scrollToTop()
            } else {
                this.$toast.error(error)
            }
            this.processing = false
        },
    },
}
</script>