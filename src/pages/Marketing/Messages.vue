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
            <div v-else-if="messages.length > 0">
                <div class="message-list">
                    <h4 class="date-title">
                        This Week(
                        {{ messages.length }}
                        )
                    </h4>
                    <message-card
                        v-for="(message, index) in messages"
                        :key="`this-week-${index}`"
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
        <CreateSMSModal />
        <EditSMSModal />
    </div>
</template>

<script>
import MessageCard from '~/components/Marketing/MessageCard'
import SelectMessageTypeModal from '~/components/Modal/Marketing/SelectMessageTypeModal'
import CreateMessageModal from '~/components/Modal/Marketing/CreateMessageModal'
import CreateSMSModal from '~/components/Modal/Marketing/CreateSMSModal'
import EditSMSModal from '~/components/Modal/Marketing/EditSMSModal'
import { mapGetters } from 'vuex'
// import moment from 'moment'

export default {
    name: 'MarketingMessages',
    components: {
        MessageCard,
        SelectMessageTypeModal,
        CreateMessageModal,
        CreateSMSModal,
        EditSMSModal,
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            messages: 'marketing/messages',
        }),
        cntEmails() {
            return this.messages.filter(({ type }) => type === 'Email').length
        },
        cntSms() {
            return this.messages.filter(({ type }) => type === 'SMS').length
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('marketing/getMessages')
        this.loading = false
        // console.log(moment().startOf('week'))
        // console.log(moment().startOf('month'))
        // console.log(moment(new Date('2020/02/01')).startOf('month'))
        console.log(this.messages)
    },
    methods: {
        handleCreateClick() {
            this.$bus.$emit('modal.selectMessageType.open')
        },
    },
}
</script>
