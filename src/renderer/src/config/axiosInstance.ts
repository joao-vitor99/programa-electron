import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default server
