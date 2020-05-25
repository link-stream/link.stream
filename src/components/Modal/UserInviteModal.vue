<template>
    <b-modal modal-class="mdl-user-invite" size="lg" centered v-model="shown">
        <template v-slot:modal-header>
            <LsIconButton class="modal-close" use-bg-img @click="close" />
            <h2 class="modal-title">Invite collaborator</h2>
            <h4 class="modal-subtitle">
                Send an invitation to join and collaborate
            </h4>
        </template>

        <template v-slot:default>
            <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': $v.email.$error }"
                placeholder="Email Address"
                v-model="$v.email.$model"
            />
            <div class="invalid-feedback">
                Enter a valid email
            </div>
        </template>

        <template v-slot:modal-footer>
            <ls-button @click="handleSendClick">Send Invite</ls-button>
        </template>
    </b-modal>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'UserInviteModal',
    data() {
        return {
            shown: false,
            email: null,
        }
    },
    validations: {
        email: {
            required,
            email,
        },
    },
    created() {
        this.$bus.$on('modal.userInvite.show', this.handleShow)
    },
    methods: {
        close() {
            this.shown = false
        },
        handleShow() {
            this.$v.email.$reset()
            this.email = null
            this.shown = true
        },
        handleSendClick() {
            this.$v.email.$touch()
            if (this.$v.email.$invalid) {
                return
            }
            this.$alert.msg('Todo')
        },
    },
}
</script>
