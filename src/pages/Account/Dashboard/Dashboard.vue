<template>
    <div class="page">
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <div class="d-md-flex align-items-center">
                <div>
                    <h1>Welcome! {{ userName }}!</h1>
                    <p class="mt-2 mb-4" v-if="showNewUser">
                        You’re well on your way to making the most out of your
                        music!
                    </p>
                </div>
                <basic-button
                    class="btn-card ml-auto mb-4"
                    @click="goToAccountBeatAdd"
                    v-if="showNewUser"
                >Add a Beat</basic-button>
            </div>
            <div v-if="showNewUser">
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
                <b-container class="container-activity-top">
                    <b-row>
                        <b-col cols="12" md="6" xs="12" class="pl-0">
                            <h6>Recent activity</h6>
                            <div
                                v-if="!activitiesItems.length"
                                class="page-empty empty-text"
                            >Your recent activity will appear here.</div>
                            <b-row v-else v-for="(activity, index) in activitiesItems" :key="index">
                                <DashboardActivity :activity="activity" class="pl-3" />
                            </b-row>
                        </b-col>
                        <b-col cols="12" md="6" xs="12" class="px-0 mx-0">
                            <h6>Top played beats</h6>
                            <div
                                v-if="!beatsItems.length"
                                class="page-empty empty-text"
                            >Your top played beats will appear here.</div>
                            <b-row v-else v-for="(beat, index) in beatsItems" :key="index">
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
import Cookies from 'js-cookie'
import { api } from '~/services/api'
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
        showNewUser() {
            if (
                !this.beat ||
                !this.store ||
                !this.campaign ||
                !this.emailConfirmed
            ) {
                return true
            } else {
                return false
            }
        },
    },
    data() {
        return {
            userName: '',
            userId: null,
            userEmail: '',
            dashboard: null,
            salesCount: 0,
            beat: false,
            store: false,
            campaign: false,
            emailConfirmed: false,
            showCollapse: true,
            analiticsItems: [],
            beatsItems: [],
            activitiesItems: [],
            session: [],
            loading: false,
        }
    },
    async mounted() {
        this.loading = true
        this.session = Cookies.getJSON(appConstants.cookies.auth.name)
        const userResponse = await api.users.getUser(this.session.id)
        const dashboardResponse = await api.users.getDashboard(this.session.id)
        if (userResponse.status === 'success' && dashboardResponse.status) {
            if (userResponse.data.type === 'listener' ) {
                this.$router
                .push({
                    name: 'accountSettingsPurchases',
                })
                .catch(err => {})
            } else {
                this.userId = userResponse.data.id
                this.userEmail = userResponse.data.email
                this.userName =
                    userResponse.data.first_name && userResponse.data.last_name
                        ? `${userResponse.data.first_name} ${userResponse.data.last_name}`
                        : userResponse.data.display_name

                this.dashboard = dashboardResponse.data
                this.beat = this.dashboard.beat
                this.store = this.dashboard.store
                this.campaign = this.dashboard.campaign
                this.emailConfirmed = this.dashboard.email_confirmed
                this.salesCount = this.dashboard.sales_count
                const salesAnalitics = {
                    analitics: this.dashboard.sales_amount,
                    topic: `Earned from <b>${this.salesCount} sales</b>`,
                    format: 'currency',
                    color: '#2DBD9B',
                }
                const beatPlays = {
                    analitics: this.dashboard.plays,
                    topic: 'Beat Plays',
                    format: 'number',
                    color: '#DC2EA6',
                }
                const conversionRate = {
                    analitics: this.dashboard.conversion,
                    topic: 'Conversion Rate',
                    format: 'percent',
                    color: '#FDD311',
                }
                const freeDownloads = {
                    analitics: this.dashboard.free_downloads,
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
                this.beatsItems = this.dashboard.top_5
                this.activitiesItems = this.dashboard.activity
            }            
        }
        this.loading = false
    },
    methods: {
        goToAccountBeatAdd() {
            this.$router
                .push({
                    name: 'accountBeatAdd',
                })
                .catch(err => {})
        },
    },
}
</script>
