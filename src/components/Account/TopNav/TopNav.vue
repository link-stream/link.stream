<template>
    <b-navbar
        class="topnav"
        toggleable="lg"
        type="dark"
        variant="dark"
        fixed="top"
    >
        <b-navbar-brand to="/">
            <Logo1 />
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <TopNavNotifications />
        </b-navbar-nav>
        <b-navbar-nav>
            <TopNavUserMenu />
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import { Logo1, ToggleMenu } from '~/components/Svg'
import TopNavUserMenu from './TopNavUserMenu'
import TopNavNotifications from './TopNavNotifications'

export default {
    name: 'TopNav',
    components: {
        Logo1,
        ToggleMenu,
        TopNavNotifications,
        TopNavUserMenu,
    },
    computed: {
        ...mapGetters({
            menuStatus: 'getMenuState',
        }),
        isHidden() {
            return !this.menuStatus
        },
    },
    methods: {
        toggle() {
            this.$store.commit('setMenuStatus', !this.menuStatus)
        },
    },
}
</script>
