<template>
    <b-modal
        modal-class="alrt"
        ref="modal"
        size="sm"
        centered
        hide-header
        hide-footer
    >
        <IconButton class="alrt-close" icon="close" @click="close" />
        <div class="alrt-body">
            <template v-if="opts.title && opts.message">
                <h2
                    class="alrt-title"
                    v-if="opts.title"
                    v-html="opts.title"
                ></h2>
                <p
                    class="alrt-msg"
                    v-show="opts.message"
                    v-html="opts.message"
                ></p>
            </template>
            <template v-else>
                <h2 class="alrt-title" v-html="opts.title || opts.message"></h2>
            </template>
        </div>
        <footer class="alrt-actions">
            <basic-button
                class="alrt-action"
                variant="secondary"
                size="sm"
                v-if="opts.cancelVisible"
                @click="handleCancelClick"
            >
                {{ opts.cancelText }}
            </basic-button>
            <spinner-button
                class="alrt-action"
                size="sm"
                v-if="opts.okVisible"
                @click="handleOkClick"
            >
                {{ opts.okText }}
            </spinner-button>
        </footer>
    </b-modal>
</template>

<script>
import { BasicButton, SpinnerButton, IconButton } from '~/components/Button'

const defaultOpts = {
    title: null,
    message: null,
    okVisible: true,
    okText: 'OK',
    okCallback: null,
    cancelVisible: true,
    cancelText: 'Cancel',
    cancelCallback: null,
}

const showAlert = function(opts) {
    for (let key in defaultOpts) {
        this.opts[key] = key in opts ? opts[key] : defaultOpts[key]
    }
    this.$refs.modal.show()
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
            showAlert.call(this, {
                okText: 'Confirm',
                ...opts,
            })
        },
        close() {
            this.$refs.modal.hide()
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
