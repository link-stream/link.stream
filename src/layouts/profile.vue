<template>
    <div class="layout layout-profile">
        <main class="layout-content">
            <transition name="page" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
        <TopNav />
        <vue-progress-bar></vue-progress-bar>
        <AddedCartModal />
    </div>
</template>

<script>
import TopNav from '~/components/Profile/TopNav'
import AddedCartModal from '@/components/Modal/AddedCartModal'
import Cookies from 'js-cookie'
export default {
    name: 'Profile',
    components: {
        TopNav,
        AddedCartModal,
    },
    mounted() {
        //Cookies.remove('params_url')
        var fullPath = this.$route.fullPath
        var arrayFullPath = fullPath.split('?')

        var first_url = arrayFullPath[0].split('/')
        var url_profile = first_url[1]

        var cookiesUrl = Cookies.getJSON('params_url')
        console.log('cookiesUrl', cookiesUrl)
        if (cookiesUrl === undefined && url_profile !== 'order') {
            //var url_profile = ''
            var utm_source = ''
            var ref_id = ''

            if (arrayFullPath.length > 1) {
                var paramsFullPath = arrayFullPath[1].split('&')
                if (paramsFullPath.length > 1) {
                    utm_source = paramsFullPath[0].split('=')[1]
                    ref_id = paramsFullPath[1].split('=')[1]
                }
                if (paramsFullPath.length === 1) {
                    var param = paramsFullPath[0].split('=')[0]
                    if (param === 'utm_source') {
                        utm_source = paramsFullPath[0].split('=')[1]
                        ref_id = ''
                    } else {
                        utm_source = ''
                        ref_id = paramsFullPath[0].split('=')[1]
                    }
                }
            }
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
