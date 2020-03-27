import axios from 'axios'
import app from '~/main' // import the instance

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

instance.interceptors.request.use(
    config => {
        if (config.showProgress) {
            app.$Progress.start() // for every request start the progress
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        if (response.config.showProgress) {
            app.$Progress.finish() // finish when a response is received
        }
        return response
    },
    error => {
        if (error.config.showProgress) {
            app.$Progress.finish() // finish when an error is received
        }
        return Promise.reject(error)
    }
)

export default instance // export axios instance to be imported in your app
