import {promisify} from 'util'
import fs from 'fs'
import path from 'path'

export const mkdir = promisify(fs.mkdir)
export const stat = promisify(fs.stat)
export const unlink = promisify(fs.unlink)
export const deleteFile = unlink
export const rename = promisify(fs.rename)

// 경로 문자열에서, file만 따로 분리하기
const filenameOnly = (filepath: string) => filepath.split(path.sep).reverse()[0]

// srcpath : 파일 현재 경로
// destpath : 작업 경로 + 랜덤 파일이름
export const moveFile = (srcpath: string, destpath: string) =>
  new Promise<string>((resolve, reject) => {
    // 파일 이름 변경
    rename(srcpath, destpath)
      // resolve()로 Fullfield 상태 만들어 moveFile.then(파일이름) 호출
      .then(() => resolve(filenameOnly(destpath)))
      // reject로 Rejecct 상태 만들어 moveFile.catch() 호출
      .catch(reject)
  })

// 새로운 이름과 똑같은 확장자를 가진 파일 이름을 반환
export const makeRandomFileName = (filename: string) => {
  const ext = path.extname(filename)
  return `${Math.round(Math.random() * 10000000)}${ext}`
}
