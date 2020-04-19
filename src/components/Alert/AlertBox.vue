<template>
    <b-modal modal-class="alertbox" v-model="visible" hide-header hide-footer>
        <div class="alrt__content">
            <IconButton class="alrt__close" icon="alert-close" @click="close" />
            <template v-if="opts.title && opts.message">
                <h2 class="alrt__title" v-if="opts.title" v-html="opts.title"></h2>
                <p class="alrt__msg" v-show="opts.message" v-html="opts.message"></p>
            </template>
            <template v-else>
                <h2 class="alrt__title" v-html="opts.title || opts.message"></h2>
            </template>
            <footer class="alrt__act">
                <basic-button
                    class="alrt__cancl"
                    variant="secondary"
                    size="sm"
                    :disabled="loading"
                    v-if="opts.cancelVisible"
                    @click="handleCancelClick"
                >{{ opts.cancelText }}</basic-button>
                <spinner-button
                    class="alrt__ok"
                    size="sm"
                    :loading="loading"
                    v-if="opts.okVisible"
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
    okVisible: true,
    okText: 'OK',
    okCallback: function() {
        this.close()
    },
    cancelVisible: true,
    cancelText: 'Cancel',
    cancelCallback: function() {
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
            visible: false,
            loading: false,
            opts: {
                title: null,
                message: null,
                okVisible: null,
                okText: null,
                okCallback: null,
                cancelVisible: null,
                cancelText: null,
                cancelCallback: null,
            },
        }
    },
    methods: {
        confirm(opts) {
            this.show({
                okText: 'Confirm',
                ...opts,
            })
        },
        show(opts) {
            for (let key in defaultOpts) {
                this.opts[key] = key in opts ? opts[key] : defaultOpts[key]
            }
            this.loading = false
            this.visible = true
        },
        close() {
            this.visible = false
            this.loading = false
        },
        handleOkClick() {
            typeof this.opts.okCallback === 'function' &&
                this.opts.okCallback.call(this, this)
        },
        handleCancelClick() {
            typeof this.opts.cancelCallback === 'function' &&
                this.opts.cancelCallback.call(this, this)
        },
    },
}
</script>