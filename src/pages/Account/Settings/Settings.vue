<template>
    <div class="page page-account-settings">
        <h1 class="page-title">Account</h1>
        <TabNav />
        <div class="page-body">
            <component v-bind:is="currentTabComponent"></component>
        </div>
    </div>
</template>

<script>
import TabNav from '~/components/Account/Settings/TabNav'

import {
    AccountInfoTab,
    AccountPurchasesTab,
    AccountPaymentsTab,
    AccountPayoutsTab,
    AccountNotificationsTab,
} from '~/components/Account/Settings'

export default {
    name: 'Settings',
    components: {
        TabNav,
        AccountInfoTab,
        AccountPurchasesTab,
        AccountPaymentsTab,
        AccountPayoutsTab,
        AccountNotificationsTab,
    },
    computed: {
        currentTabComponent() {
            switch (this.$route.name) {
                case 'accountSettingsInfo':
                    return 'AccountInfoTab'
                case 'accountSettingsPurchases':
                    return 'AccountPurchasesTab'
                case 'accountSettingsPayments':
                    return 'AccountPaymentsTab'
                case 'accountSettingsPayouts':
                    return 'AccountPayoutsTab'
                case 'accountSettingsNotifs':
                    return 'AccountNotificationsTab'
            }
        },
    },
}
</script>