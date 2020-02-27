import axios from '~/plugins/axios'

export default async function(endpoint, params = {}, method = 'GET', showProgress = true) {
    const headers = {
        'X-API-KEY': process.env.SERVER_AUTH.X_API_KEY,
    }
    const auth = {
        username: process.env.SERVER_AUTH.USER_NAME,
        password: process.env.SERVER_AUTH.PASSWORD,
    }
    const data = new FormData()
    Object.keys(params).forEach(key => {
        data.append(key, params[key])
    })

    // call API
    const res = await axios({
        method,
        url: endpoint,
        data,
        headers,
        auth,
        showProgress,
    })
    const json = res.data
    if (res.status >= 400 || (json && (json.errorType >= 400 || json.errorMessage))) {
        throw json.message || json.errorMessage || res.statusText
    }
    return json
}
