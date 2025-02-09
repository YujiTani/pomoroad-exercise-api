import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:4000/')

const res = await client.api.users.$post({
  json: {
    name: 'tarou',
    age: 15,
  }
})

if (res.ok) {
  const user = await res.json()
  console.log(res.status, 'post success', user)
} else {
  console.log(res.status, 'post error')
}

const res2 = await client.api.users[':id'].$get({
  param: {
    id: '1'
  }
})

if (res2.ok) {
  const users = await res2.json()
  console.log(res2.status, 'get success', users)
} else {
  console.log(res2.status, 'get error')
}

const res3 = await client.api.users.$get()

if (res3.ok) {
  const users = await res3.json()
  console.log(res3.status, 'get success', users)
} else {
  console.log(res3.status, 'get error')
}

const res4 = await client.api.users[':id'].$delete({
  param: {
    id: '1'
  }
})

if (res4.ok) {
  console.log(res4.status, 'delete success')
} else {
  console.log(res4.status, 'delete error')
}
