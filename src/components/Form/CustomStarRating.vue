<template>
    <star-rating
        :border-width="0"
        border-color="#FDD311"
        :rounded-corners="true"
        :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
        :increment="increment"
        :rating="rating"
        :read-only="readOnly"
        :show-rating="showRating"
    >
    </star-rating>
</template>
<script>
export default {
    name: 'CustomStarRating',
    props: {
        rating: {
            type: Number,
            default: 0,
        },
        increment: {
            type: Number,
            default: 1,
        },
        readOnly: {
            type: Boolean,
            default: true,
        },
        showRating: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
