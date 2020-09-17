<template>
    <div class="page page-subscriber-details">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'subscribers' }"
            >
                <i class="ico ico-back"></i>
                <span>Subscribers</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">
                    {{ subscriber.name }}
                </h1>
                <DropdownActions
                    @unsubscribe="handleUnsubscribeClick"
                    @resubscribe="handleResubscribeClick"
                    @archive="handleArchiveClick"
                />
            </div>
            <div class="right-col">
            </div>
        </header>
        <main class="page-body"></main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DropdownActions from '~/components/Form/DropdownActions'
export default {
    name: 'SubscriberDetails',
    components: {
        DropdownActions,
    },
    props: {
        index: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        ...mapGetters({
            subscribers: 'marketing/subscribers',
        }),
        subscriber() {
            return this.subscribers[this.index]
        },
    },
    methods: {
        handleUnsubscribeClick() {
            console.log('Unsubscribe')
        },
        handleResubscribeClick() {
            console.log('Resubscribe')
        },
        handleArchiveClick() {
            console.log('Archive')
        },
    },
}
</script>
