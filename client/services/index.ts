import axios from "axios"

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
})

/*
$host.interceptors.request.use(() => {

})
*/

export {
  $host,
}