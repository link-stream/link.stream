<template>
    <div class="page">
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <h1>Welcome! {{ userName }}!</h1>
            <div v-if="showNewUser">
                <p class="mt-2 mb-4">
                    You’re almost ready to sell your beats on LinkStream. Here’s
                    some ideas to get started…
                </p>
                <DashboardCollapse :beat="beat" :store="store" :campaign="campaign" />
                <DashboardCard :user_id="userId" :email="userEmail" />
            </div>
            <div v-else>
                <p class="mt-2 mb-4">
                    Here’s what’s been going on with your store over the past
                    <b>7 days</b>
                </p>
                <b-container class="analitics-container px-0" no-gutters>
                    <b-row class="mx-0">
                        <b-col
                            cols="6"
                            md="3"
                            sm="3"
                            xs="6"
                            v-for="(item, index) in analiticsItems"
                            :key="index"
                            class="p-2"
                        >
                            <DashboardAnalitics :analitics="item" />
                        </b-col>
                    </b-row>
                </b-container>
                <DashboardSales :sales="salesCount" />
                <b-container>
                    <b-row>
                        <b-col cols="12" md="6" xs="12" class="pl-0">
                            <h6>Recent activity</h6>
                            <b-row v-for="(activity, index) in activitiesItems" :key="index">
                                <DashboardActivity :activity="activity" class="pl-3" />
                            </b-row>
                        </b-col>
                        <b-col cols="12" md="6" xs="12" class="px-0 mx-0">
                            <h6>Top played beats</h6>
                            <b-row v-for="(beat, index) in beatsItems" :key="index">
                                <DashboardBeats :beat="beat" :index="index" class="pl-3" />
                            </b-row>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { appConstants } from '~/constants'
import DashboardCard from '@/components/Account/Dashboard/DashboardCard'
import DashboardSales from '@/components/Account/Dashboard/DashboardSales'
import DashboardBeats from '@/components/Account/Dashboard/DashboardBeats'
import DashboardActivity from '@/components/Account/Dashboard/DashboardActivity'
import DashboardCollapse from '@/components/Account/Dashboard/DashboardCollapse'
import DashboardAnalitics from '@/components/Account/Dashboard/DashboardAnalitics'
export default {
    name: 'Dashboard',
    components: {
        DashboardCard,
        DashboardSales,
        DashboardBeats,
        DashboardCollapse,
        DashboardActivity,
        DashboardAnalitics,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            dashboardData: 'me/dashboardData',
        }),
        salesCount() {
            return this.dashboardData ? this.dashboardData.sales_count : 0
        },
        showNewUser() {
            if (
                !this.beat ||
                !this.store ||
                !this.campaign ||
                !this.email_confirmed
            ) {
                return true
            } else {
                return false
            }
        },
        beat() {
            return this.dashboardData ? this.dashboardData.beat : false
        },
        store() {
            return this.dashboardData ? this.dashboardData.store : false
        },
        campaign() {
            return this.dashboardData ? this.dashboardData.campaign : false
        },
        email_confirmed() {
            return this.dashboardData
                ? this.dashboardData.email_confirmed
                : false
        },
        activitiesItems() {
            return this.dashboardData ? this.dashboardData.activity : []
        },
        beatsItems() {
            return this.dashboardData ? this.dashboardData.top_5 : []
        },
    },
    data() {
        return {
            userName: '',
            userId: null,
            userEmail: '',
            showCollapse: true,
            analiticsItems: [],
            session: [],
            loading: false,
        }
    },
    async mounted() {
        this.loading = true
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)        
        await this.$store.dispatch('me/loadDashboard', this.session.id)
        this.userId = this.user.id
        this.userEmail = this.user.email
        this.userName =
            this.user.first_name && this.user.last_name
                ? `${this.user.first_name} ${this.user.last_name}`
                : this.user.display_name

        const salesAnalitics = {
            analitics: this.dashboardData.sales_amount,
            topic: `Earned from <b>${this.salesCount} sales</b>`,
            format: 'currency',
            color: '#2DBD9B',
        }
        const beatPlays = {
            analitics: this.dashboardData.plays,
            topic: 'Beat Plays',
            format: 'number',
            color: '#DC2EA6',
        }
        const conversionRate = {
            analitics: this.dashboardData.conversion,
            topic: 'Conversion Rate',
            format: 'percent',
            color: '#FDD311',
        }
        const freeDownloads = {
            analitics: this.dashboardData.free_downloads,
            topic: 'Free Downloads',
            format: 'number',
            color: '#32C5FF',
        }
        this.analiticsItems = []
        this.analiticsItems.push.apply(this.analiticsItems, [
            salesAnalitics,
            beatPlays,
            conversionRate,
            freeDownloads,
        ])
        this.loading = false
    }
}
</script>
