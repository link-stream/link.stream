<template>
    <div class="page page-edit-message">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'marketingMessages' }"
            >
                <i class="ico ico-back"></i>
                <span>Messages</span>
            </basic-button>
        </nav>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">
                        {{ emailName }}
                    </h1>
                </div>
                <div class="right-col">
                    <basic-button
                        variant="outline-light"
                        size="sm"
                        class="btn-duplicate"
                        @click="duplicateMessage"
                    >
                        Duplicate message
                    </basic-button>
                </div>
            </header>
            <main class="page-body"></main>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReportMessage',
    components: {},
    data: () => ({
        loading: false,
    }),
    methods: {
        duplicateMessage() {},
    },
}
</script>
