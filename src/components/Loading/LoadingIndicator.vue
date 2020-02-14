<template>
    <div class="loading-indicator py-5" v-if="loading">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 d-flex justify-content-center">
                    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingIndicator',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped>
.loading-indicator {
    .spinner-border {
        color: $loading-color;
        animation-duration: 0.65s;
    }
}
</style>
