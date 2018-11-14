import nJwt from 'njwt'
import { SIGNING_KEY } from '../config/secrets'
import User from '../models/user.model'

export default async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return next()
  }

  try {
    const verifiedJwt = nJwt.verify(token, SIGNING_KEY)
// Attach the user to the request object
    req.user = await User.findById(verifiedJwt.body.sub)
      .then((data) => {
        return data
      }).catch(() => {
        return next()
      })

    return next()
  } catch (error) {
    return next()
  }
}


