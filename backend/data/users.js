import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Alex Grey',
    email: 'alex@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Cody Nile',
    email: 'cody@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users