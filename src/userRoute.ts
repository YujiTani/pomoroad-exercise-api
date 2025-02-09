import { Hono } from 'hono'

const app = new Hono().basePath('/users')

app.post('/', (c) => {
  return c.json({ message: 'user created' })
}).get('/', (c) => {
  return c.json({ message: 'users fetched' })
}).delete('/:id', (c) => {
  return c.json({ message: 'user deleted' })
}).put('/:id', (c) => {
  return c.json({ message: 'user updated' })
})

export default app
