export * from './authRouter'
export * from './uploadFileRouter'

export type IJWTDecoded = {
  header: {
    alg: string
    typ: string
  }
  payload: {
    email: string
    name: string
    password: string
    provider: string
    iat: number
    exp: number
  }
  signature: string
}
