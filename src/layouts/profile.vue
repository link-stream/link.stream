<template>
    <div class="layout layout-profile">
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav :user="user" />
        <vue-progress-bar></vue-progress-bar>
        <AddedCartModal />
    </div>
</template>

<script>
import TopNav from '~/components/Profile/TopNav'
import AddedCartModal from '@/components/Modal/AddedCartModal'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import { api } from '~/services'
export default {
    name: 'Profile',
    components: {
        TopNav,
        AddedCartModal,
    },
    data() {
        return {
            session: [],
            user: null,
        }
    },
    async mounted() {
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        if (this.session) {
            const userResponse = await api.users.getUser(this.session.id)
            if (userResponse.status === 'success') {
                this.user = userResponse.data
            }
        }
        //Cookies.remove('params_url')
        var fullPath = this.$route.fullPath
        var arrayFullPath = fullPath.split('?')

        var first_url = arrayFullPath[0].split('/')
        var url_profile = first_url[1]

        var cookiesUrl = Cookies.getJSON('params_url')
        if (cookiesUrl === undefined && url_profile !== 'order') {
            //var url_profile = ''
            var utm_source = this.$route.query.utm_source
                ? this.$route.query.utm_source
                : ''
            var ref_id = this.$route.query.ref_id
                ? this.$route.query.ref_id
                : ''

            var params_url = {
                url_profile: url_profile,
                utm_source: utm_source,
                ref_id: ref_id,
            }
            Cookies.set('params_url', params_url)
        }
    },
}
</script>
