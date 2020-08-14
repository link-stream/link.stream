<template>
    <div class="art-item">
        <div class="img-container">
            <img :src="artItem.coverart" />
            <img
                v-if="selected"
                src="@/assets/img/ico/pause-red.svg"
                class="center-img"
            />
        </div>
        <div class="art-desc">
            <div class="title">
                {{ artItem.title }}
            </div>
            <div class="price">
                {{ minPrice | currencyFormat }} - {{ maxPrice | currencyFormat }}
            </div>
            <div
                v-if="artItem.bogo"
                class="bogo"
            >
                BOGO
            </div>
        </div>
        <b-dropdown
            v-if="selected"
            class="actions-menu d-none d-md-block"
            variant="icon" 
            right 
            no-caret
        >
            <template v-slot:button-content>
                <Icon icon="dot-menu-v-s" />
            </template>
            <b-dropdown-item>
                Go to Beat
            </b-dropdown-item>
            <b-dropdown-item>
                Save
            </b-dropdown-item>
            <b-dropdown-item @click="handleShareClick">
                Share
            </b-dropdown-item>
            <b-dropdown-item>
                Free Download
            </b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <basic-button 
                size="sm"
                class="btn-buy"
                @click="handleBuyClick"
            >
                Buy
            </basic-button>
            <button class="btn btn-icon btn-download">
                <b-icon-download />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ArtItemm',
    props: {
        artItem: {
            type: Object
        },
        selected: {
            type: Boolean,
        },
    },
    computed: {
        minPrice() {
            return Math.min.apply(Math, this.artItem.licenses.map(({price}) => price))
        },
        maxPrice() {
            return Math.max.apply(Math, this.artItem.licenses.map(({price}) => price))
        },
    },
    methods: {
        handleBuyClick() {
            this.$bus.$emit('modal.buyLicense.open')
        },
        handleShareClick() {
            console.log('click share button!')
            this.$bus.$emit('modal.shareArt.open')
        }
    },
}
</script>
