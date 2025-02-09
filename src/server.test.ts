import { describe, expect, it } from 'bun:test'
import app from './server'
import { testClient } from 'hono/testing'

import type { AppType } from './server'

describe('APIテスト', () => {
  it('ユーザー作成 正常系 ', async () => {
    const client = testClient<AppType>(app)
    const res = await client.api.users.$post({
        json: {
            name: 'tarou',
            age: 15,
        },
    })
    expect(res.status).toBe(200)
    if (res.ok) {
        const json = await res.json()
        expect(json.name).toBe('tarou')
        expect(json.age).toBe(15)
    } else {
        throw new Error('ユーザー作成失敗')
    }
  })

  it('ユーザー作成 異常系 ', async () => {
    const client = testClient<AppType>(app)
    const res = await client.api.users.$post({
        json: {
          // @ts-ignore 型チェックを無視
          name: null,
          age: 15,
        },
    })
    expect(res.status).toBe(400)
  })
})
