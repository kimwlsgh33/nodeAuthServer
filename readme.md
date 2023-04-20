# 서버를 클라우드에 배포하기

1. npm run build

- ts를 js로 모두 변환(transfile) 한후에, dist 폴더의 파일을 node로 실행한다.

( 왜? )

# request, response

1. request

fetch('프로토콜://호스트:포트/라우팅', {
method: 'POST',
mode: 'cors',
cache: 'no-cache',
credentials: 'same-origin',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({name, email, password})
})
