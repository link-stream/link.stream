<template>
    <b-modal
        :modal-class="`alrt --${type}`"
        size="sm"
        v-model="shown"
        centered
        hide-header
        hide-footer
    >
        <LsIconButton class="alrt-close" icon="close" @click="close" />
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
            <ls-button
                class="alrt-action"
                variant="secondary"
                size="sm"
                v-if="opts.cancelShow"
                @click="handleCancelClick"
            >
                {{ opts.cancelText }}
            </ls-button>
            <ls-spinner-button
                class="alrt-action"
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
    MESSAGE: 'msg',
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
            shown: false,
            type: null,
            opts: {
                title: null,
                message: null,
                okShow: null,
                okText: null,
                onOk: null,
                cancelShow: null,
                cancelText: null,
                onCancel: null,
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
            this.shown = true
        },
        msg(message, okText = 'OK') {
            this.type = Type.MESSAGE
            this.opts = {
                ...defaultOpts,
                message,
                okText,
                cancelShow: false,
            }
            this.shown = true
        },
        close() {
            this.shown = false
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
