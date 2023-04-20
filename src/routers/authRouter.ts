import type {IJWTDecoded} from '.'
import {Router} from 'express'
import * as U from '../utils'
import {jwtCheck} from './jwtCheck'

export const authRouter = () => {
  //router 객체 만들기
  const router = Router()

  // signUp - 사용자에게 정보받아서, jwt를 반환
  router.post('/signUp', async (req, res) => {
    // 사용자 정보 받아오기
    const {name, email, password} = req.body
    console.log('signup : ', name, email, password)
    const jwt = await U.jwtSign(
      {email, name, password, provider: 'local'},
      {expiresIn: '9999 years'}
    )
    res.json({jwt})
  })

  // 사용자에게 저장된 jwt와 데이터 받아서, 이메일 암호가 일치하는 지 확인 후 결과 전송
  router.post('/login', async (req, res) => {
    const {authorization} = req.headers || {} // headers 정보 없을때 대비

    // authorization 없으면 에러 응답
    if (!authorization) {
      res.json({success: false, message: 'no jwt'})
      return
    }

    // storage 로그인 | Bearer와 분리
    const jwt = authorization.split(' ')[1]

    // jwt 없으면 에러 응답
    if (!jwt || jwt.length < 0) {
      res.json({success: false, message: 'no jwt'})
      return
    }

    console.log('jwt : ', jwt)

    // 직접 입력 로그인
    const {email, password} = req.body

    // try에서 에러 발생시, catch 실행
    try {
      const decoded = await U.jwtVerify<IJWTDecoded>(jwt)
      // console.log('decoded :', decoded)
      const payload = decoded.payload
      console.log('email', email, payload.email)
      console.log('password', password, payload.password)

      if (email !== payload.email) {
        res.json({success: false, message: `죄송합니다. \n 누군지 모르겠어요.`})
      } else if (password !== payload.password) {
        res.json({success: false, message: `패스워드가 틀립니다.`})
      } else
        res.json({
          success: true,
          provider: payload.provider,
          name: payload.name,
          message: `환영합니다. ${payload.name} 님`
        })
    } catch (e) {
      // e와 Error의 타입이 같으면 true 반환
      if (e instanceof Error) res.json({success: false, message: e.message})

      // 로그인 서버에서 발생한 오류 내용을, 사용자에게 알려주어야 한다. ( 오류 해결 )
    }
  })

  return router
}
