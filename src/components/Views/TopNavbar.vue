<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand to="/" class="">
            <Logo1 />
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
            <ToggleMenu />
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <Notifications />
        </b-navbar-nav>
        <b-navbar-nav>
            <User />
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { Logo1, ToggleMenu } from '~/components/Svg'
import Notifications from './Notifications'
import User from './User'

export default {
    name: 'TopNavbar',
    components: {
        Logo1,
        ToggleMenu,
        Notifications,
        User,
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 80px;
    background-color: $black !important;

    .navbar-brand .logo {
        height: 34px;
    }
}
</style>
