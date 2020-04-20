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
                >{{ opts.cancelLabel }}</basic-button>
                <spinner-button
                    class="alrt__ok"
                    size="sm"
                    :loading="loading"
                    v-if="opts.okVisible"
                    @click="handleOkClick"
                >{{ opts.okLabel }}</spinner-button>
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
    okLabel: 'OK',
    okCallback: null,
    cancelVisible: true,
    cancelLabel: 'Cancel',
    cancelCallback: null,
}

const showAlert = function(opts) {
    for (let key in defaultOpts) {
        this.opts[key] = key in opts ? opts[key] : defaultOpts[key]
    }
    this.loading = false
    this.visible = true
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
                okLabel: null,
                okCallback: null,
                cancelVisible: null,
                cancelLabel: null,
                cancelCallback: null,
            },
        }
    },
    methods: {
        confirm(opts) {
            showAlert.call(this, {
                okLabel: 'Confirm',
                ...opts,
            })
        },
        close() {
            this.visible = false
            this.loading = false
        },
        handleOkClick() {
            this.opts.okCallback !== null && this.opts.okCallback()
            this.close()
        },
        handleCancelClick() {
            this.opts.cancelCallback !== null && this.opts.cancelCallback()
            this.close()
        },
    },
}
</script>