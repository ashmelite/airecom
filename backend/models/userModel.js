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

//method to encrypt password before saving it to the database
userSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {         //when a user updates profile like name for eg, but not password then skip the hashing step below. We can skip using next()
    next()
  }
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User