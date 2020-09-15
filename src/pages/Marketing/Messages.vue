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
                <div
                    v-for="item in realMessages"
                    class="message-list"
                    :key="item.dateTitlle"
                >
                    <h4 class="date-title">
                        {{ item.dateTitle }}
                        (
                        {{ item.messages.length }}
                        )
                    </h4>
                    <message-card
                        v-for="(message, index) in item.messages"
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
import moment from 'moment'

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
            realMessages: [],
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
    watch: {
        messages: {
            deep: true,
            handler() {
                console.log('message changed!')
                this.refreshRealMessages()
            },
        },
    },
    async created() {
        this.loading = true
        await this.$store.dispatch('marketing/getMessages')
        this.loading = false
        // console.log(moment(new Date('2020/02/01')).startOf('month'))
        // console.log(this.messages)
        this.refreshRealMessages()
    },
    methods: {
        handleCreateClick() {
            this.$bus.$emit('modal.selectMessageType.open')
        },    
        refreshRealMessages() {
            // console.log(this.messages)
            let sortMessages = []
            let tempMessages = [...this.messages]
            tempMessages.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
            const startOfWeek = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
            const thisWeek = tempMessages.filter(({ created_at }) => created_at >= startOfWeek)
            sortMessages.push({
                dateTitle: 'This Week',
                messages: [...thisWeek],
            })
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
            if (startOfWeek !== startOfMonth) {
                const previousWeek = tempMessages.filter(({ created_at }) => created_at >= startOfMonth && created_at < startOfWeek)
                sortMessages.push({
                    dateTitle: 'Previous Week',
                    messages: previousWeek,
                })
            }
            // const curMonth = moment().get('month')
            // let curStartOfMonth = moment().startOf('month')
            // for (let m = curMonth - 1; m >= 0; m--) {
            //     curStartOfMonth.set('month', m)
            //     const curStartTime = curStartOfMonth.format('YYYY-MM-DD HH:mm:ss')
            //     console.log(curStartTime)
            // }
            this.realMessages = sortMessages
            // return sortMessages
        },
    },
}
</script>
