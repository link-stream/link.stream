<template>
    <div
        class="sidebar"
        @click.stop="() => {}"
        :class="menuStatus ? 'show-menu' : 'hide-menu'"
    >
        <b-navbar-brand to="/">
            <img src="@/assets/img/ico/logo.svg" />
            <span>LinkStream</span>
        </b-navbar-brand>
        
        <ul class="list-unstyled main-menu">
            <li
                v-for="(item, index) in menuItems"
                :key="`parent_${index}`"
                :class="{
                    active: selectedParentMenu === item.id,
                }"
            >
                <router-link
                    :class="{
                        'has-submenu': item.subs && item.subs.length > 0,
                    }"
                    :to="item.to"
                >
                    <font-awesome-icon :icon="item.icon" size="lg" />
                    {{ item.label }}
                </router-link>
                <div class="sub-menu" v-if="item.subs && item.subs.length > 0">
                    <ul class="list-unstyled">
                        <li
                            v-for="(sub, subIndex) in item.subs"
                            :class="{
                                active: $route.path === sub.to,
                            }"
                            :key="`menu_${index}_${subIndex}`"
                        >
                            <router-link :to="sub.to">
                                <span>{{ sub.label }}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="user-nav">
            <UserMenu />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { appConstants, appMenus } from '~/constants'
import UserMenu from './UserMenu'
export default {
    name: 'SideBar',
    components: {
        UserMenu,
    },
    data() {
        return {
            selectedParentMenu: null,
            menuItems: appMenus,
        }
    },
    computed: {
        ...mapGetters({
            menuStatus: 'getMenuState',
            menuType: 'getMenuType',
        }),
    },
    mounted() {
        this.selectMenu()
        window.addEventListener('resize', this.handleWindowResize)
        document.addEventListener('click', this.handleDocumentClick)
        this.handleWindowResize()
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick)
        window.removeEventListener('resize', this.handleWindowResize)
    },
    methods: {
        selectMenu() {
            const currentPath = this.$route.path
            this.menuItems.some(item => {
                let flagFind = false
                if (item.to === currentPath) {
                    flagFind = true
                } else if (item.subs && item.subs.length > 0) {
                    if (item.subs.findIndex(({ to }) => to === currentPath) > -1) {
                        flagFind = true
                    }
                }
                if (flagFind) {
                    this.selectedParentMenu = item.id
                    return true
                } else {
                    return false
                }
            })
        },
        handleWindowResize(event) {
            if (event && !event.isTrusted) {
                return
            }
            const windowWidth = window.innerWidth
            if (windowWidth < appConstants.user.account.menuHiddenBreakpoint) {
                this.$store.commit('setMenuStatus', false)
                this.$store.commit('setMenuType', 'menu-mobile')
            } else {
                this.$store.commit('setMenuStatus', true)
                this.$store.commit('setMenuType', 'menu-default')
            }
        },
        handleDocumentClick() {
            if (this.menuType === 'menu-mobile') {
                this.$store.commit('setMenuStatus', false)
            }
        },
    },
    watch: {
        $route(to, from) {
            if (to.path !== from.path) {
                this.selectMenu()
                if (this.menuType === 'menu-mobile') {
                    this.$store.commit('setMenuStatus', false)
                }
                window.scrollTo(0, top)
            }
        },
    },
}
</script>
