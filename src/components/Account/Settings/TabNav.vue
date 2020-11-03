<template>
    <div class="tabnav">
        <ul>
            <li
                v-for="tab in tabs"
                :key="tab.to"
                :class="{ active: $route.name === tab.to }"
            >
                <router-link :to="{ name: tab.to }"
                    v-if="userObj && (tab.userType === 'both' 
                    || tab.userType === userObj.type)"
                >
                    {{ tab.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { api } from '~/services/api'
import { appConstants } from '~/constants'
export default {
    name: 'TabNav',
    data() {
        return {
            tabs: [
                { title: 'Account', to: 'accountSettingsInfo', userType: 'both'},
                { title: 'Purchases', to: 'accountSettingsPurchases',userType: 'both' },
                { title: 'Payments', to: 'accountSettingsPayments', userType: 'both' },
                { title: 'Payouts', to: 'accountSettingsPayouts', userType: 'producer' },
                { title: 'Notifications', to: 'accountSettingsNotifs', userType: 'both' },
            ],
            userObj: null,
            session: null,
        }
    },
    async  created() {
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        const userResponse = await api.users.getUser(this.session.id)
        if (userResponse.status === 'success') {
            this.userObj = userResponse.data
        }
    }
}
</script>
