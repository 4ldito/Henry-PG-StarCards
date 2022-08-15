import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index'
import cors from 'cors'
// require('./db.js');

const server = express()

// server.name = 'API';

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((_:any, res:any, next:any) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

server.use('/', routes)

// Error catching endware.
server.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).json({ message })
})

export default server
