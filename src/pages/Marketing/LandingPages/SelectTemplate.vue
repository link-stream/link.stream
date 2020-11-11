<template>
    <div class="page page-select-template">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'landingPages' }"
            >
                <i class="ico ico-back"></i>
                <span>Landing Pages</span>
            </basic-button>
        </nav>
        <header class="page-header">
            <h1 class="page-title">
                Select a landing page template
            </h1>
        </header>
        <main class="page-body">
            <b-row>
                <b-col
                    cols="12"
                    sm="6"
                    v-for="(template, index) in templates"
                    :key="`template-${index}`"
                >
                    <div class="template-container" @click="showEditPage(template.type)">
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
export default {
    name: 'SelectPageTemplate',
    data: () => ({
        templates: [
            {
                src: '/static/img/template_1.png',
                title: 'Email Capture',
                description:
                    'Let everyone know about your latest<br/>Beat, Beat Pack or Sound Kit',
                type: 'email',
            },
            {
                src: '/static/img/template_2.png',
                title: 'Collect Payment',
                description:
                    'Lorem ipsum dolor sit amet, adipiscing<br/>elit morbi hendrerit congue.',
                type: 'collect',
            },
            {
                src: '/static/img/template_3.png',
                title: 'Lead Generation',
                description: 'Simple email capture with a<br/>background image',
                type: 'lead'
            },
        ],
    }),
    methods: {
        async showEditPage(type) {
            await this.$store.dispatch('marketing/setLandingData', {})
            let routerName = 'editLandingPage'
            switch (type) {
                case 'email':
                    routerName = 'editEmailLandingPage'
                    break
                case 'collect':
                    routerName = 'editCollectLandingPage'
                    break
                case 'lead':
                    routerName = 'editLeadLandingPage'
                    break
            }
            this.$router.push({
                name: routerName,
            })
        },
    },
}
</script>
