<template>
    <div class="position-relative d-inline-block user">
        <b-dropdown
            class="dropdown-menu-right"
            right
            variant="link"
            toggle-class="text-decoration-none"
            menu-class="position-absolute"
            no-caret
        >
            <template slot="button-content">
                <span>
                    <b-img :alt="user.first_name" :src="avatar" rounded="circle" class="avatar" />
                </span>
            </template>
            <b-dropdown-item>Account</b-dropdown-item>
            <b-dropdown-item>Features</b-dropdown-item>
            <b-dropdown-item>History</b-dropdown-item>
            <b-dropdown-item>Support</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'User',
    computed: {
        ...mapGetters(['user']),
        avatar() {
            return this.user.image || require('@/assets/img/profile/profile-pic-l.jpg')
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push({ name: 'login' })
        },
    },
}
</script>
