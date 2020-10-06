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
                                    size="sm"
                                    class="btn-buy"
                                    @click="handleBuyClick(license)"
                                >Buy</basic-button>
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
                    <basic-button variant="link" class="float-right text-black">Negotiate Price</basic-button>
                </div>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Licenses',
    props: {
        curItem: {
            type: Object,
        },
    },
    data() {
        return {
            open: true,
            licenseDetails: [
                'Used for Music Recording',
                'Distribute up to 25000 copies',
                'Unlimited Online Audio Streams',
                'Unlimited Music Video',
                'For Profit Live Performances',
                'Radio Broadcasting rights (Unlimited Stations)',
            ],
            realLicenses: [],
        }
    },
    computed: {
        ...mapGetters({
            licenses: 'profile/licenses',
        }),
    },
    async created() {
        this.initLicense()
    },
    methods: {
        close() {
            this.$emit('close')
        },
        handleBuyClick(license) {
            this.close()
            this.$store.dispatch('profile/addCartItem', {
                ...this.curItem,
                price: license.price,
                license_id: license.id,
            })
            this.$bus.$emit('modal.addedCart.open')
        },
        initLicense() {
            this.realLicenses = this.curItem.licenses.map((item) => {
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
