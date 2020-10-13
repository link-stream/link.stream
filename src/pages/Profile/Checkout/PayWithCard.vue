<template>
    <div class="cart ckeckout-pay pt-5">
        <b-col cols="12" xl="8" lg="7" md="6" class="d-md-none">
            <b-form class="pt-4 ">
                <b-row>
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
                        <b-card-sub-title>
                            <b-avatar
                                variant="dark"
                                :src="user.photo"
                            ></b-avatar>
                            <span class="data-user ml-2">{{ data_user }}</span>
                        </b-card-sub-title>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <span class="contact-information">Pay with card</span>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-card-info"
                                    label="Card Information"
                                    label-for="input-number"
                                    class="label"
                                >
                                    <b-form-input
                                        ref="cardNumInput"
                                        id="input-number"
                                        v-model="cardNumber"
                                        class="rectangle"
                                        placeholder="1234 1234 1234"
                                        v-cardformat:formatCardNumber
                                        :data-error="
                                            cardErrors.cardNumber ? true : false
                                        "
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardNumber"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardNumber
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6" xl="3">
                                <b-form-group label-for="input-date">
                                    <b-form-input
                                        id="input-date"
                                        v-model="cardExpiry"
                                        class="rectangle"
                                        placeholder="MM / YYYY"
                                        :data-error="
                                            cardErrors.cardExpiry ? true : false
                                        "
                                        v-cardformat:formatCardExpiry
                                        ref="cardExpInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardExpiry"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardExpiry
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" xl="4">
                                <b-form-group label-for="input-cvc">
                                    <b-form-input
                                        id="input-cvc"
                                        v-model="cardCvc"
                                        class="rectangle"
                                        placeholder="CVC"
                                        :data-error="
                                            cardErrors.cardCvc ? true : false
                                        "
                                        v-cardformat:formatCardCVC
                                        ref="cardCvcInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardCvc"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardCvc
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-nameCard"
                                    label="Name on card"
                                    label-for="nameCard"
                                    class="label"
                                >
                                    <b-form-input
                                        id="nameCard"
                                        name="nameCard"
                                        v-model="form.nameCard"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('nameCard')"
                                        aria-describedby="nameCard-live-feedback"
                                        data-vv-as="Name on Card"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="nameCard-live-feedback"
                                    >
                                        {{ veeErrors.first('nameCard') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-place"
                                    label="Country or region"
                                    label-for="input-place"
                                    class="label"
                                >
                                    <b-form-select
                                        id="input-place"
                                        name="place"
                                        v-model="form.place"
                                        :options="places"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('place')"
                                        aria-describedby="place-live-feedback"
                                        data-vv-as="Place"
                                    ></b-form-select>
                                    <b-form-invalid-feedback
                                        id="place-live-feedback"
                                    >
                                        {{ veeErrors.first('place') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group label-for="input-zip">
                                    <b-form-input
                                        id="input-zip"
                                        name="zip"
                                        v-model="form.zip"
                                        class="rectangle"
                                        placeholder="ZIP"
                                        v-validate="{ required: true, max: 8 }"
                                        :state="validateState('zip')"
                                        aria-describedby="zip-live-feedback"
                                        data-vv-as="Zip"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="zip-live-feedback"
                                    >
                                        {{ veeErrors.first('zip') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="1" xl="9" lg="7" md="6" sm="4">
                                <!--b-button variant="link" class="center-vertical"
                                >Return to information</b-button
                            -->
                            </b-col>
                            <b-col cols="11" xl="3" lg="5" md="6" sm="8">
                                <b-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    @click="creditCardPayment()"
                                    >Pay ${{ total }}</b-button
                                >

                                <b-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    :to="{ name: 'checkoutReceipt' }"
                                    >Pay Test</b-button
                                >
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12" class="mt-5">
                        <div class="divider"></div>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Refund policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Privacy policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Terms of services</b-button
                        >
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
        <b-col
            cols="12"
            xl="8"
            lg="7"
            md="6"
            class="d-none d-md-block d-lg-none"
        >
            <b-form class="pt-4 ">
                <b-row>
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
                        <b-card-sub-title>
                            <b-avatar
                                variant="dark"
                                :src="user.photo"
                            ></b-avatar>
                            <span class="data-user ml-2">{{ data_user }}</span>
                        </b-card-sub-title>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <span class="contact-information">Pay with card</span>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-card-info"
                                    label="Card Information"
                                    label-for="input-number"
                                    class="label"
                                >
                                    <b-form-input
                                        ref="cardNumInput"
                                        id="input-number"
                                        v-model="cardNumber"
                                        class="rectangle"
                                        placeholder="1234 1234 1234"
                                        v-cardformat:formatCardNumber
                                        :data-error="
                                            cardErrors.cardNumber ? true : false
                                        "
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardNumber"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardNumber
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6" xl="3">
                                <b-form-group label-for="input-date">
                                    <b-form-input
                                        id="input-date"
                                        v-model="cardExpiry"
                                        class="rectangle"
                                        placeholder="MM / YYYY"
                                        :data-error="
                                            cardErrors.cardExpiry ? true : false
                                        "
                                        v-cardformat:formatCardExpiry
                                        ref="cardExpInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardExpiry"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardExpiry
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" xl="4">
                                <b-form-group label-for="input-cvc">
                                    <b-form-input
                                        id="input-cvc"
                                        v-model="cardCvc"
                                        class="rectangle"
                                        placeholder="CVC"
                                        :data-error="
                                            cardErrors.cardCvc ? true : false
                                        "
                                        v-cardformat:formatCardCVC
                                        ref="cardCvcInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardCvc"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardCvc
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-nameCard"
                                    label="Name on card"
                                    label-for="nameCard"
                                    class="label"
                                >
                                    <b-form-input
                                        id="nameCard"
                                        name="nameCard"
                                        v-model="form.nameCard"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('nameCard')"
                                        aria-describedby="nameCard-live-feedback"
                                        data-vv-as="Name on Card"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="nameCard-live-feedback"
                                    >
                                        {{ veeErrors.first('nameCard') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-place"
                                    label="Country or region"
                                    label-for="input-place"
                                    class="label"
                                >
                                    <b-form-select
                                        id="input-place"
                                        name="place"
                                        v-model="form.place"
                                        :options="places"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('place')"
                                        aria-describedby="place-live-feedback"
                                        data-vv-as="Place"
                                    ></b-form-select>
                                    <b-form-invalid-feedback
                                        id="place-live-feedback"
                                    >
                                        {{ veeErrors.first('place') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group label-for="input-zip">
                                    <b-form-input
                                        id="input-zip"
                                        name="zip"
                                        v-model="form.zip"
                                        class="rectangle"
                                        placeholder="ZIP"
                                        v-validate="{ required: true, max: 8 }"
                                        :state="validateState('zip')"
                                        aria-describedby="zip-live-feedback"
                                        data-vv-as="Zip"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="zip-live-feedback"
                                    >
                                        {{ veeErrors.first('zip') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="5" xl="4">
                                <!--b-button variant="link" class="center-vertical"
                                >Return to information</b-button
                            -->
                            </b-col>
                            <b-col cols="3" xl="3">
                                <b-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    @click="creditCardPayment()"
                                    >Pay ${{ total }}</b-button
                                >

                                <b-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    :to="{ name: 'checkoutReceipt' }"
                                    >Pay Test</b-button
                                >
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="7" class="mt-5">
                        <div class="divider"></div>
                    </b-col>
                    <b-col cols="7" class="mt-3">
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Refund policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Privacy policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Terms of services</b-button
                        >
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
        <b-col cols="12" xl="8" lg="7" md="6" class="center d-none d-lg-block">
            <b-form class="pt-4 ">
                <b-row>
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
                        <b-card-sub-title>
                            <b-avatar
                                variant="dark"
                                :src="user.photo"
                            ></b-avatar>
                            <span class="data-user ml-2">{{ data_user }}</span>
                        </b-card-sub-title>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <span class="contact-information">Pay with card</span>
                    </b-col>
                    <b-col cols="12" class="mt-4">
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-card-info"
                                    label="Card Information"
                                    label-for="input-number"
                                    class="label"
                                >
                                    <b-form-input
                                        ref="cardNumInput"
                                        id="input-number"
                                        v-model="cardNumber"
                                        class="rectangle"
                                        placeholder="1234 1234 1234"
                                        v-cardformat:formatCardNumber
                                        :data-error="
                                            cardErrors.cardNumber ? true : false
                                        "
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardNumber"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardNumber
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6" xl="3">
                                <b-form-group label-for="input-date">
                                    <b-form-input
                                        id="input-date"
                                        v-model="cardExpiry"
                                        class="rectangle"
                                        placeholder="MM / YYYY"
                                        :data-error="
                                            cardErrors.cardExpiry ? true : false
                                        "
                                        v-cardformat:formatCardExpiry
                                        ref="cardExpInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardExpiry"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardExpiry
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" xl="4">
                                <b-form-group label-for="input-cvc">
                                    <b-form-input
                                        id="input-cvc"
                                        v-model="cardCvc"
                                        class="rectangle"
                                        placeholder="CVC"
                                        :data-error="
                                            cardErrors.cardCvc ? true : false
                                        "
                                        v-cardformat:formatCardCVC
                                        ref="cardCvcInput"
                                    ></b-form-input>
                                    <div
                                        v-if="cardErrors.cardCvc"
                                        class="error"
                                    >
                                        <small class="msg-error">{{
                                            cardErrors.cardCvc
                                        }}</small>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-nameCard"
                                    label="Name on card"
                                    label-for="nameCard"
                                    class="label"
                                >
                                    <b-form-input
                                        id="nameCard"
                                        name="nameCard"
                                        v-model="form.nameCard"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('nameCard')"
                                        aria-describedby="nameCard-live-feedback"
                                        data-vv-as="Name on Card"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="nameCard-live-feedback"
                                    >
                                        {{ veeErrors.first('nameCard') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group
                                    id="input-group-place"
                                    label="Country or region"
                                    label-for="input-place"
                                    class="label"
                                >
                                    <b-form-select
                                        id="input-place"
                                        name="place"
                                        v-model="form.place"
                                        :options="places"
                                        class="rectangle"
                                        v-validate="{ required: true }"
                                        :state="validateState('place')"
                                        aria-describedby="place-live-feedback"
                                        data-vv-as="Place"
                                    ></b-form-select>
                                    <b-form-invalid-feedback
                                        id="place-live-feedback"
                                    >
                                        {{ veeErrors.first('place') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12" xl="7">
                                <b-form-group label-for="input-zip">
                                    <b-form-input
                                        id="input-zip"
                                        name="zip"
                                        v-model="form.zip"
                                        class="rectangle"
                                        placeholder="ZIP"
                                        v-validate="{ required: true, max: 8 }"
                                        :state="validateState('zip')"
                                        aria-describedby="zip-live-feedback"
                                        data-vv-as="Zip"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="zip-live-feedback"
                                    >
                                        {{ veeErrors.first('zip') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="5" xl="4">
                                <!--b-button variant="link" class="center-vertical"
                                >Return to information</b-button
                            -->
                            </b-col>
                            <b-col cols="3" xl="3">
                                <basic-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    @click="creditCardPayment()"
                                    >Pay ${{ total }}</basic-button
                                >

                                <!--b-button
                                    pill
                                    block
                                    class="ml-2 continue-to-payment"
                                    style="background-color: #DC2EA6; color: #ffffff;"
                                    :to="{ name: 'checkoutReceipt' }"
                                    >Pay Test</b-button
                                -->
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="7" class="mt-5">
                        <div class="divider"></div>
                    </b-col>
                    <b-col cols="7" class="mt-3">
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Refund policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Privacy policy</b-button
                        >
                        <b-button
                            variant="link"
                            class="mr-3 card-links"
                            :to="{ name: 'legal' }"
                            >Terms of services</b-button
                        >
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
        <b-col
            cols="12"
            xl="4"
            lg="5"
            md="6"
            class="right-side d-none d-md-block pr-0"
        >
            <InformationPay />
        </b-col>
    </div>
</template>

<script>
import { api } from '~/services'
import InformationPay from '@/components/Cart/InformationPay'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

export default {
    name: 'PayWithcard',
    components: {
        InformationPay,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    data() {
        return {
            data_user: '',
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            cardErrors: {},

            form: {
                number: '',
                date: '',
                cvc: '',
                nameCard: '',
                place: '',
                zip: '',
                total: 0,
            },
            places: ['United States', 'Canada', 'Spain'],
            total: 0,
            discounts: 0,
            informationPay: [],
            session: [],

            array: {
                user_id: '',
                payment: {
                    exp_month: '',
                    exp_year: '',
                    number: '',
                    cvc: '',
                    name: '',
                    address_zip: '',
                    subtotal: 0,
                    feeCC: 0,
                    feeService: 0,
                    total: 0,
                },
                cart: [],
            },
        }
    },
    watch: {
        // handle auto-focus to next field
        // Note: since CVC can be 3 OR 4 digits we don't watch it
        cardNumber: function(val) {
            if (this.$cardFormat.validateCardNumber(val)) {
                this.$refs.cardExpInput.focus()
            }
        },
        cardExpiry: function(val) {
            if (this.$cardFormat.validateCardExpiry(val)) {
                this.$refs.cardCvcInput.focus()
            }
        },
    },
    mounted() {
        this.data_user = this.user.first_name.concat(
            ' ',
            this.user.last_name,
            ' (',
            this.user.email,
            ')'
        )
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        var itemsCookies = Cookies.getJSON(appConstants.cookies.cartItem.name)
        this.informationPay = Cookies.getJSON(
            appConstants.cookies.informationPay.name
        )
        this.total = this.informationPay[1].total
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        this.$refs.cardNumInput.focus()
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
        validate() {
            // init
            this.cardErrors = {}
            var errors = 0

            // validate card number
            if (!this.$cardFormat.validateCardNumber(this.cardNumber)) {
                this.cardErrors.cardNumber = 'Invalid Credit Card Number.'
                errors++
            }

            // validate card expiry
            if (!this.$cardFormat.validateCardExpiry(this.cardExpiry)) {
                this.cardErrors.cardExpiry = 'Invalid Expiration Date.'
                errors++
            }

            // validate card CVC
            if (!this.$cardFormat.validateCardCVC(this.cardCvc)) {
                this.cardErrors.cardCvc = 'Invalid CVC.'
                errors++
            }

            return errors
        },
        async creditCardPayment() {
            //if (this.validate() === 0) {
            this.$validator.validateAll().then(async result => {
                if (!result && this.validate() !== 0) {
                    return
                }
                var temp_feeService = this.informationPay[1].fees.find(
                    aux => aux.var === 'feeService'
                )
                this.array.user_id = this.session.id
                this.array.payment.exp_month = this.cardExpiry.substring(0, 2)
                this.array.payment.exp_year = parseInt(
                    this.cardExpiry.substring(4, 9)
                )
                this.array.payment.number = this.cardNumber
                this.array.payment.name = this.form.nameCard
                this.array.payment.cvc = this.cardCvc
                this.array.payment.address_zip = this.form.zip
                this.array.payment.subtotal = this.informationPay[1].sub_total
                this.array.payment.total = this.informationPay[1].total
                this.array.payment.feeCC = this.informationPay[1].percent
                this.array.payment.feeService = temp_feeService
                    ? temp_feeService.value
                    : ''

                var itemsCart = this.informationPay[0]
                for (var i in itemsCart) {
                    var items = itemsCart[i].elements
                    console.log('items', items)
                    for (var j in items) {
                        this.array.cart.push({
                            item_id: items[j].id,
                            item_title: items[j].name,
                            item_amount: items[j].price,
                            item_track_type: items[j].type,
                            license_id: items[j].license_id,
                            producer_id: itemsCart[i].user_id,
                            genre_id: items[j].genre_id,
                        })
                    }
                }
                const params = {
                    data: JSON.stringify(this.array),
                }
                const response = await api.cart.creditCardPayment(params)
                if (response.status === 'success') {
                    var receipt = {
                        billingCC: response.billingCC,
                        cc_type: response.cc_type,
                        email: response.email,
                        id: response.id,
                    }
                    Cookies.set('receipt', receipt)
                    Cookies.remove(appConstants.cookies.cartItem.name)

                    this.$router.push({
                        name: 'checkoutReceipt',
                    })
                }
            })
        },
    },
}
</script>
