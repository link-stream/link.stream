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
                    <div
                        class="Card"
                        v-for="(license, index) in realLicenses"
                        :key="index"
                    >
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="text">
                                    <h4 class="card-title">
                                        {{ license.price | currencyFormat }} -
                                        {{ license.title }}
                                    </h4>
                                    <small>
                                        {{ license.descripcion }}
                                    </small>
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
                                >
                                    Buy
                                </basic-button>
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
                    <basic-button variant="link" class="float-right text-black">
                        Negotiate Price
                    </basic-button>
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
        }
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
            console.log(license)
            this.$store.dispatch(
                'profile/addCartItem',
                { 
                    ...this.curItem,
                    price: license.price,
                    license_id: license.id,
                }
            )
            this.$bus.$emit('modal.addedCart.open')
        },
        initLicense() {
            console.log('licences', this.licenses)
            this.realLicenses = this.curItem.licenses.map(item => {
                const findLicense = this.licenses.find(({ id }) => id === item.license_id)
                // let details = []
                // if (findLicense.wav) {
                //     details.push('Include a WAV file')
                // }    
                return {
                    ...item,
                    isExpanded: false,
                    details: [...this.licenseDetails],
                    title: findLicense.title,
                    descripcion: findLicense.descripcion,
                }
            })
        }
    },
}
</script>
