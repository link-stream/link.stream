<template>
    <div class="art-item">
        <div class="img-container">
            <img :src="artItem.img" />
        </div>
        <div class="art-desc">
            <div class="title">
                {{ artItem.title }}
            </div>
            <div class="desc">
                <span class="price">
                    {{ artItem.minPrice | currencyFormat }} - {{ artItem.maxPrice | currencyFormat }}
                </span>
                <span
                    v-if="artItem.bogo"
                    class="bogo"
                >
                    BOGO
                </span>
            </div>
            <div class="action">
                <basic-button size="sm">
                    Buy
                </basic-button>
                <button class="btn btn-icon">
                    <b-icon-download class="btn-download" />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ArtItemm',
    props: {
        artItem: {
            type: Object
        }
    }
}
</script>