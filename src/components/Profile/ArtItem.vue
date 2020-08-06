<template>
    <div class="art-item">
        <div class="img-container">
            <img :src="artItem.img" />
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
                {{ artItem.minPrice | currencyFormat }} - {{ artItem.maxPrice | currencyFormat }}
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
            class="actions-menu d-none d-sm-block"
            variant="icon" 
            dropleft 
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
            <b-dropdown-item>
                Share
            </b-dropdown-item>
            <b-dropdown-item>
                Free Download
            </b-dropdown-item>
        </b-dropdown>
        <div class="action">
            <basic-button size="sm">
                Buy
            </basic-button>
            <button class="btn btn-icon btn-download">
                <b-icon-download />
            </button>
            <b-dropdown
                v-if="selected"
                class="actions-menu d-sm-none"
                variant="icon" 
                dropleft 
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
                <b-dropdown-item>
                    Share
                </b-dropdown-item>
                <b-dropdown-item>
                    Free Download
                </b-dropdown-item>
            </b-dropdown>
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
    }
}
</script>