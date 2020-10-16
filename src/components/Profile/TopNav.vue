<template>
    <b-navbar
        class="topnav profile-nav"
        toggleable="lg"
        type="dark"
        variant="dark"
        fixed="top"
    >
        <!--b-navbar-brand to="/">            
            <Logo1 />
        </b-navbar-brand-->
        <b-navbar-brand to="/" class="mr-auto">
            <div>
                <b-img
                    fluid
                    src="@/assets/img/logo/logo-h-lg.png"
                    width="156.73px"
                    height="34px"
                ></b-img>
            </div>
        </b-navbar-brand>
        <!--b-navbar-nav class="mr-auto">
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav-->
        <!--b-navbar-nav class="mr-auto">
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav-->
        <!--b-navbar-nav class="mr-auto left-padding">
            <SearchInput
                pill
                color="white"
                v-model="searchString"
                placeholder="Search"
                direction="right"
            />
        </b-navbar-nav-->
        <b-navbar-nav class="d-none d-md-block">
            <b-button
                pill
                class="bg-transparent text-white btn-login sell-beats"
                size="md"
                :to="{ name: 'login' }"
            >
                Sell Bits
            </b-button>
            <!--b-button
                pill
                class="bg-transparent text-white"
                size="md"
                :to="{ name: 'signup' }"
            >
                Sign Up
            </b-button-->
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block">
            <div class="vertical_divider"></div>
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block">
            <b-button
                pill
                class="bg-transparent text-white btn-login sign-in"
                size="md"
                :to="{ name: 'login' }"
            >
                Sign In
            </b-button>
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block">
            <div class="mr-4">
                <b-dropdown
                    right
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                >
                    <template v-slot:button-content>
                        <b-avatar badge-variant="info" class="mr-1" size="25px">
                            <!--b-badge variant="light"
                                >9
                                <span class="sr-only"
                                    >unread messages</span
                                ></b-badge
                            -->
                        </b-avatar>
                        <font-awesome-icon
                            style="color: #ffffff;"
                            :icon="['fas', 'chevron-down']"
                            size="1x"
                        />
                    </template>
                    <b-dropdown-item href="#">Purchases</b-dropdown-item>
                    <b-dropdown-item href="#"
                        >Notifications (ctd)</b-dropdown-item
                    >
                    <b-dropdown-item href="#">Saved Music</b-dropdown-item>
                    <b-dropdown-item href="#">Account Settings</b-dropdown-item>
                    <b-dropdown-item href="#">Sell your Beats</b-dropdown-item>
                    <b-dropdown-item href="#"
                        >Something else here...</b-dropdown-item
                    >
                </b-dropdown>
            </div>
        </b-navbar-nav>
        <b-navbar-nav @click="showCart">
            <img src="@/assets/img/ico/basket.svg" />
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { appConstants } from '~/constants'
import { Logo1, ToggleMenu } from '~/components/Svg'

export default {
    name: 'TopNav',
    components: {
        Logo1,
        ToggleMenu,
    },
    computed: {
        isHidden() {
            // eslint-disable-next-line
            return (
                window.innerWidth >=
                appConstants.user.account.menuHiddenBreakpoint
            )
        },
    },
    data: () => ({
        searchString: '',
    }),
    methods: {
        toggle() {},
        showCart() {
            this.$bus.$emit('modal.addedCart.open')
        },
    },
}
</script>
