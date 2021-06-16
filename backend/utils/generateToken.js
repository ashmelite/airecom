import jwt from 'jsonwebtoken'

const generateToken = (id) => {         //we want to add id as payload in the token
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })           //payload is an object with id in it
}

export default generateToken