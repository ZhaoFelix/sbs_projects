import axios  from "axios";
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000
})

// 设置请求拦截器
request.interceptors.request.use(
   (config: any) => {
     config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTY3MzQ0MDB9.OrbzW61_xrhIUFEDKyBXJvEtN16VLnLoI-_S6RH_lWg'
      return config
  },
  error => {
      return Promise.reject(error)
  }
)


// 设置响应拦截器

request.interceptors.response.use(
  response => {
      const res = response.data
      if (res.code  == 2000) {
        return res
      } else if (res.code == 2002) {
          ElMessage({
            message:res.data,
            type: 'error',
            duration: 2000
          })
      } else {
        ElMessage({
          message:res.data,
          type: 'error',
          duration: 2000
        })
      }
  },
  error => {
    return Promise.reject(error)
  } 
)

export default request