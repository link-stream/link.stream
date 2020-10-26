<template>
    <div class="report-overview">
        <h5 class="recipient-title">
            <span class="active-number font-weight-bold">
                {{ overview.Total }}
            </span>
            Recipients
        </h5>
        <b-form-row>
            <b-col cols="6" md="3">
                <div class="recipient-container">
                    <div class="recipient-status">
                        <h2 class="number">
                            {{ overview.Open_rate }}
                        </h2>
                        <p class="description">
                            Open Rate
                        </p>
                    </div>
                </div>
            </b-col>
            <b-col cols="6" md="3">
                <div class="recipient-container">
                    <div class="recipient-status">
                        <h2 class="number">
                            {{ overview.Click_rate }}
                        </h2>
                        <p class="description">
                            Click Rate
                        </p>
                    </div>
                </div>
            </b-col>
            <b-col cols="6" md="3">
                <div class="recipient-container">
                    <div class="recipient-status">
                        <h2 class="number">
                            {{ overview.Revenue }}
                        </h2>
                        <p class="description">
                            Revenue from
                            {{ overview.Orders }}
                            Orders
                        </p>
                    </div>
                </div>
            </b-col>
            <b-col cols="6" md="3">
                <div class="recipient-container">
                    <div class="recipient-status">
                        <h2 class="number">
                            {{ overview.Unsubscribed }}
                        </h2>
                        <p class="description">
                            Unsubscribed
                        </p>
                    </div>
                </div>
            </b-col>
        </b-form-row>
        <div class="add-description">
            <div class="left-col">
                <div class="add-desc-item">
                    <span class="font-weight-bold">Audience: </span>
                    {{ message.reply_to_name }}
                </div>
                <div class="add-desc-item">
                    <span class="font-weight-bold">Subject: </span>
                    {{ message.subject }}
                </div>
            </div>
            <div class="right-col">
                <div class="add-desc-item">
                    <span class="font-weight-bold">Delivered: </span>
                    {{ message.created_at | fullDateTime }}
                </div>
                <a
                    href="#"
                    class="link-download-report"
                    @click.prevent="downloadReport"
                >
                    Download Report
                </a>
            </div>
        </div>
        <div class="chart-container">
            <div class="chart-title">
                <h4 class="title">
                    24-hour performance
                </h4>
            </div>
            <LineChart
                v-if="loaded"
                :height="200"
                :chartdata="chartData"
                :options="options"
            />
        </div>
        <div class="location-container">
            <h4 class="title">
                Opens by location
            </h4>
            <b-table :fields="fields" :items="overview.Location" responsive>
                <template v-slot:cell(country)="data">
                    <country-flag class="img-flag" :country="data.value.code" />
                    {{ data.value.name }}
                </template>
                <template v-slot:cell(percent)="data">
                    {{ data.value }}%
                </template>
            </b-table>
        </div>
        <!-- <div class="subscriber-container">
            <h4 class="title">
                Subscribers with the most opens
            </h4>
            <div
                v-for="(subscriber, index) in subscribers"
                :key="index"
                class="subscriber"
            >
                <a href="#" class="link-email">
                    {{ subscriber.email }}
                </a>
                <span class="opens">
                    {{ subscriber.opens }}
                </span>
            </div>
        </div> -->
    </div>
</template>
<script>
import LineChart from '~/components/Form/LineChart'
import moment from 'moment'
// import XLSX from 'xlsx'
import CountryFlag from 'vue-country-flag'
export default {
    name: 'ReportOverview',
    props: {
        message: {
            type: Object,
        },
        overview: {
            type: Object,
        },
    },
    components: {
        LineChart,
        CountryFlag,
    },
    data: () => ({
        // loading: false,
        loaded: false,
        fields: [
            {
                key: 'country',
                label: 'Country',
            },
            {
                key: 'opens',
                label: 'Opens',
            },
            {
                key: 'percent',
                label: 'Percent',
            },
        ],
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Opens',
                    backgroundColor: '#FDD311',
                    borderColor: '#FDD311',
                    data: [],
                    fill: false,
                    lineTension: 0,
                },
                {
                    label: 'Clicks',
                    backgroundColor: '#B620E0',
                    borderColor: '#B620E0',
                    data: [],
                    fill: false,
                    lineTension: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: '24-hour performance',
                fontSize: 18,
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 6,
                            stepSize: 4,
                            maxRotation: 0,
                        },
                    },
                ],
            },
        },
        oc_data: [],
    }),
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.loaded = false
            let today = moment().startOf('day')
            let aryHours = []
            let aryValues1 = []
            let aryValues2 = []
            for (let k = 0; k < 24; k++) {
                today.set('hour', k)
                aryHours.push(today.format('h:mma'))
                aryValues1.push(0)
                aryValues2.push(0)
            }
            for (const [key, value] of Object.entries(this.overview.Hours)) {
                const curIndex = parseInt(parseInt(key) / 100)
                aryValues1[curIndex] = value.Open
                aryValues2[curIndex] = value.Click
                this.oc_data.push({
                    Time: aryHours[curIndex],
                    Open: value.Open,
                    Click: value.Click,
                })
            }
            this.chartData.labels = aryHours
            this.chartData.datasets[0].data = aryValues1
            this.chartData.datasets[1].data = aryValues2
            this.loaded = true
        },
        async downloadReport() {
            try {
                const overview = [
                    {
                        Title: 'Audience',
                        Value: this.message.reply_to_name,
                    },
                    {
                        Title: 'Email',
                        Value: this.message.reply_to,
                    },
                    {
                        Title: 'Recipients',
                        Value: this.overview.Total,
                    },
                    {
                        Title: 'Subject',
                        Value: this.overview.subject,
                    },
                    {
                        Title: 'Delivered',
                        Value: moment(this.message.created_at).format(
                            'ddd, MMMM Do hh:mm A'
                        ),
                    },
                    {
                        Title: 'Open Rate',
                        Value: this.overview.Open_rate,
                    },
                    {
                        Title: 'Click Rate',
                        Value: this.overview.Click_rate,
                    },
                    {
                        Title: 'Revenue',
                        Value: this.overview.Revenue,
                    },
                    {
                        Title: 'Orders',
                        Value: this.overview.Orders,
                    },
                    {
                        Title: 'Unsubscribed',
                        Value: this.overview.Unsubscribed,
                    },
                ]
                const locations = this.overview.Location.map(item => {
                    return {
                        Country: item.country.name,
                        Opens: item.opens,
                        Percent: item.percent + '%',
                    }
                })
                const XLSX = await import('xlsx')
                const data = XLSX.utils.json_to_sheet(overview)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'overview')

                const data_oc = XLSX.utils.json_to_sheet(this.oc_data)
                XLSX.utils.book_append_sheet(wb, data_oc, '24-hour performance')

                const data_ol = XLSX.utils.json_to_sheet(locations)
                XLSX.utils.book_append_sheet(wb, data_ol, 'Opens by location')

                const filename = `${this.message.campaing_name}_report.xlsx`
                XLSX.writeFile(wb, filename)
                this.$toast.success('The message report has been downloaded!')
            } catch (error) {
                this.$toast.error('Download Failed!')
            }
        },
    },
}
</script>
