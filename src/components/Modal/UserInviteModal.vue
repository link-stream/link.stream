<template>
    <b-modal
        modal-class="mdl-user-invite"
        id="mdlUserInvite"
        size="lg"
        centered
    >
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
                placeholder="Email Address"
            />
        </template>

        <template v-slot:modal-footer>
            <ls-button>Send Invite</ls-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: 'UserInviteModal',
    methods: {
        close() {
            this.$bvModal.hide('mdlUserInvite')
        },
    },
}
</script>
