<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Line,
    mixins: [reactiveProp],
    name: 'AnalyticsLineChart',
    props: {
        chartData: {
            type: Object,
            default: null,
        },
        minValue: {
            type: Number,
        },
        maxValue: {
            type: Number,
        },
        format: {
            type: String,
        },
    },
    data() {
        return {
            formatY: 1,
            options1: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    fontFamily: 'Montserrat',
                    backgroundColor: '#f5f5f5',
                    titleFontColor: '#000000',
                    bodyFontColor: '#000000',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: 'nearest',
                    intersect: 0,
                    position: 'nearest',
                },
                scales: {
                    yAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                drawBorder: false,
                                color: '#DBDBDB',
                                zeroLineColor: 'transparent',
                            },
                            ticks: {
                                padding: 5,
                                fontColor: '#000000',
                                fontFamily: 'Montserrat',
                                fontSize: 11,
                                letterSpacing: 0,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                drawBorder: false,
                                color: '#ffffff',
                                zeroLineColor: 'transparent',
                            },
                            ticks: {
                                padding: 6,
                                fontColor: '#000000',
                                fontFamily: 'Montserrat',
                                fontSize: 11,
                                letterSpacing: 0,
                            },
                        },
                    ],
                },
            },
            options2: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    fontFamily: 'Montserrat',
                    backgroundColor: '#f5f5f5',
                    titleFontColor: '#000000',
                    bodyFontColor: '#000000',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: 'nearest',
                    intersect: 0,
                    position: 'nearest',
                },
                scales: {
                    yAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                drawBorder: false,
                                color: '#DBDBDB',
                                zeroLineColor: 'transparent',
                            },
                            ticks: {
                                callback: function(value, index, values) {
                                    return '$' + value;
                                },
                                padding: 5,
                                fontColor: '#000000',
                                fontFamily: 'Montserrat',
                                fontSize: 11,
                                letterSpacing: 0,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                drawBorder: false,
                                color: '#ffffff',
                                zeroLineColor: 'transparent',
                            },
                            ticks: {
                                padding: 6,
                                fontColor: '#000000',
                                fontFamily: 'Montserrat',
                                fontSize: 11,
                                letterSpacing: 0,
                            },
                        },
                    ],
                },
            },
        }
    },
    mounted() {
        if (this.format === '1') {
            this.renderChart(this.chartData, this.options1)
        } else {
            this.renderChart(this.chartData, this.options2)
        }        
    },
}
</script>
