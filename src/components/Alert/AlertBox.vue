<template>
    <b-modal
        :modal-class="`AlertBox AlertBox-${type}`"
        size="sm"
        v-model="open"
        centered
        hide-header
        hide-footer
    >
        <LsIconButton class="close-btn" icon="close" @click="close" />
        <div class="body">
            <template v-if="opts.title && opts.message">
                <h2 class="title" v-if="opts.title" v-html="opts.title"></h2>
                <p
                    class="message"
                    v-show="opts.message"
                    v-html="opts.message"
                ></p>
            </template>
            <template v-else>
                <h2 class="title" v-html="opts.title || opts.message"></h2>
            </template>
        </div>
        <footer class="actions">
            <ls-button
                class="action-btn"
                variant="secondary"
                size="sm"
                v-if="opts.cancelShow"
                @click="handleCancelClick"
            >
                {{ opts.cancelText }}
            </ls-button>
            <ls-spinner-button
                class="action-btn"
                size="sm"
                v-if="opts.okShow"
                @click="handleOkClick"
            >
                {{ opts.okText }}
            </ls-spinner-button>
        </footer>
    </b-modal>
</template>

<script>
const Type = {
    CONFIRM: 'confirm',
    ALERT: 'alert',
}

const defaultOpts = {
    title: null,
    message: null,
    okShow: true,
    okText: 'OK',
    onOk: null,
    cancelShow: true,
    cancelText: 'Cancel',
    onCancel: null,
}

export default {
    name: 'AlertBox',
    data() {
        return {
            open: false,
            type: null,
            opts: {
                ...defaultOpts,
            },
        }
    },
    methods: {
        confirm(opts = {}) {
            this.type = Type.CONFIRM
            this.opts = {
                ...defaultOpts,
                okText: 'Confirm',
                ...opts,
            }
            this.open = true
        },
        ok(message, { title = '', okText = 'OK' } = {}) {
            this.type = Type.ALERT
            this.opts = {
                ...defaultOpts,
                title,
                message,
                okText,
                cancelShow: false,
            }
            this.open = true
        },
        oops(message, { title = 'Oops!', okText = 'OK' } = {}) {
            this.type = Type.ALERT
            this.opts = {
                ...defaultOpts,
                title,
                message,
                okText,
                cancelShow: false,
            }
            this.open = true
        },
        close() {
            this.open = false
        },
        handleOkClick() {
            typeof this.opts.onOk === 'function' && this.opts.onOk()
            this.close()
        },
        handleCancelClick() {
            typeof this.opts.onCancel === 'function' && this.opts.onCancel()
            this.close()
        },
    },
}
</script>
