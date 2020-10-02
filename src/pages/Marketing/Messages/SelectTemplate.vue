<template>
    <div class="page page-select-template">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'messages' }"
            >
                <i class="ico ico-back"></i>
                <span>Messages</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <h1 class="page-title">
                Select a email template
            </h1>
        </header>
        <main class="page-body">
            <b-row>
                <b-col
                    cols="12"
                    sm="4"
                    v-for="(template, index) in templates"
                    :key="`template-${index}`"
                >
                    <div class="template-container" @click="showEditMessage(template.type)">
                        <img :src="template.src" />
                        <h5 class="title">
                            {{ template.title }}
                        </h5>
                        <p class="description" v-html="template.description" />
                    </div>
                </b-col>
            </b-row>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SelectEmailTemplate',
    data: () => ({
        templates: [
            {
                src: '/static/img/email-template_1.jpg',
                title: 'Promote a Release',
                type: 'release',
                description:
                    'Let everyone know about your latest Beat, Beat Pack or Sound Kit',
            },
            {
                src: '/static/img/email-template_2.jpg',
                title: 'Plain Text',
                type: 'plain',
                description:
                    'Send a simple, plain text email to your subscribers.',
            },
            {
                src: '/static/img/email-template_3.jpg',
                title: 'Highlight a Video',
                type: 'video',
                description: 'Use a video URL to showcase a video.',
            },
        ],
    }),
    computed: {
        ...mapGetters({
            smsData: 'marketing/smsData',
        }),
    },
    methods: {
        async showEditMessage(type) {
            const params = {
                ...this.smsData,
                template: type,
            }
            await this.$store.dispatch('marketing/setSMSData', params)
            this.$router.push({
                name: 'editMessage',
            })
        },
    },
}
</script>
