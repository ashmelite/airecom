import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()          //deleteMany with empty argument will delete everything in DBase
    await Product.deleteMany()
    await User.deleteMany()
    
    const createdUsers = await User.insertMany(users)     //createdUsers will be an array of all users we insert from users file into DBase
    
    const adminUser = createdUsers[0]._id     //admin is first item in the array
    
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }                //insert admin user's id into the product (since only an admin can create products)
    })        // ...product -> keep (copy) everything that is in that product and set user field to adminUser
    
    await Product.insertMany(sampleProducts)   //put data into DBase
    
    console.log('Data imported!')
    process.exit()        //pass 1 as argument in exit only when process ended due to some error; see catch block below
    
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}



const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    
    console.log('Data destroyed!')
    process.exit()
    
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}