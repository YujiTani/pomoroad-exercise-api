import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
// import userRoute from './server/routes/user'

const app = new OpenAPIHono()

// const routes = app.route('/api', userRoute)

const users = [
  {id: 1, name: 'tarou', age: 15},
  {id: 2, name: 'hanako', age: 20},
]

/**
 * ユーザー作成時のリクエストボディ
 */
const reqCreateUserSchema = z
.object({
  name: z.string().min(1)
  .openapi({
    description: 'ユーザーの名前',
    example: 'tarou',
  }),
  age: z.number()
  .openapi({
    description: 'ユーザーの年齢',
    example: 15,
  }),
}).openapi('reqCreateUserSchema')

/**
 * エラーを返すスキーマ
 */
const resErrorSchema = z
.object({
  code: z.number().openapi({
    description: 'エラーコード',
    example: 400,
  }),
  message: z.string().openapi({
    description: 'エラーメッセージ',
    example: 'Bad Request',
  }),
}).openapi('resErrorSchema')

/**
 * ユーザー情報を返すスキーマ
 */
const resUserSchema = z.object({
  id: z.number()
  .openapi({
    description: 'ユーザーのID',
    example: 1,
  }),
  name: z.string()
  .openapi({
    description: 'ユーザーの名前',
    example: 'tarou',
  }),
  age: z.number()
  .openapi({
    description: 'ユーザーの年齢',
    example: 15,
  }),
}).openapi('resUserSchema')

// サンプルルーティング
const sampleRoutes = app
.openapi(
  createRoute({
    method: 'post',
    path: '/api/users',
    request: {
      body: {
        content: {
          'application/json': {
            schema: reqCreateUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'ユーザー情報を返す',
        content: {
          'application/json': {
            schema: resUserSchema,
          },
        },
      },
      400: {
        description: 'リクエストエラー',
        content: {
          'application/json': {
            schema: resErrorSchema,
          },
        },
      },
    },
  }),
  async (c) => {
  const {name, age} = c.req.valid('json')
  const user = {id: users.length + 1, name, age}
  users.push(user)
  return c.json(user, 200)
  },
)
.get('/', (c) => {
  return c.text('Hello Hono!')
})

// ドキュメントを生成
app.doc31("/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Sample API Document",
  },
});

// ドキュメントを表示
app.get("/ui", swaggerUI({ url: "/doc" }));

export type AppType = typeof sampleRoutes

export default {
  port: 4000,
  fetch: app.fetch,
}
