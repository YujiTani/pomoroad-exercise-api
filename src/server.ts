import { Hono } from 'hono'
import userRoute from './userRoute'

const app = new Hono()

app.route('/api', userRoute)

const users = [
  {id: 1, name: 'tarou', age: 15},
  {id: 2, name: 'hanako', age: 20},
]

const sampleRoutes = app
.post('/api/users', async (c) => {
  const user = await c.req.json()

  users.push({id: users.length + 1, ...user})
  return c.json(user)
})
.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type AppType = typeof sampleRoutes

export default
  {
    port: 4000,
    fetch: app.fetch,
  }
