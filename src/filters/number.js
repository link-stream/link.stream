import Vue from 'vue'

Vue.filter('trimZeroDecimal', function(value) {
    return value.toString().replace('.00', '')
})
Vue.filter('currencyFormat', function(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return formatter.format(value)
})
