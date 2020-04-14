<template>
    <b-modal modal-class="alertbox" v-model="show" hide-header hide-footer>
        <div class="a__content">
            <IconButton class="a__close" icon="close-2" @click="close" />
            <template v-if="opts.title && opts.message">
                <h2 class="a__title" v-if="opts.title" v-html="opts.title"></h2>
                <p class="a__msg" v-show="opts.message" v-html="opts.message"></p>
            </template>
            <template v-else>
                <h2 class="a__title" v-html="opts.title || opts.message"></h2>
            </template>
            <footer class="a__actions">
                <basic-button
                    class="a__cancel"
                    variant="secondary"
                    :disabled="loading"
                    v-show="opts.cancelShow"
                    @click="handleCancelClick"
                >{{ opts.cancelText }}</basic-button>
                <spinner-button
                    class="a__ok"
                    :loading="loading"
                    v-show="opts.okShow"
                    @click="handleOkClick"
                >{{ opts.okText }}</spinner-button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
import { BasicButton, SpinnerButton, IconButton } from '~/components/Button'

const defaultOpts = {
    title: null,
    message: null,
    okShow: true,
    okText: 'OK',
    cancelShow: true,
    cancelText: 'Cancel',
    onOk: function() {
        this.close()
    },
    onCancel: function() {
        this.close()
    },
}

export default {
    name: 'AlertBox',
    components: {
        BasicButton,
        SpinnerButton,
        IconButton,
    },
    data() {
        return {
            show: false,
            loading: false,
            opts: {
                title: null,
                message: null,
                okShow: null,
                okText: null,
                cancelShow: null,
                cancelText: null,
                onOk: null,
                onCancel: null,
            },
        }
    },
    methods: {
        alert(opts) {
            for (let key in defaultOpts) {
                this.opts[key] = opts[key] || defaultOpts[key]
            }
            this.loading = false
            this.show = true
        },
        close() {
            this.show = false
            this.loading = false
        },
        handleOkClick() {
            typeof this.opts.onOk === 'function' &&
                this.opts.onOk.call(this, this)
        },
        handleCancelClick() {
            typeof this.opts.onCancel === 'function' &&
                this.opts.onCancel.call(this, this)
        },
    },
}
</script>