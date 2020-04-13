<template>
    <b-modal v-model="show">
        <basic-button v-slot:modal-header>x</basic-button>

        <template v-slot:default>
            <p v-html="msg"></p>

            <BasicButton v-show="cancelShow" v-html="cancelLabel" @click="handleCancelClick" />
            <SpinnerButton v-show="okShow" v-html="okLabel" @click="handleOkClick" />
        </template>

        <template v-slot:modal-footer></template>
    </b-modal>
</template>

<script>
import { BasicButton, SpinnerButton } from '~/components/Button'

export default {
    name: 'AlertBox',
    components: {
        BasicButton,
        SpinnerButton,
    },
    data() {
        return {
            show: false,
            msg: null,
            okShow: null,
            okLabel: null,
            okClick: null,
            cancelShow: null,
            cancelLabel: null,
            cancelClick: null,
            defaults: {
                okShow: true,
                okLabel: 'OK',
                okClick: () => {
                    this.close()
                },
                cancelShow: true,
                cancelLabel: 'Cancel',
                cancelClick: () => {
                    this.close()
                },
            },
        }
    },
    methods: {
        ok(msg, opts) {
            this.open(msg, { ...opts, cancelShow: false })
        },
        okCancel(msg, opts) {
            this.open(msg, opts)
        },
        open(msg, opts) {
            Object.keys(this.defaults).forEach(key => {
                this[key] = opts[key] || this.defaults[key]
            })
            this.show = true
        },
        close() {
            this.show = false
        },
        handleOkClick() {
            typeof this.okClick === 'function' && this.okClick.call(null, this)
        },
        handleCancelClick() {
            typeof this.cancelClick === 'function' &&
                this.cancelClick.call(null, this)
        },
    },
}
</script>