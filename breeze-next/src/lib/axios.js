import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
    maxContentLength: 1000 * 1024 * 1024, // 100MB
    maxBodyLength: 1000 * 1024 * 1024 // 100MB
})

export default axios
