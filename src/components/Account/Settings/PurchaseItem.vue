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
            <basic-button class="d-none d-md-block" size="md">
                <b-icon-download
                    class="mr-2"
                    font-scale="1.5"
                ></b-icon-download>
                Download
            </basic-button>
            <b-dropdown class="actions-menu" variant="icon" right no-caret>
                <template v-slot:button-content>
                    <Icon icon="dot-menu-v" />
                </template>
                <b-dropdown-item>
                    Download License
                </b-dropdown-item>
                <b-dropdown-item>
                    Go to Track
                </b-dropdown-item>
                <b-dropdown-item>
                    Go to Artist
                </b-dropdown-item>
                <b-dropdown-item>
                    Share
                </b-dropdown-item>
            </b-dropdown>
        </div>
        <basic-button class="d-md-none mt-3" size="md">
            <b-icon-download class="mr-2" font-scale="1.5" />
            Download
        </basic-button>
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
}
</script>
