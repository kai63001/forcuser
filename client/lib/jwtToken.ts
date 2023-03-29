import jwt from 'jsonwebtoken'

const SignToken = async (data: any) => {
  // hs256
  const token = jwt.sign(
    {
      email: data.email,
      _id: 'test',
      iat: Date.now(),
      // exp 1d
      exp: Date.now() + 1000 * 60 * 60 * 24
    },
    process.env.NEXT_PUBLIC_SECRET_JWT as string
  )

  console.log('new token', token)
  return token
}

export { SignToken }
