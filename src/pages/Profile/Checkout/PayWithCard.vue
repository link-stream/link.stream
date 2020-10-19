<template>
    <div>
        <div class="page page-login btn-spinner cart ckeckout-pay d-md-none">
            <b-col cols="12" sm="12">
                <b-form>
                    <b-row>
                        <b-col cols="12">
                            <b-row
                                style="justify-content: center; background-color: #000000"
                                class="pt-4"
                            >
                                <b-col cols="12" sm="11" class="mt-3">
                                    <b-avatar
                                        src="@/assets/img/ico/streamy-logo.svg"
                                    ></b-avatar>
                                    <span class="link-stream-llc-black pl-3"
                                        >LinkSream, LLC</span
                                    >
                                    <b-dropdown
                                        variant="outline-dark"
                                        block
                                        menu-class="w-100 menu-pay-responsive"
                                        class="my-4"
                                        id="dropdown-form"
                                        text="View Order Summary"
                                        ref="dropdown"
                                        style="color: #ffffff;"
                                    >
                                        <b-dropdown-form>
                                            <div class="mx-4">
                                                <b-row>
                                                    <b-col
                                                        cols="9"
                                                        xl="8"
                                                        lg="8"
                                                        md="7"
                                                    >
                                                        <span
                                                            class="summary-details-dark"
                                                            >Subtotal</span
                                                        >
                                                    </b-col>
                                                    <b-col
                                                        cols="3"
                                                        xl="4"
                                                        lg="4"
                                                        md="5"
                                                        class="text-right"
                                                    >
                                                        <span
                                                            class="details-price-dark mr-2"
                                                            >$</span
                                                        >
                                                        <span
                                                            class="details-price-dark"
                                                            >{{
                                                                subTotal.toFixed(
                                                                    2
                                                                )
                                                            }}</span
                                                        >
                                                    </b-col>
                                                </b-row>
                                                <b-row
                                                    v-for="(item,
                                                    index) in fees"
                                                    :key="index"
                                                >
                                                    <b-col
                                                        cols="9"
                                                        xl="8"
                                                        lg="8"
                                                        md="8"
                                                        v-show="
                                                            item.value != 0 &&
                                                                item.type !=
                                                                    'Percent'
                                                        "
                                                        class="pt-2"
                                                    >
                                                        <span
                                                            class="summary-details-dark"
                                                            >{{
                                                                item.name
                                                            }}</span
                                                        >
                                                    </b-col>
                                                    <b-col
                                                        cols="3"
                                                        xl="4"
                                                        lg="4"
                                                        md="4"
                                                        v-show="
                                                            item.value != 0 &&
                                                                item.type !=
                                                                    'Percent'
                                                        "
                                                        class="pt-2 text-right"
                                                    >
                                                        <span
                                                            class="details-price-dark mr-2"
                                                            >$</span
                                                        >
                                                        <span
                                                            class="details-price-dark"
                                                            >{{
                                                                parseFloat(
                                                                    item.value
                                                                ).toFixed(2)
                                                            }}</span
                                                        >
                                                    </b-col>
                                                </b-row>
                                                <b-row
                                                    v-show="
                                                        fees_percent.value != 0
                                                    "
                                                >
                                                    <b-col
                                                        cols="9"
                                                        xl="8"
                                                        lg="8"
                                                        md="7"
                                                        class="pt-2"
                                                    >
                                                        <span
                                                            class="summary-details-dark"
                                                            >{{
                                                                fees_percent.name
                                                            }}</span
                                                        >
                                                    </b-col>
                                                    <b-col
                                                        cols="3"
                                                        xl="4"
                                                        lg="4"
                                                        md="5"
                                                        class="pt-2 text-right"
                                                    >
                                                        <span
                                                            class="details-price-dark mr-2"
                                                            >$</span
                                                        >
                                                        <span
                                                            class="details-price-dark"
                                                            >{{ percent }}</span
                                                        >
                                                    </b-col>
                                                </b-row>
                                                <div class="divider"></div>
                                                <b-row class="mt-2">
                                                    <b-col
                                                        cols="9"
                                                        xl="7"
                                                        lg="7"
                                                        md="7"
                                                    >
                                                        <span
                                                            class="summary-total-dark"
                                                            >Order Total</span
                                                        >
                                                    </b-col>
                                                    <b-col
                                                        cols="3"
                                                        xl="5"
                                                        lg="5"
                                                        md="5"
                                                        class="text-right"
                                                    >
                                                        <span
                                                            class="total-price-dark"
                                                            >$</span
                                                        >
                                                        <span
                                                            class="total-price-dark"
                                                            >{{ total }}</span
                                                        >
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-dropdown-form>
                                    </b-dropdown>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-4"
                            >
                                <b-col cols="12" sm="10">
                                    <span class="information">Information</span>
                                    <span class="ic-baseline-arrow-next mx-2"
                                        >></span
                                    >
                                    <span class="payment">Payment</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-3"
                            >
                                <b-col cols="12" sm="10">
                                    <b-card-sub-title>
                                        <b-avatar
                                            variant="dark"
                                            :src="user.photo"
                                        ></b-avatar>
                                        <span class="data-user ml-2">{{
                                            data_user
                                        }}</span>
                                    </b-card-sub-title>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-4"
                            >
                                <b-col cols="12" sm="10">
                                    <span class="contact-information"
                                        >Pay with card</span
                                    >
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10">
                                    <b-form-group
                                        id="input-group-card-info"
                                        label="Card Information"
                                        label-for="input-number"
                                        class="label pwd-form-group"
                                    >
                                        <b-form-input
                                            ref="cardNumInput"
                                            id="input-number"
                                            v-model="cardNumber"
                                            class="rectangle"
                                            placeholder="1234 1234 1234 1234"
                                            v-cardformat:formatCardNumber
                                            :data-error="
                                                cardErrors.cardNumber
                                                    ? true
                                                    : false
                                            "
                                        ></b-form-input>
                                        <div
                                            v-if="cardNumber == ''"
                                            class="toggle-pwd-btn py-0"
                                        >
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/visa.svg"
                                            ></b-img>
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/mastercard.svg"
                                            ></b-img>
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/discover.svg"
                                            ></b-img>
                                            <b-img
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/amex.svg"
                                            ></b-img>
                                        </div>
                                        <div
                                            v-else
                                            class="toggle-pwd-btn py-0 mt-2"
                                        >
                                            <b-img
                                                fluid
                                                width="30px"
                                                height="30px"
                                                :src="cardBrandClass"
                                            ></b-img>
                                        </div>
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
                            <b-row style="justify-content: center;">
                                <b-col cols="6" sm="5">
                                    <b-form-group label-for="input-date">
                                        <b-form-input
                                            id="input-date"
                                            v-model="cardExpiry"
                                            class="rectangle"
                                            placeholder="MM / YYYY"
                                            :data-error="
                                                cardErrors.cardExpiry
                                                    ? true
                                                    : false
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
                                <b-col cols="6" sm="5">
                                    <b-form-group label-for="input-cvc">
                                        <b-form-input
                                            id="input-cvc"
                                            v-model="cardCvc"
                                            class="rectangle"
                                            placeholder="CVC"
                                            :data-error="
                                                cardErrors.cardCvc
                                                    ? true
                                                    : false
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
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10">
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
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10">
                                    <b-form-group
                                        label="Country or region"
                                        label-for="country"
                                        class="mb-4 label"
                                    >
                                        <BasicSelect
                                            v-model="form.country"
                                            :options="list_countries"
                                            :reduce="country => country.code"
                                            label="country"
                                            name="country"
                                            v-validate="{ required: true }"
                                            :state="validateState('country')"
                                            aria-describedby="country-live-feedback"
                                            data-vv-as="country"
                                        />
                                        <b-form-invalid-feedback
                                            id="country-live-feedback"
                                        >
                                            {{ veeErrors.first('country') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10">
                                    <b-form-group label-for="input-zip">
                                        <b-form-input
                                            id="input-zip"
                                            name="zip"
                                            v-model="form.zip"
                                            class="rectangle"
                                            placeholder="ZIP"
                                            v-validate="{
                                                required: true,
                                                max: 8,
                                            }"
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
                            <b-row style="justify-content: center;">
                                <b-col
                                    cols="5"
                                    sm="4"
                                    align="left"
                                    class="px-0"
                                >
                                    <b-link
                                        :to="{ name: 'cart' }"
                                        class="return-links center-vertical"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'chevron-left']"
                                            size="1x"
                                        />
                                        Return to Cart
                                    </b-link>
                                </b-col>
                                <b-col
                                    cols="6"
                                    sm="5"
                                    align="right"
                                    class="px-0"
                                >
                                    <basic-button
                                        pill
                                        block
                                        :disabled="status_loading_pay"
                                        class="continue-to-payment"
                                        @click="creditCardPayment()"
                                    >
                                        <div v-if="status_loading_pay">
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                        </div>
                                        <span v-else>Pay $ {{ total }}</span>
                                    </basic-button>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-5">
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10">
                                    <div class="divider"></div>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-3">
                            <b-row style="justify-content: center;">
                                <b-col cols="12" sm="10" class="pb-4">
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Refund policy</b-button
                                    >
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Privacy policy</b-button
                                    >
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Terms of services</b-button
                                    >
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </div>

        <div
            class="page page-login btn-spinner cart ckeckout-pay pt-5 d-none d-md-block"
        >
            <b-col cols="12" xl="8" lg="7" md="6">
                <b-form class="pt-4">
                    <b-row>
                        <b-col cols="12">
                            <b-row
                                style="justify-content: center;"
                                class="pt-4"
                            >
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <b-avatar
                                        src="@/assets/img/ico/streamy-logo.svg"
                                    ></b-avatar>
                                    <span class="link-stream-llc pl-3"
                                        >LinkSream, LLC</span
                                    >
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-4"
                            >
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <span class="information">Information</span>
                                    <span class="ic-baseline-arrow-next mx-2"
                                        >></span
                                    >
                                    <span class="payment">Payment</span>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-3"
                            >
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <b-card-sub-title>
                                        <b-avatar
                                            variant="dark"
                                            :src="user.photo"
                                        ></b-avatar>
                                        <span class="data-user ml-2">{{
                                            data_user
                                        }}</span>
                                    </b-card-sub-title>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row
                                style="justify-content: center;"
                                class="mt-4"
                            >
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <span class="contact-information"
                                        >Pay with card</span
                                    >
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-4">
                            <b-row style="justify-content: center;">
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <b-form-group
                                        id="input-group-card-info"
                                        label="Card Information"
                                        label-for="input-number"
                                        class="label pwd-form-group"
                                    >
                                        <b-form-input
                                            ref="cardNumInput"
                                            id="input-number"
                                            v-model="cardNumber"
                                            class="rectangle"
                                            placeholder="1234 1234 1234 1234"
                                            v-cardformat:formatCardNumber
                                            :data-error="
                                                cardErrors.cardNumber
                                                    ? true
                                                    : false
                                            "
                                        ></b-form-input>
                                        <div
                                            v-if="cardNumber == ''"
                                            class="toggle-pwd-btn py-0"
                                        >
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/visa.svg"
                                            ></b-img>
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/mastercard.svg"
                                            ></b-img>
                                            <b-img
                                                class="mr-1"
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/discover.svg"
                                            ></b-img>
                                            <b-img
                                                fluid
                                                width="30px"
                                                height="30px"
                                                src="/static/img/amex.svg"
                                            ></b-img>
                                        </div>
                                        <div
                                            v-else
                                            class="toggle-pwd-btn py-0 mt-2"
                                        >
                                            <b-img
                                                fluid
                                                width="30px"
                                                height="30px"
                                                :src="cardBrandClass"
                                            ></b-img>
                                        </div>
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
                            <b-row style="justify-content: center;">
                                <b-col cols="6" xl="3" lg="5" md="5">
                                    <b-form-group label-for="input-date">
                                        <b-form-input
                                            id="input-date"
                                            v-model="cardExpiry"
                                            class="rectangle"
                                            placeholder="MM / YYYY"
                                            :data-error="
                                                cardErrors.cardExpiry
                                                    ? true
                                                    : false
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
                                <b-col cols="6" xl="4" lg="5" md="6">
                                    <b-form-group label-for="input-cvc">
                                        <b-form-input
                                            id="input-cvc"
                                            v-model="cardCvc"
                                            class="rectangle"
                                            placeholder="CVC"
                                            :data-error="
                                                cardErrors.cardCvc
                                                    ? true
                                                    : false
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
                            <b-row style="justify-content: center;">
                                <b-col cols="12" xl="7" lg="10" md="11">
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
                            <b-row style="justify-content: center;">
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <b-form-group
                                        label="Country or region"
                                        label-for="country"
                                        class="mb-4 label"
                                    >
                                        <BasicSelect
                                            v-model="form.country"
                                            :options="list_countries"
                                            :reduce="country => country.code"
                                            label="country"
                                            name="country"
                                            v-validate="{ required: true }"
                                            :state="validateState('country')"
                                            aria-describedby="country-live-feedback"
                                            data-vv-as="country"
                                        />
                                        <b-form-invalid-feedback
                                            id="country-live-feedback"
                                        >
                                            {{ veeErrors.first('country') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row style="justify-content: center;">
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <b-form-group label-for="input-zip">
                                        <b-form-input
                                            id="input-zip"
                                            name="zip"
                                            v-model="form.zip"
                                            class="rectangle"
                                            placeholder="ZIP"
                                            v-validate="{
                                                required: true,
                                                max: 8,
                                            }"
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
                            <b-row style="justify-content: center;">
                                <b-col
                                    cols="11"
                                    xl="4"
                                    lg="6"
                                    md="5"
                                    align="left"
                                >
                                    <b-link
                                        :to="{ name: 'cart' }"
                                        class="return-links center-vertical"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'chevron-left']"
                                            size="1x"
                                        />
                                        Return to Cart
                                    </b-link>
                                </b-col>
                                <b-col
                                    cols="11"
                                    xl="3"
                                    lg="4"
                                    md="6"
                                    align="right"
                                    class="px-0"
                                >
                                    <basic-button
                                        pill
                                        block
                                        :disabled="status_loading_pay"
                                        class="ml-2 continue-to-payment"
                                        @click="creditCardPayment()"
                                    >
                                        <div v-if="status_loading_pay">
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                            <b-spinner
                                                small
                                                label="Small Spinner"
                                                type="grow"
                                            ></b-spinner>
                                        </div>
                                        <span v-else>Pay $ {{ total }}</span>
                                    </basic-button>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-5">
                            <b-row style="justify-content: center;">
                                <b-col cols="12" xl="7" lg="10" md="11">
                                    <div class="divider"></div>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" class="mt-3">
                            <b-row style="justify-content: center;">
                                <b-col
                                    cols="12"
                                    xl="7"
                                    lg="10"
                                    md="11"
                                    class="pb-4"
                                >
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Refund policy</b-button
                                    >
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Privacy policy</b-button
                                    >
                                    <b-button
                                        variant="link"
                                        class="mr-3 card-links"
                                        :to="{ name: 'legal' }"
                                        target="_blank"
                                        >Terms of services</b-button
                                    >
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
            <b-col
                cols="12"
                xl="4"
                lg="5"
                md="6"
                style="background-color: #000000;  "
                class="right-side d-none d-md-block pr-0"
            >
                <b-row style="justify-content: center;" class="pt-4">
                    <b-col cols="12" xl="11" lg="11" md="11">
                        <InformationPay />
                    </b-col>
                </b-row>
            </b-col>
        </div>
    </div>
