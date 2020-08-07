<template>
    <b-modal
        modal-class="BuyLicenseModal"
        centered
        size="lg"
        v-model="open"
        hide-footer
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h2 class="section-title">Choose license type</h2>
        </template>
        <template v-slot:default>
            <div class="page page-licenses">
                <LoadingSpinner class="page-loader" v-if="loading" />
                <div v-else class="page-body">
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
                                    @click="handleBuyClick"
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
    data() {
        return {
            loading: false,
            open: false,
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
            licenses: 'me/licenses',
        }),
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('me/loadLicenses')
        this.loading = false
        this.$bus.$on('modal.buyLicense.open', this.handleOpen)
        this.$bus.$on('modal.buyLicense.close', this.handleClose)
        this.realLicenses = this.licenses.map(item => {
            return {
                ...item,
                isExpanded: false,
                details: [...this.licenseDetails],
            }
        })
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        handleBuyClick() {
            this.close()
            this.$bus.$emit('modal.addedCart.open')
        },
    },
}
</script>
