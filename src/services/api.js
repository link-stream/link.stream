import axios from 'axios'

export default async function(endpoint, params = {}, method = 'GET') {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
    }

    // call API
    const res = await axios({
        method,
        url: process.env.API_URL + endpoint,
        data: params,
        headers,
    })
    const json = res.data
    if (res.status >= 400 || (json && (json.errorType >= 400 || json.errorMessage))) {
        throw json.message || json.errorMessage || res.statusText
    }
    return json
}
