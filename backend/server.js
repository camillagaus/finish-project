import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import productData from '../frontend/src/productData.json'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finishProject"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const Product = mongoose.model('Product', {
  name: String,
  price: Number, 
  currency: String,
  height: Number, 
  width: Number,
  mesurement: String,
  img: String,
  descreption: String
})

 if (process.env.RESET_DATABASE) {
  console.log('resetting the database')
  const seedDatabase = async () => {
    await Product.deleteMany()

    // const blue = new Product({name: 'Blue', price: 40, currency: '€', height: 30, width: 30, mesurement:'cm'})
    // await blue.save()

    // const red = new Product({name: 'Red', price: 40, currency: '€', height: 40, width: 60, mesurement:'cm'})
    // await red.save()

    productData.forEach((product) => {
      new Product(product).save()
    })
    
  }
  seedDatabase()
}



const authenticateUser = async (req, res, next) => {
  try {
  const user = await User.findOne({ accessToken: req.header('Authorization') 
})
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
} catch (err) {
    res.status(403).json({message: 'Access Token is missing or wrong', errors:err})
}
}


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken })
  }catch (err) {
    res.status(400).json({ message: 'Could not create user!', errors: err.errors })
  }
})

app.get('/secrets', authenticateUser)

app.get('/secrets', (req, res) => {
  res.json({ secret: "This is a super secret message!" })
})

// Login endpoint
app.post('/sessions', async (req, res) => {
  try {
  const user = await User.findOne({ email: req.body.email })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken })
  }else {
    res.status(401).json({ notFound: true })
  
  }}catch (err) {
    res.status(404).json({notFound: true})
  }
}
)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
