<template>
    <b-navbar
        class="topnav profile-nav"
        toggleable="lg"
        type="dark"
        variant="dark"
        fixed="top"
    >
        <b-navbar-brand to="/">
            <Logo1 />
        </b-navbar-brand>
        <b-navbar-nav>
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav>
        <b-navbar-nav class="mr-auto left-padding">
            <SearchInput
                pill
                color="white"
                v-model="searchString"
                placeholder="Search"
                direction="right"
                
            />
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block">
            <b-button 
                class="bg-transparent text-white border-0"
                size="md"
            >
                Sign In
            </b-button>
            <b-button 
                pill
                class="bg-transparent text-white"
                size="md"
            >
                Sign Up
            </b-button>
        </b-navbar-nav>
        <b-navbar-nav class="left-padding">
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
            return window.innerWidth >= appConstants.user.account.menuHiddenBreakpoint
        },
    },
    data : () => ({
        searchString: ''
    }),
    methods: {
        toggle() {},
    },
}
</script>
