<template>
    <div class="DashboardAnalitics" :style="borderClass">
        <h1 v-if="analitics.format === 'currency'">
            {{
            analitics.analitics | currencyFormat
            }}
        </h1>
        <h1 v-else-if="analitics.format === 'number'">
            {{
            analitics.analitics | thousandNumber
            }}
        </h1>
        <h1 v-else>{{ analitics.analitics }}%</h1>
        <p v-html="analitics.topic"></p>
    </div>
</template>

<script>
export default {
    name: 'DashboardAnalitics',
    props: {
        analitics: {
            type: Object,
        },
    },
    data() {
        return {
            borderClass: 'border-top: 5px solid #fdd311',
        }
    },
    created() {
        this.borderClass = `border-top: 5px solid ${this.analitics.color}`
    },
}
</script>
