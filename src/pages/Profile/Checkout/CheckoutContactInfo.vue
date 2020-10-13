<template>
    <div class="cart ckeckout-pay pt-5">
        <b-col cols="8" xl="8" lg="7" md="7" class="center">
            <b-form class="pt-4 center">
                <b-col cols="12">
                    <b-avatar
                        src="@/assets/img/ico/streamy-logo.svg"
                    ></b-avatar>
                    <span class="link-stream-llc pl-3">LinkSream, LLC</span>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <span class="information">Information</span>
                    <span class="ic-baseline-arrow-next mx-2">></span>
                    <span class="payment">Payment</span>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <span class="contact-information">Contact Information</span>
                </b-col>
                <b-col cols="12" class="mt-4">
                    <b-row>
                        <b-col cols="12" xl="7">
                            <b-form-group
                                id="input-group-email"
                                label="Email"
                                label-for="input-email"
                                class="label"
                            >
                                <b-form-input
                                    id="input-email"
                                    v-model="form.email"
                                    type="email"
                                    class="rectangle"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group id="input-group-4">
                                <b-form-checkbox-group
                                    v-model="form.checked"
                                    id="checkboxes-4"
                                >
                                    <b-form-checkbox
                                        class="keep-me-up-to-date-o"
                                        value="me"
                                        >Keep me up to date on news and
                                        exclusive offers</b-form-checkbox
                                    >
                                </b-form-checkbox-group>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="6" xl="3">
                            <b-form-group
                                id="input-group-firstN"
                                label="First Name"
                                label-for="input-firstN"
                                class="label"
                            >
                                <b-form-input
                                    id="input-firstN"
                                    v-model="form.firstN"
                                    class="rectangle"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6" xl="4">
                            <b-form-group
                                id="input-group-lastN"
                                label="Last Name"
                                label-for="input-lastN"
                                class="label"
                            >
                                <b-form-input
                                    id="input-lastN"
                                    v-model="form.lastN"
                                    class="rectangle"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" xl="7">
                            <b-form-group
                                id="input-group-pass"
                                label="Password"
                                label-for="input-pass"
                                class="label"
                            >
                                <b-form-input
                                    id="input-pass"
                                    v-model="form.pass"
                                    type="password"
                                    class="rectangle"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-button
                            pill
                            class="mt-4 ml-3 continue-to-payment"
                            style="background-color: #DC2EA6; color: #ffffff;"
                            :to="{ name: 'payWithCard' }"
                            >Continue to Payment</b-button
                        >
                    </b-row>
                </b-col>
                <b-col cols="7" class="mt-5">
                    <div class="divider"></div>
                </b-col>
                <b-col cols="7" class="mt-3">
                    <b-button variant="link" class="mr-3"
                        >Refund policy</b-button
                    >
                    <b-button variant="link" class="mr-3"
                        >Privacy policy</b-button
                    >
                    <b-button variant="link" class="mr-3"
                        >Terms of services</b-button
                    >
                </b-col>
            </b-form>
        </b-col>
        <b-col cols="4" xl="4" lg="5" md="5" class="right-side">
            <InformationPay />
        </b-col>
    </div>
</template>

<script>
import InformationPay from '@/components/Cart/InformationPay'

export default {
    name: 'CheckoutConctactInfo',
    components: {
        InformationPay,
    },
    data() {
        return {
            form: {
                email: '',
                firstN: '',
                lastN: '',
                checked: [],
                pass: '',
            },
        }
    },
    watch: {},
    mounted() {},
    methods: {},
}
</script>
