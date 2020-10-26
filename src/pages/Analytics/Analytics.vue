<template>
    <div class="page">
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <h1>Analytics overview</h1>
            <div class="d-sm-flex align-items-center dropdown-div mb-3">
                <p class="mr-2">Here’s what’s been going on with your store</p>
                <AnalyticsDropdown @update="updateChartsData" />
            </div>
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
            <b-container class="px-0" no-gutters>
                <b-row>
                    <b-col cols="12" class="chart-div">
                        <h4>Visitors</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="visitorsData"
                            :minValue="visitorsMin"
                            :maxValue="visitorsMax"
                            :format="vformat"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" class="chart-div">
                        <h4>Earnings</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="earningsData"
                            :minValue="earningsMin"
                            :maxValue="earningsMax"
                            :format="eformat"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6" xs="12" class="chart-div">
                        <h4>Beats sold</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="soldData"
                            :minValue="soldMin"
                            :maxValue="soldMax"
                            :format="sformat"
                        />
                    </b-col>
                    <b-col cols="12" md="6" xs="12" class="chart-div">
                        <h4>Free downloads</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="downloadsData"
                            :minValue="downloadsdMin"
                            :maxValue="downloadsdMax"
                            :format="dformat"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6" xs="12" class="chart-div">
                        <h4>Beat plays</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="playsData"
                            :minValue="playsMin"
                            :maxValue="playsMax"
                            :format="pformat"
                        />
                    </b-col>
                    <b-col cols="12" md="6" xs="12" class="chart-div">
                        <h4>Sales attributed to marketing</h4>
                        <AnalyticsLineChart
                            :height="234"
                            :chartData="salesData"
                            :minValue="salesMin"
                            :maxValue="salesMax"
                            :format="mformat"
                        />
                    </b-col>
                </b-row>
            </b-container>
            <b-container no-gutters>
                <b-row>
                    <b-col cols="12" md="6" xs="12" class="pl-0">
                        <h6>Top beats by sales</h6>
                        <div v-if="!topBeatsSalesItems.length" class="page-empty empty-text">Your top beats by sales will appear here.</div>  
                        <b-row v-else v-for="(beatSales, index) in topBeatsSalesItems" :key="index">
                            <AnalyticsTopSales :topSales="beatSales" class="pl-3" />
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="6" xs="12" class="px-0 mx-0">
                        <h6>Top referrers by sessions</h6>
                        <div v-if="!topReferrersItems.length" class="page-empty empty-text">Your top referrers by sessions will appear here.</div>  
                        <b-row
                            v-else
                            v-for="(topReferrers, index) in topReferrersItems"
                            :key="index"
                            class="pr-3"
                        >
                            <AnalyticsTopReferres :referrer="topReferrers" />
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import AnalyticsLineChart from '~/components/Analytics/AnalyticsLineChart'
import AnalyticsDropdown from '@/components/Analytics/AnalyticsDropdown'
import AnalyticsTopSales from '@/components/Analytics/AnalyticsTopSales'
import AnalyticsTopReferres from '@/components/Analytics/AnalyticsTopReferres'
import DashboardAnalitics from '@/components/Account/Dashboard/DashboardAnalitics'
export default {
    name: 'Analytics',
    components: {
        AnalyticsDropdown,
        AnalyticsTopSales,
        DashboardAnalitics,
        AnalyticsLineChart,
        AnalyticsTopReferres,
    },
    computed: {
        ...mapGetters({
            user: 'me/user',
            analyticsData: 'me/analyticsData',
        }),
    },
    data() {
        return {
            days: 7,
            loading: false,
            analiticsItems: [],
            topBeatsSalesItems: [],
            topReferrersItems: [],            
            //VISITORS
            visitorsData: {},
            visitorsMin: 0,
            visitorsMax: 0,
            vformat: '1',
            //EARNINGS
            earningsData: {},
            earningsMin: 0,
            earningsMax: 0,
            eformat: '2',
            //BEATS SOLD
            soldData: {},
            soldMin: 0,
            soldMax: 0,
            sformat: '1',
            //FREE DOWNLOADS
            downloadsData: {},
            downloadsdMin: 0,
            downloadsdMax: 0,
            dformat: '1',
            //BEAT PLAYS
            playsData: {},
            playsMin: 0,
            playsMax: 0,
            pformat: '1',
            //BEAT PLAYS
            salesData: {},
            salesMin: 0,
            salesMax: 0,
            mformat: '1',
        }
    },
    async created() {
        this.loading = true
        await this.loadData()
        this.loading = false
    },
    methods: {
        async loadData() {
            await this.$store.dispatch('me/loadAnalytics', {
                user_id: this.user.id,
                days: this.days,
            })
            const salesAnalitics = {
                analitics: this.analyticsData.sales_amount,
                topic: `Sales from <b>${this.analyticsData.sales_count} order</b>`,
                format: 'currency',
                color: '#2DBD9B',
            }
            const beatPlays = {
                analitics: this.analyticsData.plays,
                topic: 'Beat Plays',
                format: 'number',
                color: '#DC2EA6',
            }
            const conversionRate = {
                analitics: this.analyticsData.conversion,
                topic: 'Conversion Rate',
                format: 'percent',
                color: '#FDD311',
            }
            const freeDownloads = {
                analitics: this.analyticsData.free_downloads,
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
            this.topBeatsSalesItems = this.analyticsData.top_beat_sales
            this.topReferrersItems = this.analyticsData.top_referrers
            this.fillDataVisitors()
            this.fillDataEarnings()
            this.fillDataSold()
            this.fillDownloads()
            this.fillPlays()
            this.fillSales()
        },
        async updateChartsData(value) {
            this.days = value
            this.loadData()
        },

        fillDataVisitors() {
            const visitors = this.analyticsData.visitors
            const visitorsCount = visitors.map(item => {
                return item.Count
            })
            const transDate = visitors.map(item => {
                return item.TransDate
            })
            const visitorsLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.visitorsMin = Math.min(...visitorsCount)
            this.visitorsMax = Math.min(...visitorsCount)
            this.visitorsData = {
                labels: visitorsLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#00bf9a',
                        borderWidth: 3,
                        pointBackgroundColor: '#00bf9a',
                        pointHoverBackgroundColor: '#00bf9a',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: visitorsCount,
                    },
                ],
            }
        },
        fillDataEarnings() {
            const beatsInfo = this.analyticsData.beats_info
            const earnings = beatsInfo.map(item => {
                return item.Total
            })
            const transDate = beatsInfo.map(item => {
                return item.TransDate
            })
            const earningsLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.earningsMin = Math.min(...earnings)
            this.earningsMax = Math.min(...earnings)
            this.earningsData = {
                labels: earningsLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#FDD311',
                        borderWidth: 3,
                        pointBackgroundColor: '#FDD311',
                        pointHoverBackgroundColor: '#FDD311',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: earnings,
                    },
                ],
            }
        },
        fillDataSold() {
            const beatsInfo = this.analyticsData.beats_info
            const sold = beatsInfo.map(item => {
                return item.Count
            })
            const transDate = beatsInfo.map(item => {
                return item.TransDate
            })
            const soldLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.soldMin = Math.min(...sold)
            this.soldMax = Math.min(...sold)
            this.soldData = {
                labels: soldLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#6DD400',
                        borderWidth: 3,
                        pointBackgroundColor: '#6DD400',
                        pointHoverBackgroundColor: '#6DD400',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: sold,
                    },
                ],
            }
        },
        fillDownloads() {
            const downloadsInfo = this.analyticsData.free_downloads_info
            const downloads = downloadsInfo.map(item => {
                return item.Count
            })
            const transDate = downloadsInfo.map(item => {
                return item.TransDate
            })
            const downloadsLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.downloadsdMin = Math.min(...downloads)
            this.downloadsdMax = Math.min(...downloads)
            this.downloadsData = {
                labels: downloadsLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#32C5FF',
                        borderWidth: 3,
                        pointBackgroundColor: '#32C5FF',
                        pointHoverBackgroundColor: '#32C5FF',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: downloads,
                    },
                ],
            }
        },
        fillPlays() {
            const playsInfo = this.analyticsData.plays_info
            const plays = playsInfo.map(item => {
                return item.Count
            })
            const transDate = playsInfo.map(item => {
                return item.TransDate
            })
            const playsLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.playsdMin = Math.min(...plays)
            this.playsdMax = Math.min(...plays)
            this.playsData = {
                labels: playsLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#DC2EA6',
                        borderWidth: 3,
                        pointBackgroundColor: '#DC2EA6',
                        pointHoverBackgroundColor: '#DC2EA6',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: plays,
                    },
                ],
            }
        },
        fillSales() {
            const salesInfo = this.analyticsData.marketing_info
            const sales = salesInfo.map(item => {
                return item.Count
            })
            const transDate = salesInfo.map(item => {
                return item.TransDate
            })
            const salesLabels = transDate.map(function(x) {
                return moment(x).format('MMM D')
            })
            this.salesMin = Math.min(...sales)
            this.salesMax = Math.min(...sales)
            this.salesData = {
                labels: salesLabels,
                datasets: [
                    {
                        label: '',
                        bezierCurve: false,
                        tension: 0,
                        fill: true,
                        borderColor: '#B620E0',
                        borderWidth: 3,
                        pointBackgroundColor: '#B620E0',
                        pointHoverBackgroundColor: '#B620E0',
                        pointRadius: 0,
                        backgroundColor: 'transparent',
                        data: sales,
                    },
                ],
            }
        },
    },
}
</script>
