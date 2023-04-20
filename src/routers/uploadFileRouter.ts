import type {IJWTDecoded} from '.'
import {Router} from 'express'
import multer from 'multer'
import path from 'path'
import {getPublicDir} from '../config'
import * as U from '../utils'
const upload = multer({dest: 'uploads/'})

// multer file 타입 가져오기
export type UploadFileType = Express.Multer.File

// '/upload' 요청 담당라우터
export const uploadFileRouter = (ip: string, port: number) => {
  const router = Router()

  // multer 미들웨어 적용 - file upload
  router.use(upload.any())

  // '/' 경로에 post 요청시
  router.post('/', async (req, res) => {
    // jwt 확인, 없으면 파일 확인 불가
    const {authorization} = req.headers || {}
    if (!authorization) {
      res.status(401).json({success: false, message: 'no jwt'})
      return
    }
    const jwt = authorization.split(' ')[1]
    if (!jwt || jwt.length < 1) {
      res.status(401).json({success: false, message: 'no jwt'})
      return
    }

    // jwt 해제
    const decoded = await U.jwtVerify<IJWTDecoded>(jwt)
    console.log(decoded)

    // client에게 files 배열 받아옴
    const files = req.files
    console.log('files : ', files)

    // 파일 관리
    const renamePromises = (files as UploadFileType[]).map((file) => {
      // 파일 이름, 목적지, 경로 받아옴
      const {originalname, destination, path: filepath} = file

      // 파일 확장자 가져오기
      path.extname(originalname)

      // 작업디렉토리/랜덤이름.확장자로 변경하고, 바뀐이름을 반환하는 Promise
      return U.moveFile(
        filepath,
        path.join(getPublicDir(), U.makeRandomFileName(originalname))
      )
    })

    // 파일 작업 실행, 모두 끝날때까지 기다리기 (동기)
    const fileLists = await Promise.all(renamePromises)

    // 파일 요청이 가능한, uri 만들기 - 경로/파일이름
    const uris = fileLists.map((destpath) => ({
      uri: `http://${ip}:${port}/${destpath}`
    }))

    // json 형식으로 응답
    res.json({...decoded, ...uris[0]})
    // res.json({...uris[0]})
  })

  return router
}
