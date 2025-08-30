import axios from 'axios'

export const request = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRjYjdhOGY3MGM2MWU5MTM0M2FjYmY4NDJkNWY5NyIsIm5iZiI6MTc1NTk2Mjk2Mi4wNjIsInN1YiI6IjY4YTlkZTUyYTc4NmUzODdmNzFlNDljNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HmJZ7dW6O2NHL3n46WQ774a7Sy_Zbyg7P5LMKA-7YfA'
  },
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { data, status } = response
    return status === 200 ? data : Promise.reject(data)
  },
  error => {
    return Promise.reject(error.response?.data || error.message)
  }
)

export default request
