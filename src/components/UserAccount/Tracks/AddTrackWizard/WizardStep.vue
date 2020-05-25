<template>
    <div class="fwz-step">
        <slot name="header">
            <header class="step-header" v-if="title">
                <h2 class="step-title">{{ title }}</h2>
                <h4 class="step-subtitle" v-if="subtitle">
                    {{ subtitle }}
                </h4>
            </header>
        </slot>

        <main class="step-body">
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
        },
        subtitle: {
            type: String,
        },
    },
}
</script>