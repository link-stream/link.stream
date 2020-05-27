<template>
    <nav class="fwz-tabs">
        <ul>
            <li
                v-for="(tab, k) in tabs"
                :key="k"
                :class="{ active: tab.step === activeStep }"
                @click="handleTabClick(tab)"
            >
                {{ k + 1 }}. {{ tab.text }}&nbsp;
            </li>
        </ul>
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