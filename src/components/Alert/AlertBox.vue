<template>
    <b-modal
        modal-class="alrt"
        v-model="show"
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
                class="alrt-act-btn"
                variant="secondary"
                size="sm"
                :disabled="loading"
                v-if="opts.cancelVisible"
                @click="handleCancelClick"
                >{{ opts.cancelLabel }}</basic-button
            >
            <spinner-button
                class="alrt-act-btn"
                size="sm"
                :loading="loading"
                v-if="opts.okVisible"
                @click="handleOkClick"
                >{{ opts.okLabel }}</spinner-button
            >
        </footer>
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
    this.show = true
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
            this.show = false
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
