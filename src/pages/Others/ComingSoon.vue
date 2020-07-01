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
            <form action="/" method="post" @submit="handleSubmit">
                <h1 class="page-title">
                    The Missing Link<br />
                    Will Be Here Soon
                </h1>
                <p class="join-text">
                    Discover the missing link between streaming
                    artists&nbsp;and&nbsp;music producers. LinkStream was built
                    by tech entrepreneurs and marketing experts to help artists
                    and producers buy and sell their songs and instrumentals.
                    Sign-up to receive an email for early access to the
                    platform.
                </p>
                <div class="form-group">
                    <input
                        type="text"
                        v-model="email"
                        placeholder="Enter Email Address"
                        class="form-control"
                        :class="{ 'is-invalid': $v.email.$error }"
                    />
                    <div class="invalid-feedback">
                        Enter a valid email address
                    </div>
                </div>
                <spinner-button
                    variant="banana"
                    type="submit"
                    :loading="processing"
                >
                    Notify Me
                </spinner-button>
            </form>
            <div class="img">
                <img src="@/assets/img/coming-soon.png" />
            </div>
        </main>
        <footer class="page-footer">
            &copy; {{ new Date().getFullYear() }} LinkStream LLC. All Rights
            Reserved.<span class="pipe">&vert;</span>
            <router-link
                :to="{ name: 'legal' }"
                v-html="'Privacy&nbsp;Policy'"
            ></router-link>
        </footer>
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