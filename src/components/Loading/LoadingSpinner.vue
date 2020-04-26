<template>
    <div class="loading-spinner" :class="`--${animation}`">
        <template v-if="isBounc3">
            <div class="loading-spinner-dot dot1"></div>
            <div class="loading-spinner-dot dot2"></div>
            <div class="loading-spinner-dot"></div>
        </template>
        <template v-else>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot dot2"></div>
            <div class="loading-spinner-dot dot3"></div>
            <div class="loading-spinner-dot dot4"></div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    props: {
        animation: {
            type: String,
            default: 'barz',
            validator: function(value) {
                return ['barz', 'bounc3'].indexOf(value) !== -1
            },
        },
    },
    computed: {
        isBarz() {
            return 'barz' === this.animation
        },
        isBounc3() {
            return 'bounc3' === this.animation
        },
    },
}
</script>
