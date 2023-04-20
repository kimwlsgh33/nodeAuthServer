import {sign, verify} from 'jsonwebtoken'
import type {
  SignOptions,
  Secret,
  VerifyOptions,
  VerifyErrors
} from 'jsonwebtoken'

const secret = ')@)@_toms03_11'

// JWT 만들기
export const jwtSign = (
  payload: string | Buffer | object,
  options: SignOptions = {}
) =>
  new Promise<string>((resolve, reject) => {
    sign(payload, secret, options, (err?: any, signingKey?: Secret) => {
      if (err) reject(err)
      else resolve(signingKey as string)
    })
  })

//---------------------

type VerifyOptionsType = VerifyOptions & {complete: true}

export const jwtVerify = <T extends object>(
  token: string,
  YetOptions: VerifyOptions = {}
) =>
  new Promise<T>((resolve, reject) => {
    YetOptions.complete = true
    const options = YetOptions as VerifyOptionsType

    verify(
      token,
      secret,
      options,
      (err: VerifyErrors | null, decoded: object | undefined) => {
        if (err) reject(err)
        else if (decoded) {
          resolve(decoded as T)
        }
      }
    )
  })
