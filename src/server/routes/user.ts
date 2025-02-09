import { Hono } from 'hono'

const users = [
  {id: 1, name: 'tarou', age: 15},
  {id: 2, name: 'hanako', age: 20},
]

const userRoute = new Hono().basePath('/users')
.post('/', async (c) => {
  const user = await c.req.json()
  users.push({id: users.length + 1, ...user})
  return c.json(user)
}).get('/', (c) => {
  return c.json({ message: 'users fetched' })
}).delete('/:id', (c) => {
  return c.json({ message: 'user deleted' })
}).put('/:id', (c) => {
  return c.json({ message: 'user updated' })
})

export default userRoute
