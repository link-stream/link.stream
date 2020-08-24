<template>
    <div class="art-item">
        <a href="#" class="img-container" @click.prevent="$emit('select', index)">
            <img :src="artItem.coverart" />
            <img
                v-if="selected && status"
                src="@/assets/img/ico/pause-red.svg"
                class="center-img"
            />
            <img
                v-if="selected && !status"
                src="@/assets/img/ico/play-red.svg"
                class="center-img"
            />
        </a>
        <div class="art-desc">
            <div class="title">
                {{ artItem.title }}
            </div>
            <div v-if="artItem.type === 'beat'" class="price">
                {{ minPrice | currencyFormat }} - {{ maxPrice | currencyFormat }}
            </div>
            <div v-else class="price">
                {{ artItem.price | currencyFormat }}
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
            <IconButton
                class="btn-download"
                icon="download"
            />
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
        status: {
            type: Boolean,
        },
        index: {
            type: Number,
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
