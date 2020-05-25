<template>
    <nav class="fwz-tabs">
        <span v-for="(tab, k) in tabs" :key="k">
            <span
                :class="{ 'font-weight-bold': tab.step === activeStep }"
                @click="handleTabClick(tab)"
            >
                {{ k + 1 }}. {{ tab.text }}&nbsp;
            </span>
        </span>
    </nav>
</template>

<script>
export default {
    name: 'WizardTabs',
    props: {
        tabs: {
            type: Array,
        },
        activeStep: {
            type: String,
        },
    },
    methods: {
        handleTabClick(tab) {
            this.$emit('tab-click', tab)
        },
    },
}
</script>