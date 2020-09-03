<template>
    <div class="sidebar" @click.stop="() => {}">
        <b-navbar-brand to="/">
            <Logo1 />
            <span>LinkStream</span>
        </b-navbar-brand>
        <ul class="list-unstyled">
            <li
                v-for="(item, index) in menuItems"
                :key="`parent_${index}`"
                :class="{
                    active: selectedParentMenu === item.id,
                }"
            >
                <router-link
                    :class="{ 'has-submenu' : item.subs && item.subs.length > 0 }"
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
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { appConstants, appMenus } from '~/constants'
import { Logo1 } from '~/components/Svg'
export default {
    name: 'SideBar',
    components: {
        Logo1,
    },
    data() {
        return {
            selectedParentMenu: null,
            menuItems: appMenus,
        }
    },
    mounted() {
        this.selectMenu()
    },
    methods: {
        selectMenu() {
            const currentPath = this.$route.path
            this.menuItems.some( item => {
                let flagFind = false
                if (item.to === currentPath) {
                    flagFind = true
                } else if (item.subs && item.subs.length > 0){
                    console.log(item.subs)
                    if (item.subs.findIndex(({to}) => to === currentPath) > -1) {
                        flagFind = true
                    }
                }
                console.log(flagFind)
                if (flagFind) {
                    this.selectedParentMenu = item.id
                    return true
                } else {
                    return false
                }
            })
            console.log(currentPath)
            console.log(this.selectedParentMenu)
        },
    },
    watch: {
        $route(to, from) {
            if (to.path !== from.path) {
                // const toParentUrl = to.path.split('/').filter(x => x !== '')[1]
                // if (toParentUrl !== undefined && toParentUrl !== null) {
                //     this.selectedParentMenu = toParentUrl.toLowerCase()
                // } else {
                //     this.selectedParentMenu = 'dashboard'
                // }
                this.selectMenu()
                window.scrollTo(0, top)
            }
        },
    },
}
</script>
