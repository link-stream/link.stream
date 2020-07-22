<template>
    <div class="purchase-item">
        <div class="item-cover">
            <img src="/static/img/no-coverart.jpg" :alt="purchase.item_title" />
        </div>
        <div class="item-body">
            <h4 class="item-title">
                {{ purchase.item_title }}
            </h4>
            <small class="item-subtitle">
                {{ purchase.track_type }} sold by {{ purchase.display_name }} - {{ purchase.item_amount | currencyFormat }}
            </small>
        </div>
        <basic-button
            class="d-none d-md-block"
            size="md"
        >
            <b-icon-download 
                class="mr-2"
                font-scale="1.5"
            ></b-icon-download>
            Download
        </basic-button>
        <b-dropdown class="actions-menu d-none d-md-block" variant="icon" dropleft no-caret>
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
        <b-dropdown class="actions-menu d-md-none" variant="icon" dropleft no-caret>
            <template v-slot:button-content>
                <Icon icon="dot-menu-v" />
            </template>
            <b-dropdown-item>
                Download
            </b-dropdown-item>
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
