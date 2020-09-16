<template>
    <div class="page page-report-message">
        <nav class="page-nav">
            <basic-button
                class="back-btn"
                variant="text"
                :to="{ name: 'marketingMessages' }"
            >
                <i class="ico ico-back"></i>
                <span>Messages</span>
            </basic-button>
        </nav>
        <LoadingSpinner class="page-loader" v-if="loading" />
        <div v-else>
            <header class="page-header">
                <div class="left-col">
                    <h1 class="page-title">
                        Placeholder Email Title
                    </h1>
                    <div class="page-preview">
                        <span class="text-light">link.stream/</span>
                        <span>{{ user.user_name }}/videos</span>
                        <basic-button
                            variant="outline-light"
                            size="xs"
                        >
                            View
                        </basic-button>
                    </div>
                </div>
                <div class="right-col">
                    <basic-button
                        variant="outline-light"
                        size="sm"
                        class="btn-duplicate"
                        @click="duplicateMessage"
                    >
                        Duplicate message
                    </basic-button>
                </div>
            </header>
            <div class="tabnav">
                <ul>
                    <li class="active">
                        <router-link to="">Overview</router-link>
                    </li>
                    <li>
                        <router-link to="">Activity</router-link>
                    </li>
                </ul>
            </div>
            <main class="page-body">
                <h5 class="recipient-title">
                    <span class="active-number">150</span>
                    Recipients
                </h5>
                <b-row>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">24%</h2>
                                <p class="description">
                                    Open Rate
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">4.66%</h2>
                                <p class="description">
                                    Click Rate
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">$33</h2>
                                <p class="description">
                                    Revenue from 2 Orders
                                </p>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="6" md="3">
                        <div class="recipient-container">
                            <div class="recipient-status">
                                <h2 class="number">1</h2>
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
                    <b-table :fields="fields" :items="items" responsive no-border-collapse>
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
            </main>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LineChart from '~/components/Form/LineChart'
import moment from 'moment'
export default {
    name: 'ReportMessage',
    components: {
        LineChart,
    },
    data: () => ({
        loading: false,
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
                xAxes:[
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
    computed: {
        ...mapGetters({
            user: 'me/user',
        }),
    },
    created() {
        this.initData()
    },
    methods: {
        duplicateMessage() {},
        initData() {
            this.loaded = false
            let today = moment().startOf('day')
            let aryHours = []
            let aryValues1 = []
            let aryValues2 = []
            for (let k = 0; k < 24; k++) {
                today.set('hour', k)
                if ( k % 4 === 0) {
                    aryHours.push(today.format('h:mma'))
                } else {
                    aryHours.push('')
                }
                aryValues1.push(Math.floor(Math.random() * 20))
                aryValues2.push(Math.floor(Math.random() * 20))
            }
            this.chartData.labels = aryHours
            this.chartData.datasets[0].data = aryValues1
            this.chartData.datasets[1].data = aryValues2
            this.loaded = true
        }
    },
}
</script>
