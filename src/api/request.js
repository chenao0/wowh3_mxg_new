import axios from 'axios'
import { Notify } from 'vant';

// create an axios instance
const service = axios.create({
  // baseURL: "https://dev-payment.wowpayidr.com", // url = base url + request url
  baseURL: "/dev-api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 180000 // request timeout,
})


// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 'SUCCESS') {
        Notify({ type: 'warning', message: res.code });
        return Promise.reject(new Error(res.message || 'Kesalahan'))
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
			Notify({ type: 'warning', message: error.response.status });
		} else {
      Notify({ type: 'warning', message: 'NewWork Error' });
    }
    return Promise.reject(error)
  }
)

export default service
