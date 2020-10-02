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
        <header class="page-header">
            <div class="left-col">
                <h1 class="page-title">
                    Placeholder Email Title
                </h1>
                <div class="page-preview">
                    <span class="text-light">link.stream/</span>
                    <span>{{ user.user_name }}/placeholder-email-title</span>
                    <basic-button variant="outline-light" size="xs">
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
            <ReportOverview v-if="currentItem === 'overview'" />
            <ReportActivity v-if="currentItem === 'activity'" />
        </main>
    </div>
</template>
<script>
import ReportOverview from './ReportOverview'
import ReportActivity from './ReportActivity'
import { mapGetters } from 'vuex'
export default {
    name: 'ReportMessage',
    components: {
        ReportOverview,
        ReportActivity,
    },
    data: () => ({
        currentItem: 'overview',
    }),
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    methods: {
        duplicateMessage() {},
    },
}
</script>
