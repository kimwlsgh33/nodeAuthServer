import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

export const createExpressServer = () => {
  // express() 클래스 사용해서, 웹서버 인스턴스 생성
  const app = express()
  // static 미들웨어 - 정적 파일로 통신하는 서버 만들기 / public 폴더의 내용을 '/' 경로에서 get요청 할 수 있다.
  app.use(express.static('public'))
  // cors 사용하기
  app.use(cors())
  // HTTP post요청으로 받은 body 데이터를, req.body 형태로 얻을 수 있다.e
  app.use(bodyParser.json())
  // return app.use(express.static('public')).use(cors()).use(bodyParser.json())
  return app
}
