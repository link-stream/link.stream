<template>
    <b-modal
        modal-class="SelectMessageTypeModal"
        centered
        v-model="open"
        size="lg"
        hide-footer
    >
        <template v-slot:modal-header>
            <BasicButton variant="icon" class="modal-close" @click="close" />
            <h4 class="title">Select a message type</h4>
        </template>
        <template v-slot:default>
            <b-form-row>
                <b-col cols="12" sm="6">
                    <div class="box-container">
                        <a
                            href="#"
                            class="message-type-container"
                            @click="handleEmailClick"
                        > 
                            <div class="message-type">
                                <font-awesome-icon
                                    :icon="['fas', 'envelope-open-text']"
                                />
                                <h4 class="title">
                                    Email
                                </h4>
                                <div class="description">
                                    Customize and send emails to your audience
                                </div>
                            </div>
                        </a>
                    </div>
                </b-col>
                <b-col cols="12" sm="6">
                    <div class="box-container">
                        <a
                            href="#"
                            class="message-type-container"
                            @click="handleEmailClick"
                        >
                            <div class="message-type"> 
                                <font-awesome-icon
                                    :icon="['fas', 'mobile-alt']"
                                />
                                <h4 class="title">
                                    SMS Message
                                </h4>
                                <div class="description">
                                    Send a quick update to those subscribed to SMS notifications
                                </div>
                            </div>
                        </a>
                    </div>
                </b-col>
            </b-form-row>            
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'SelectMessageTypeModal',
    data() {
        return {
            open: false,
        }
    },
    created() {
        this.$bus.$on('modal.selectMessageType.open', this.handleOpen)
        this.$bus.$on('modal.selectMessageType.close', this.handleClose)
    },
    methods: {
        close() {
            this.open = false
        },
        handleClose() {
            this.open = false
        },
        handleOpen() {
            this.open = true
        },
        handleEmailClick() {
            this.$bus.$emit('modal.createMessage.open')
            this.close()
        },
    },
}
</script>
