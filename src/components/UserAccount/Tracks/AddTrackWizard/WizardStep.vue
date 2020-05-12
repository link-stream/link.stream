<template>
    <div class="fwz-step">
        <slot name="header">
            <header class="fwz-step-header" v-if="title">
                <h2 class="fwz-step-title">{{ title }}</h2>
                <h4 class="fwz-step-subtitle" v-if="subtitle">
                    {{ subtitle }}
                </h4>
            </header>
        </slot>

        <main class="fwz-step-body">
            <slot></slot>
        </main>
    </div>
</template>

<script>
export default {
    name: 'WizardStep',
    props: {
        title: {
            type: String,
            default: null,
        },
        subtitle: {
            type: String,
            default: null,
        },
    },
}
</script>