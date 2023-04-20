import fs from 'fs'
import {createExpressServer} from './express'
import {address} from 'ip'
import {authRouter, uploadFileRouter} from './routers'
import {getPublicDir} from './config'

// 웹서버 설정 변수 만들기
const port = 4000

const publicDirPath = getPublicDir()

// public 경로가 존재하지 않으면, 경로 생성하기
if (false == fs.existsSync(publicDirPath)) fs.mkdirSync(publicDirPath)

function runServer(ip: string | undefined) {
  // ip가 존재하지 않으면, 프로세스 종료
  if (!ip) {
    console.log("error can't find your ip address")
    process.exit()
  }

  // express 서버 만들기
  const app = createExpressServer()

  // get 메서드 사용해서 '/' 경로 라우팅
  app.get('/', (req, res) => {
    // const imgList = fetch(`http://${ip}:${port}/all`)
    res.json({message: 'Hello world!'})
  })

  // auth 경로에서, authRouter객체 사용하기 - 세분화 라우팅
  app.use('/auth', authRouter())

  // apload 경로에서, uploadFileRouter객체 사용하기
  app.use('/upload', uploadFileRouter(ip, port))

  // listen 메서드 사용해서 웹서버 실행, 포트 설정 및 콜백 설정
  app.listen(port, () => console.log(`server started at http://${ip}:${port}`))
}

runServer(address())

/*
  get('서버 주소 경로', 콜백 함수)

  1. 브라우저에서 '서버 주소 경로'에 get요청이 들어온다.

  2. 콜백함수의 인자로 req, res가 전달되어 실행된다.

  req : 요청 내용

  res : 요청에 응답해주는 함수

  - res.json({}) : json 형식의 데이터를 응답해준다.

*/

// 메서드는, 객체에 저장된 정보를 다루려고 만드는 것이다. - 객체 지향 프로그래밍 핵심

// 객체 메서드는, 다른 함수의 콜백으로 실행할때, this가 사라진다.
/*
  1. setTimeout
  2. 1초 기다림
  3. obj1.sayHi 메서드 실행
  4. console.log(`Hi ${this.name}`) 에서 this를 받아오지 못함?
*/
