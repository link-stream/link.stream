<template>
    <div class="MarketingBlock">
        <div class="Card" v-for="option in options" :key="option.id">
            <b-form-checkbox
                :value="option"
                v-model="selected"
            ></b-form-checkbox>
            <LsIcon class="logo" :icon="option.icon" />
            <div class="Card-title">
                {{ option.title }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarketingBlock',
    data() {
        return {
            selected: [
                ...this.$store.getters['trackAddWizard/form'].selectedMarketing,
            ],
            options: [
                {
                    id: 1,
                    title: 'Follow on LinkStream',
                    icon: 'logo-streamy',
                },
                {
                    id: 2,
                    title: 'Follow on SoundCloud',
                    icon: 'logo-sc',
                },
                {
                    id: 3,
                    title: 'Follow on Twitter',
                    icon: 'logo-twitter',
                },
                {
                    id: 4,
                    title: 'Follow on Instagram',
                    icon: 'logo-ig',
                },
                {
                    id: 5,
                    title: 'Subscribe to SMS',
                    icon: 'envelope-open',
                },
                {
                    id: 7,
                    title: 'Subscribe to Emails',
                    icon: 'envelope-open',
                },
            ],
        }
    },
    created() {
        this.$bus.$on('wz.nextClick', this.handleValidate)
        this.$bus.$on('wz.prevClick', this.updateWizardForm)
        this.$bus.$on('wz.modal.saveClick', this.handleValidate)
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                selectedMarketing: [...this.selected],
            })
        },
        handleValidate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>