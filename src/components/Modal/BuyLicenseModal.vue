<template>
    <b-modal
        modal-class="BuyLicenseModal"
        centered
        size="lg"
        v-model="open"
        hide-footer
        @hidden="$emit('close')"
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2 class="section-title">Choose license type</h2>
        </template>
        <template v-slot:default>
            <div class="page page-licenses">
                <div v-if="realLicenses.length" class="page-body">
                    <div class="Card" v-for="(license, index) in realLicenses" :key="index">
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="text">
                                    <h4 class="card-title">
                                        {{ license.price | currencyFormat }} -
                                        {{ license.title }}
                                    </h4>
                                    <small>{{ license.descripcion }}</small>
                                    <basic-button
                                        v-if="!license.isExpanded"
                                        variant="link"
                                        class="btn-view-terms"
                                        @click="license.isExpanded = true"
                                    >
                                        <small>View Terms</small>
                                    </basic-button>
                                </div>
                                <basic-button
                                    v-if="license.price > 0"
                                    size="sm"
                                    class="btn-buy"
                                    @click="handleBuyClick(license)"
                                >Add to cart</basic-button>
                                <spinner-button
                                    v-else
                                    size="sm"
                                    class="btn-buy"
                                    :loading="loading"
                                    @click="handleDownloadClick(license)"
                                >Download</spinner-button>
                            </div>
                            <ul v-if="license.isExpanded" class="license-details">
                                <li v-for="item in license.details" :key="item">
                                    <b-icon-check />
                                    {{ item }}
                                </li>
                            </ul>
                            <basic-button
                                v-if="license.isExpanded"
                                variant="link"
                                class="btn-view-terms"
                                @click="license.isExpanded = false"
                            >
                                <small>Hide Terms</small>
                            </basic-button>
                        </div>
                    </div>
                    <basic-button
                        variant="link"
                        class="float-right text-black"
                        v-show="false"
                    >Negotiate Price</basic-button>
                </div>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'

import { getAuthCookie } from '~/utils/auth'

import { getCartCookie, setCartCookie, clearLocalStorage } from '~/utils/cart'

export default {
    name: 'Licenses',
    data() {
        return {
            open: false,
            curItem: null,
            licenseDetails: [
                'Used for Music Recording',
                'Distribute up to 25000 copies',
                'Unlimited Online Audio Streams',
                'Unlimited Music Video',
                'For Profit Live Performances',
                'Radio Broadcasting rights (Unlimited Stations)',
            ],
            realLicenses: [],
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            licenses: 'profile/licenses',
            profile: 'profile/profile',
        }),
    },
    async created() {
        this.$bus.$on('modal.buyLicense.open', payload => {
            this.curItem = payload
            this.initLicense()
            this.open = true
        })
        this.$bus.$on('modal.buyLicense.close', this.close)
    },
    methods: {
        close() {
            this.open = false
        },
        handleBuyClick(license) {
            var listItems = []
            this.close()
            listItems =
                Cookies.getJSON(appConstants.cookies.cartItem.name) ===
                undefined
                    ? []
                    : Cookies.getJSON(appConstants.cookies.cartItem.name)

            var cartItem = {
                type: this.curItem.type,
                price: license.price,
                id: this.curItem.id,
                license_id: license.license_id,
                user_id: this.curItem.user_id,
            }

            var temp_id = listItems.find(aux => aux.id === cartItem.id)
            var temp_license = listItems.find(
                aux => aux.license_id === cartItem.license_id
            )
            if (temp_id === undefined || temp_license === undefined) {
                listItems.push(cartItem)
                Cookies.set(appConstants.cookies.cartItem.name, listItems)
                this.$bus.$emit('modal.addedCart.open')
            } else this.$toast.info('The element is already added')
        },
        handleDownloadClick(license) {
            this.loading = true
            const downloadUrl = `${process.env.VUE_APP_API_URL}a/free_download/${this.profile.id}/${this.curItem.id}/${this.curItem.type}/${license.license_id}`
            window.open(downloadUrl, '_self')
            this.loading = false
        },
        initLicense() {
            this.realLicenses = this.curItem.licenses.map(item => {
                const findLicense = this.licenses.find(
                    ({ id }) => id === item.license_id
                )
                let details = []
                if (findLicense.distribution_copies != 0) {
                    if (findLicense.distribution_copies === 'Unlimited') {
                        details.push('Unlimited distribution copies')
                    } else {
                        details.push(
                            `Up to ${findLicense.distribution_copies} free downloads`
                        )
                    }
                }
                if (findLicense.free_download != 0) {
                    if (findLicense.free_download === 'Unlimited') {
                        details.push('Unlimited free downloads')
                    } else {
                        details.push(
                            `Up to ${findLicense.free_download} free downloads`
                        )
                    }
                }
                if (findLicense.audio_streams != 0) {
                    if (findLicense.audio_streams === 'Unlimited') {
                        details.push('Unlimited audio streams')
                    } else {
                        details.push(
                            `Up to ${findLicense.audio_streams} audio streams`
                        )
                    }
                }
                if (findLicense.music_videos != 0) {
                    if (findLicense.music_videos === 'Unlimited') {
                        details.push('Unlimited music videos')
                    } else {
                        details.push(
                            `Up to ${findLicense.music_videos} music videos`
                        )
                    }
                }
                if (findLicense.video_streams != 0) {
                    if (findLicense.video_streams === 'Unlimited') {
                        details.push('Unlimited video streams')
                    } else {
                        details.push(
                            `Up to ${findLicense.video_streams} video streams`
                        )
                    }
                }
                if (findLicense.broadcasting_rights != 0) {
                    details.push('Broadcasting Rights')
                }
                if (findLicense.radio_station != 0) {
                    if (findLicense.radio_station === 'Unlimited') {
                        details.push('Unlimited radio stations')
                    } else {
                        details.push(
                            `Up to ${findLicense.radio_station} radio stations`
                        )
                    }
                }
                if (findLicense.paid_performances != 0) {
                    details.push('Paid performances')
                }
                if (findLicense.non_profit_performances != 0) {
                    if (findLicense.non_profit_performances === 'Unlimited') {
                        details.push('Unlimited non-profit performances')
                    } else {
                        details.push(
                            `Up to ${findLicense.non_profit_performances} non-profit performances`
                        )
                    }
                }
                return {
                    ...item,
                    isExpanded: false,
                    details: details,
                    title: findLicense.title,
                    descripcion: findLicense.descripcion,
                }
            })
        },
    },
}
</script>
