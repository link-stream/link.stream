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
    props: {
        isEditMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selected: [...this.$store.getters['trackAddWizard/form'].marketing],
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
                    title: 'Follow on Instagram',
                    icon: 'logo-ig',
                },
                {
                    id: 4,
                    title: 'Follow on Twitter',
                    icon: 'logo-twitter',
                },
                {
                    id: 5,
                    title: 'Subscribe to Emails',
                    icon: 'envelope-open',
                },
                {
                    id: 6,
                    title: 'Subscribe to SMS',
                    icon: 'envelope-open',
                },
            ],
        }
    },
    watch: {
        selected() {
            !this.isEditMode && this.updateWizardForm()
        },
    },
    created() {
        this.$bus.$on('wz.validateBlock.marketing', this.handleBlockValidate)
    },
    destroyed() {
        this.$bus.$off('wz.validateBlock.marketing')
    },
    methods: {
        updateWizardForm() {
            this.$store.dispatch('trackAddWizard/updateForm', {
                marketing: [...this.selected],
            })
        },
        handleBlockValidate({ onSuccess }) {
            this.updateWizardForm()
            onSuccess()
        },
    },
}
</script>