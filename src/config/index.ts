import path from 'path'

// 현재디렉토리 + public 경로 문자열 만들기
export const getPublicDir = () => path.join(process.cwd(), 'public')
