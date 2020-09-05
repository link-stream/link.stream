<template>
    <div class="page page-messages">
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">Marketing messages</h1>
                <h4 class="page-subtitle">
                    You have
                    <span class="active-number">
                        {{ cntEmails | thousandCNumber }}
                    </span>
                    mail subscribers and
                    <span class="active-number">
                        {{ cntSms | thousandCNumber }}
                    </span>
                    SMS subscribers
                </h4>
            </div>
            <div class="right-col">
                <basic-button @click="handleCreateClick">
                    Create Message
                </basic-button>
            </div>
        </header>
        <main class="page-body">
            <div class="page-empty" v-if="!loading && !messages.length">
                <div class="empty-text">
                    Your messages will appear here.
                </div>
            </div>
            <LoadingSpinner class="page-loader" v-if="loading" />
            <div class="">
                <div class="message-list">
                    <h4 class="date-title">
                        This Week(
                        {{thisWeekMessages.length}}
                        )
                    </h4>
                    <message-card
                        v-for="(message, index) in thisWeekMessages"
                        :key="`this-week-${index}`"
                        :message="message"
                    />
                </div>
                <div class="message-list">
                    <h4 class="date-title">
                        May, 2020(
                        {{mayMessages.length}}
                        )
                    </h4>
                    <message-card
                        v-for="(message, index) in mayMessages"
                        :key="`may-${index}`"
                        :message="message"
                    />
                </div>
                <basic-button
                    variant="outline-light"
                    size="sm"
                    class="btn-show-more"
                >
                    Load More Messages
                </basic-button>
            </div>
        </main>
        <SelectMessageTypeModal />
        <CreateMessageModal />
    </div>
</template>

<script>
import MessageCard from '~/components/Marketing/MessageCard'
import SelectMessageTypeModal from '~/components/Modal/SelectMessageTypeModal'
import CreateMessageModal from '~/components/Modal/CreateMessageModal'
import { mapGetters } from 'vuex'

export default {
    name: 'MarketingMessages',
    components: {
        MessageCard,
        SelectMessageTypeModal,
        CreateMessageModal,
    },
    data() {
        return {
            loading: false,
            cntEmails: 5748,
            cntSms: 2257,
            messages: [
                {
                    type: 'email',
                    title: 'Someone To Love You',
                    datetime: '2020/07/09 10:05:00',
                    status: 'scheduled',
                    opens: null,
                    clicks: null,
                    revenue: null,
                },
                {
                    type: 'email',
                    title: 'Insert Your Subject Here 2',
                    datetime: '2020/07/08 10:05:00',
                    status: 'draft',
                    opens: null,
                    clicks: null,
                    revenue: null,
                },
                {
                    type: 'sms',
                    title: '2 For 1 Deal Today Only',
                    datetime: '2020/07/07 10:05:00',
                    status: 'sent',
                    opens: 5.2,
                    clicks: 0.2,
                    revenue: 39,
                },
                {
                    type: 'email',
                    title: 'Longer Placeholder Email Title Insert Your Subject Here',
                    datetime: '2020/07/06 20:05:00',
                    status: 'sent',
                    opens: 5.2,
                    clicks: 0.2,
                    revenue: 39,
                },
                {
                    type: 'email',
                    title: 'Insert Your Subject Here',
                    datetime: '2020/05/25 14:07:00',
                    status: 'sent',
                    opens: 5.2,
                    clicks: 0.2,
                    revenue: 39,
                },
                {
                    type: 'email',
                    title: 'Longer Placeholder Email Title Insert Your Subject Here',
                    datetime: '2020/05/23 20:05:00',
                    status: 'sent',
                    opens: 5.2,
                    clicks: 0.2,
                    revenue: 39,
                },
            ],
            thisWeekMessages: [],
            mayMessages: [],
        }
    },
    computed: {
        ...mapGetters({}),
    },
    async created() {
        this.loading = true
        // await this.$store.dispatch('me/loadLinks')
        this.loading = false
        this.thisWeekMessages = this.messages.slice(0, 4)
        this.mayMessages = this.messages.slice(4)
    },
    methods: {
        handleCreateClick() {
            this.$bus.$emit('modal.selectMessageType.open')
        }
    },
}
</script>
