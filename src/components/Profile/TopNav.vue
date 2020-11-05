<template>
    <b-navbar
        class="topnav profile-nav"
        toggleable="lg"
        type="dark"
        variant="dark"
        fixed="top"
    >
        <b-navbar-brand to="/" class=" mr-auto d-md-none">
            <Logo1 />
        </b-navbar-brand>
        <b-navbar-brand to="/" class="mr-auto d-none d-md-block">
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
        <b-navbar-nav class="d-none d-md-block" v-if="user && user.type === 'listener'">
            <b-button
                pill
                class="bg-transparent text-white btn-login sell-beats"
                size="md"
                :to="{ name: 'login' }"
                :disabled="true"
            >
                Sell Beats
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
        <b-navbar-nav class="d-none d-md-block" v-if="user && user.type === 'listener'">
            <div class="vertical_divider"></div>
        </b-navbar-nav>
        <b-navbar-nav v-if="session == undefined">
            <b-button
                pill
                class="bg-transparent text-white btn-login sign-in"
                size="md"
                @click="goLogin()"
            >
                Sign In
            </b-button>
        </b-navbar-nav>
        <b-navbar-nav v-else-if="user && user.type === 'listener'">
            <div class="mx-4">
                <b-dropdown
                    dropdown
                    id="dropdown-dropdown"
                    no-flip
                    right
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    menu-class="dropdown-items"
                >
                    <template v-slot:button-content>
                        <b-avatar
                            class="mr-2"
                            size="25px"
                            badge
                            badge-top
                            badge-offset="-0.5em"
                            badge-variant="danger"
                            :src="photo"
                        ></b-avatar>
                        <font-awesome-icon
                            style="color: #ffffff;"
                            :icon="['fas', 'chevron-down']"
                            size="1x"
                        />
                    </template>
                    <b-dropdown-item
                        id="dropdown-item"
                        href="/app/account/purchases"
                        class="py-0"
                    >Purchases</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="/app/account/notifications">
                        <b-row class="pl-3">
                            <span>Notifications (ctd)</span>
                            <div class="oval ml-3 mt-3"></div>
                        </b-row>
                    </b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="#" :disabled="true">Saved Music</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="/app/account/info">Account Settings</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="#">
                        <span style="color: #DC2EA6;">Sell your Beats</span>
                    </b-dropdown-item>
                    <b-dropdown-divider class="divider"></b-dropdown-divider>
                    <b-dropdown-item id="dropdown-item" @click="logout">Sign Out</b-dropdown-item>
                </b-dropdown>
            </div>
        </b-navbar-nav>        
        <b-navbar-nav v-else>            
            <div class="mx-4">
                <b-dropdown
                    dropdown
                    id="dropdown-dropdown"
                    no-flip
                    right
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    menu-class="dropdown-items"
                >                    
                    <template v-slot:button-content>                        
                        <b-avatar
                            class="mr-2"
                            size="25px"
                            badge
                            badge-top
                            badge-offset="-0.5em"
                            badge-variant="danger"
                            :src="photo"
                        ></b-avatar>
                        <font-awesome-icon
                            style="color: #ffffff;"
                            :icon="['fas', 'chevron-down']"
                            size="1x"
                        />
                    </template>
                    <b-dropdown-item
                        id="dropdown-item"
                        href="/app/dashboard"
                        class="py-0"
                    >Seller Dashboard</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="/app/account/purchases">
                        <b-row class="pl-3">
                            <span>Purchases</span>
                            <div class="oval ml-3 mt-3"></div>
                        </b-row>
                    </b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="#" :disabled="true">Conversations</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="#" :disabled="true">Saved Music</b-dropdown-item>
                    <b-dropdown-item id="dropdown-item" href="/app/account/info">
                        <span>Account Settings</span>
                    </b-dropdown-item>
                    <b-dropdown-divider class="divider"></b-dropdown-divider>
                    <b-dropdown-item id="dropdown-item" @click="logout">Sign Out</b-dropdown-item>
                </b-dropdown>
            </div>
        </b-navbar-nav>
        <b-navbar-nav @click="showCart">
            <b-link>
                <img src="@/assets/img/ico/basket.svg" />
            </b-link>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { appConstants } from '~/constants'
import { Logo1, ToggleMenu } from '~/components/Svg'
import Cookies from 'js-cookie'

export default {
    name: 'TopNav',
    components: {
        Logo1,
        ToggleMenu,
    },
    props: {
        user: {
            type: Object,
        },
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
        session: '',
        params_url: [],
        photo: '',
		url_profile: '',
    }),
    mounted() {
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        if (this.session !== undefined) Cookies.remove('previous_route')
        this.params_url = Cookies.getJSON('params_url')
		
		var first_url = this.$route.fullPath.split('/')
        this.url_profile = first_url[1]
    },
    watch: {
        user(){
            this.photo = this.user.data_image
        },
    },
    methods: {
        goLogin() {
            var previous_route = {
                route: 'publicProfile',
                params: this.params_url.url_profile,
            }
            Cookies.set('previous_route', previous_route)
            this.$router
                .push({
                    name: 'login',
                })
                .catch(err => {})
        },        
        toggle() {},
        showCart() {
            this.$bus.$emit('modal.addedCart.open', this.url_profile)
        },
        async logout() {
            var previous_route = {
                route: 'publicProfile',
                params: this.params_url.url_profile,
            }
            Cookies.set('previous_route', previous_route)
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'login' })
        },
    },
}
</script>
