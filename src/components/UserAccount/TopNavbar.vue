<template>
    <b-navbar class="user-account-topnav" toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand to="/">
            <Logo1 />
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <TopNavbarNotif/>
        </b-navbar-nav>
        <b-navbar-nav>
            <TopNavbarUserMenu/>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { appConstants } from '~/constants'
import { Logo1, ToggleMenu } from '~/components/Svg'
import TopNavbarUserMenu from './TopNavbarUserMenu'
import TopNavbarNotif from './TopNavbarNotif'

export default {
    name: 'TopNavbar',
    components: {
        Logo1,
        ToggleMenu,
        TopNavbarNotif,
        TopNavbarUserMenu,
    },
    computed: {
        ...mapGetters({
            menuType: 'getMenuType',
            menuClickCount: 'getMenuClickCount',
        }),
        isHidden() {
            if (window.innerWidth < appConstants.menuHiddenBreakpoint) {
                return !(this.menuType.includes('menu-mobile') && this.menuType.includes('main-show-temporary'))
            } else {
                return this.menuType.includes('main-hidden') && this.menuType.includes('sub-hidden')
            }
        },
    },
    methods: {
        ...mapMutations(['changeSideMenuStatus', 'changeSideMenuForMobile']),
        toggle() {
            if (window.innerWidth < appConstants.menuHiddenBreakpoint) {
                this.changeSideMenuForMobile(this.menuType)
            } else {
                this.changeSideMenuStatus({ step: this.menuClickCount + 1, classNames: this.menuType })
            }
        },
    },
}
</script>