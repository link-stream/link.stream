<template>
    <div class="purchase-item">
        <div class="purchase-item-content">
            <div class="item-cover">
                <img
                    :src="
                        purchase.data_image
                            ? purchase.data_image
                            : '/static/img/no-coverart.jpg'
                    "
                    :alt="purchase.item_title"
                />
            </div>
            <div class="item-body">
                <h4 class="item-title">
                    {{ purchase.item_title }}
                </h4>
                <small class="item-subtitle">
                    {{ purchase.track_type }}
                    sold by
                    {{ purchase.display_name }}
                    -
                    {{ purchase.item_amount | currencyFormat }}
                </small>
            </div>
            <spinner-button
                size="md"
                class="d-none d-md-block"
                :loading="loading"
                @click="handleDownload"
            >
                <img src="@/assets/img/ico/download-wh.svg" class="img-icon" />
                Download
            </spinner-button>
            <b-dropdown class="actions-menu" variant="icon" right no-caret>
                <template v-slot:button-content>
                    <Icon icon="dot-menu-v" />
                </template>
                <b-dropdown-item @click="handleDownloadLicense">Download License</b-dropdown-item>
                <b-dropdown-item
                    :to="
                        purchase.item_track_type === 'beat'
                            ? {
                                  name: 'profileBeatDetails',
                                  params: {
                                      url: purchase.url,
                                      beatId: purchase.item_id,
                                  },
                              }
                            : purchase.item_track_type === 'pack'
                            ? {
                                  name: 'profilePackDetails',
                                  params: {
                                      url: purchase.url,
                                      packId: purchase.item_id,
                                  },
                              }
                            : {
                                  name: 'profileKitDetails',
                                  params: {
                                      url: purchase.url,
                                      kitId: purchase.item_id,
                                  },
                              }
                    "
                    target="_blank"
                >Go to Track</b-dropdown-item>
                <b-dropdown-item
                    :to="{
                        name: 'publicProfile',
                        params: {
                            url: purchase.url,
                        },
                    }"
                    target="_blank"
                >Go to Artist</b-dropdown-item>
                <b-dropdown-item @click="handleShareClick">Share</b-dropdown-item>
            </b-dropdown>
        </div>
        <spinner-button
            size="md"
            class="d-md-none mt-3"
            :loading="loading"
            @click="handleDownload"
        >
            <img src="@/assets/img/ico/download-wh.svg" class="img-icon" />
            Download
        </spinner-button>
    </div>
</template>

<script>
export default {
    name: 'PurchaseItem',
    props: {
        purchase: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            routeName: '',
            params: {},
            loading: false,
        }
    },
    methods: {
        handleDownload() {
            this.loading = true
            window.open(this.purchase.download_url, '_self')
            this.loading = false
        },
        handleDownloadLicense() {},
        handleShareClick() {
            const artItem = {
                id: this.purchase.id,
                type: this.purchase.item_track_type,
                url: this.purchase.url,
                producer_id: this.purchase.producer_id,
                coverart: this.purchase.data_image,
                display_name: this.purchase.display_name,
                title: this.purchase.item_title,
            }
            this.$bus.$emit('modal.share.open', artItem)
        },
    },
}
</script>
