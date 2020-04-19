<template>
    <div class="loading-indicator" v-if="loading">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
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