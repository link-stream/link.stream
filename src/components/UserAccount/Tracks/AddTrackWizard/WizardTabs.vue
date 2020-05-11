<template>
    <nav class="fwz-tabs">
        <span v-for="(tab, k) in tabs" :key="k">
            <span :class="{ 'font-weight-bold': tab.step === activeStep }">
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
}
</script>