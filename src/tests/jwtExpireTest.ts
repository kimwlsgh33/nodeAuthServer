import {jwtSign, jwtVerify} from '../utils'

function jwtExpireTest() {
  jwtSign({name: 'Jack', password: '1234'}, {expiresIn: '1s'})
    .then((signingKey: string) => {
      setTimeout(
        () =>
          jwtVerify(signingKey)
            .then((decoded: object) => console.log('decoded: ', decoded))
            .catch((err) => console.log('error:', err.message)),
        3000
      )
    })
    .catch((err: Error) => console.log('error:', err.message))
}

jwtExpireTest()