</template>

<script>
import { api } from '~/services'
import InformationPay from '@/components/Cart/InformationPay'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import csc from 'country-state-city'

export default {
    name: 'PayWithcard',
    components: {
        InformationPay,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
        allCountries() {
            return csc.getAllCountries().map(({ sortname, name }) => {
                return {
                    code: sortname,
                    country: name,
                }
            })
        },
        cardBrandClass() {
            return this.getBrandClass(this.cardBrand)
        },
    },
    data() {
        return {
            subTotal: 0,
            total: 0,
            itemsCart: [],
            fees: [],
            percent: 0,
            fees_percent: '',

            status_loading_pay: false,
            data_user: '',
            cardNumber: '',
            cardExpiry: null,
            cardCvc: null,
            cardBrand: null,
            cardErrors: {},
            list_countries: [],

            form: {
                country: '',
                number: '',
                date: '',
                cvc: '',
                nameCard: '',
                zip: '',
                total: 0,
            },
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
        'form.country': function(val) {
            console.log('form.country', this.form.country)
        },
    },
    mounted() {
        var itemsCookies = Cookies.getJSON(appConstants.cookies.cartItem.name)
        if (itemsCookies === undefined) {
            this.$router.push({
                name: 'publicProfile',
            })
        } else {
            var cookiesInfoPay = Cookies.getJSON(
                appConstants.cookies.informationPay.name
            )
            this.itemsCart = cookiesInfoPay[0]
            this.subTotal = cookiesInfoPay[1].sub_total
            this.total = cookiesInfoPay[1].total
            this.percent = cookiesInfoPay[1].percent
            this.fees = cookiesInfoPay[1].fees
            this.fees_percent = this.fees.find(aux => aux.type === 'Percent')
            this.list_countries = [
                {
                    code: 'EUA',
                    country: 'United States',
                },
                {
                    code: 'CAN',
                    country: 'Canada',
                },
                ...this.allCountries,
            ]
            this.form.country = this.list_countries[0]
            this.informationPay = Cookies.getJSON(
                appConstants.cookies.informationPay.name
            )
            this.data_user = this.user.first_name.concat(
                ' ',
                this.user.last_name,
                ' (',
                this.user.email,
                ')'
            )
            this.session = Cookies.getJSON(appConstants.cookies.auth.name)

            this.total = this.informationPay[1].total
            this.session = Cookies.getJSON(appConstants.cookies.auth.name)
            this.$refs.cardNumInput.focus()
        }
    },
    methods: {
        getBrandClass(brand) {
            let icon = ''
            let temp = appConstants.cardImages.find(aux => aux.type === brand)
            icon = temp !== undefined ? temp.url : '/static/img/credit-card.svg'

            return icon
        },
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
            this.$validator.validateAll().then(async result => {
                if (!result && this.validate() !== 0) {
                    return
                }
                this.status_loading_pay = true
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
                console.log('response', response)
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
                } else Cookies.remove('receipt')
                this.status_loading_pay = false
            })
        },
    },
}
</script>
