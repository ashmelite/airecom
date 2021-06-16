import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
  
}, {
  timestamps: true
})

//method to compare plain text password (entered by user) to the hashed password (which we encrypted with bcrypt while seeding data to db)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)     //we can access current user's password (in db) by this keyword
}

const User = mongoose.model('User', userSchema)

export default User