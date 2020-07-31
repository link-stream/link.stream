<template>
    <div class="tabnav">
        <ul>
            <li
                v-for="tab in tabs"
                :key="tab.to"
                :class="{ active: $route.name === tab.to }"
            >
                <router-link :to="{ name: tab.to }">
                    {{ tab.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'TabNav',
    data() {
        return {
            tabs: [
                { title: 'Account', to: 'accountSettingsInfo' },
                { title: 'Purchases', to: 'accountSettingsPurchases' },
                { title: 'Payments', to: 'accountSettingsPayments' },
                { title: 'Payouts', to: 'accountSettingsPayouts' },
                { title: 'Notifications', to: 'accountSettingsNotifs' },
            ],
        }
    },
}
</script>