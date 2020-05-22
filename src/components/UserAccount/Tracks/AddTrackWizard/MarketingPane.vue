<template>
    <div>
        <ul>
            <li v-for="option in options" :key="option.id">
                <b-form-checkbox
                    :value="option"
                    v-model="selected"
                ></b-form-checkbox>

                {{ option.title }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Marketing',
    props: {
        initialSelected: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            selected: [...this.initialSelected],
            options: [
                {
                    id: 1,
                    title: 'Follow on LinkStream',
                },
                {
                    id: 2,
                    title: 'Follow on SoundCloud',
                },
                {
                    id: 3,
                    title: 'Follow on Instagram',
                },
                {
                    id: 4,
                    title: 'Follow on Twitter',
                },
                {
                    id: 5,
                    title: 'Subscribe to Emails',
                },
                {
                    id: 6,
                    title: 'Subscribe to SMS',
                },
            ],
        }
    },
    created() {
        this.$eventBus.$on('wz.nextClick', this.handleStepNextClick)
    },
    methods: {
        handleStepNextClick({ currentStep }) {
            if (currentStep !== 'marketing') {
                return
            }
            this.$eventBus.$emit('wz.updateForm', {
                marketing: this.selected,
            })
            this.$eventBus.$emit('wz.goToNext')
        },
    },
}
</script>