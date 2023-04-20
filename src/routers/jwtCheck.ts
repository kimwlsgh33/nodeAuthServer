import type {Request} from 'express'

export const jwtCheck = (req: Request): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const {authorization} = req.headers || {} // headers 정보 없을때 대비

    // authorization 없으면 에러 응답
    if (!authorization) {
      reject('')
      return
    }

    // storage 로그인 | Bearer와 분리
    const jwt = authorization.split(' ')[1]

    // jwt 없으면 에러 응답
    if (!jwt || jwt.length < 0) {
      reject('')
    }

    resolve(jwt)
  })
