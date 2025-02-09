// @ts-nocheck このファイルは型チェックをしない

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
  })

  it('ユーザー作成 異常系 ', async () => {
    const client = testClient<AppType>(app)
    const res = await client.api.users.$post({
        json: {
            name: null,
            age: 15,
        },
    })
    expect(res.status).toBe(400)
  })
})
