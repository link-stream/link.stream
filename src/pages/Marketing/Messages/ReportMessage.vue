<template>
    <div class="page page-report-message">
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
                        {{ message.campaing_name }}
                    </h1>
                    <div class="page-preview">
                        <span class="text-light">{{ appBaseUrl }}/</span>
                        <span>app/marketing/messages/view/</span>
                        <span>{{ message.id }}</span>
                        <basic-button
                            variant="outline-light"
                            size="xs"
                            @click="showViewEmail"
                        >
                            View
                        </basic-button>
                    </div>
                </div>
                <div class="right-col">
                    <basic-button
                        v-if="currentItem === 'overview'"
                        variant="outline-light"
                        size="sm"
                        class="btn-duplicate"
                        @click="duplicateMessage"
                    >
                        Duplicate message
                    </basic-button>
                </div>
            </header>
            <div class="tabnav">
                <ul>
                    <li :class="{ active: currentItem === 'overview' }">
                        <a href="#" @click.prevent="currentItem = 'overview'">
                            Overview
                        </a>
                    </li>
                    <li :class="{ active: currentItem === 'activity' }">
                        <a href="#" @click.prevent="currentItem = 'activity'">
                            Activity
                        </a>
                    </li>
                </ul>
            </div>
            <main class="page-body">
                <ReportOverview
                    v-if="currentItem === 'overview'"
                    :message="message"
                    :overview="overview"
                />
                <ReportActivity
                    v-if="currentItem === 'activity'"
                    :message="message"
                    :activities="activities"
                />
            </main>
        </div>
    </div>
</template>
<script>
import ReportOverview from './ReportOverview'
import ReportActivity from './ReportActivity'
import { mapGetters } from 'vuex'
import { api } from '~/services'
import { appConstants } from '~/constants'
export default {
    name: 'ReportMessage',
    components: {
        ReportOverview,
        ReportActivity,
    },
    props: ['id'],
    data: () => ({
        currentItem: 'overview',
        loading: false,
        message: {},
        overview: {},
        activities: {},
        appBaseUrl: appConstants.baseAppUrl.replace(/(^\w+:|^)\/\//, ''),
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    async created() {
        this.loading = true
        const { status, data } = await api.marketing.getMessageReport(
            this.user.id,
            this.id
        )
        if (status === 'success') {
            this.message = data.Message
            this.overview = data.Overview
            this.activities = data.Activity
        }
        this.loading = false
    },
    methods: {
        async duplicateMessage() {
            const params = {
                ...this.message,
                status:
                    this.message.status === 'Sent'
                        ? 'Pending'
                        : this.message.status,
            }
            let response = await this.$store.dispatch(
                'marketing/insertMessage',
                params
            )
            const { status, message, error } = response
            status === 'success'
                ? this.$toast.success(message)
                : this.$toast.error(error)
            this.$router.push({
                name: 'marketingMessages',
            })
        },
        showViewEmail() {
            let routeData = this.$router.resolve({
                name: 'viewEmail',
                params: {
                    id: this.message.id,
                },
            })
            window.open(routeData.href, '_blank')
        }
    },
}
</script>
