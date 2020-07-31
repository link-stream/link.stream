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
        <b-navbar-nav>
            <a href="#" @click.prevent.stop="toggle">
                <ToggleMenu :isHidden="isHidden" />
            </a>
        </b-navbar-nav>
        <b-navbar-nav class="mr-auto ml-4">
            <SearchInput
                pill
                color="white"
                v-model="searchString"
                placeholder="Search"
                direction="right"
                
            />
        </b-navbar-nav>
        <b-navbar-nav>
            <b-button 
                class="bg-transparent text-white mr-2 border-0"
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
