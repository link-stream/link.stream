<template>
    <div class="report-overview">
        <h5 class="recipient-title">
            <span class="active-number font-weight-bold">
                {{ overview.Total }}
            </span>
            Recipients
        </h5>
        <b-row>
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
        </b-row>
        <div class="add-description">
            <div class="left-col">
                <div class="add-desc-item">
                    <span class="font-weight-bold">Audience: </span>
                    Hydro Kitty
                </div>
                <div class="add-desc-item">
                    <span class="font-weight-bold">Subject: </span>
                    25% off through the 4th
                </div>
            </div>
            <div class="right-col">
                <div class="add-desc-item">
                    <span class="font-weight-bold">Delivered: </span>
                    Sat, May 23, 2020 1:10 pm
                </div>
                <a href="#" class="link-download-report">
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
                :chartdata="chartData"
                :options="options"
            />
        </div>
        <div class="location-container">
            <h4 class="title">
                Opens by location
            </h4>
            <b-table :fields="fields" :items="items" responsive>
                <template v-slot:cell(country)="data">
                    <country-flag class="img-flag" :country="data.value.code" />
                    {{ data.value.name }}
                </template>
                <template v-slot:cell(percent)="data">
                    {{ data.value }}%
                </template>
            </b-table>
        </div>
        <div class="subscriber-container">
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
        </div>
    </div>
</template>
<script>
import LineChart from '~/components/Form/LineChart'
import moment from 'moment'
export default {
    name: 'ReportOverview',
    props: {
        message: {
            type: Object,
        },
        overview: {
            type: Object
        },
    },
    components: {
        LineChart,
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
        items: [
            {
                country: {
                    name: 'USA',
                    code: 'us',
                },
                opens: 392,
                percent: 95.6,
            },
            {
                country: {
                    name: 'Canada',
                    code: 'ca',
                },
                opens: 15,
                percent: 3.7,
            },
            {
                country: {
                    name: 'United Kingdom',
                    code: 'gb',
                },
                opens: 1,
                percent: 0.2,
            },
            {
                country: {
                    name: 'Indonesia',
                    code: 'id',
                },
                opens: 1,
                percent: 0.2,
            },
            {
                country: {
                    name: 'South Africa',
                    code: 'za',
                },
                opens: 1,
                percent: 0.2,
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
        subscribers: [
            {
                email: 'alyssa@link.stream',
                opens: 17,
            },
            {
                email: 'klang11089@gmail.com',
                opens: 4,
            },
            {
                email: 'mail@mail.com',
                opens: 3,
            },
        ],
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
                if (k % 4 === 0) {
                    aryHours.push(today.format('h:mma'))
                } else {
                    aryHours.push('')
                }
                let maxValue = 20
                if (k > 10) maxValue = 5
                let randomValue = Math.floor(Math.random() * maxValue)
                aryValues1.push(randomValue)
                aryValues2.push(Math.floor(Math.random() * randomValue))
            }
            this.chartData.labels = aryHours
            this.chartData.datasets[0].data = aryValues1
            this.chartData.datasets[1].data = aryValues2
            this.loaded = true
        },
    },
}
</script>
