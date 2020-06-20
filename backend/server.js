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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
   },
   orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Product'
   }]
})

const Product = mongoose.model('Product', {
  name: String,
  price: Number, 
  currency: String,
  height: Number, 
  width: Number,
  measurement: String,
  img: String,
  description: String
})

const Order = mongoose.model('Order', {
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Product'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String, 
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  }, 
  phoneNumber: {
    type: Number,
    required: true
  }
}) 

 if (process.env.RESET_DATABASE) {
  console.log('resetting the database')
  const seedDatabase = async () => {
    await Product.deleteMany()
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

app.get('/products/:id', async(req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({error: 'product is not found'})
    }
  } catch (err) {
    res.status(400).json({error: 'invalid product request'})
  }
})

app.post('/users', async (req, res) => {
  try {
    const { 
      firstName,
      lastName,
      email, 
      password,
      address,
      zipCode,
      city,
      phoneNumber
   } = req.body
    const user = new User({ 
      firstName,
      lastName,
      email, 
      password: bcrypt.hashSync(password),
      address,
      zipCode,
      city,
      phoneNumber 
    })
    await user.save()
    res.status(201).json({ 
      id: user._id, 
      accessToken: user.accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      zipCode: user.zipCode,
      city: user.city,
      phoneNumber: user.phoneNumber
    })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user!', errors: err.errors })
  }
})

app.get('/users/:userId', authenticateUser)

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params
  
  try {
    const user = await User.findOne({ _id: userId }).populate({
      path: 'orderHistory',
      select: 'items createdAt status',
      populate: {
        path: 'items',
        select: 'name price',
      },
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({
      message: 'invalid request',
      errors: err.errors 
    })
  }
})

// app.get('/secrets', authenticateUser)

// app.get('/secrets', (req, res) => {
//   res.json({ secret: "This is a super secret message!" })
// })

// Login endpoint
app.post('/sessions', async (req, res) => {
  try {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({ 
      userId: user.id, 
      accessToken: user.accessToken, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      city: user.city,
      zipCode: user.zipCode
    })
    
  } else {
    res.status(401).json({ notFound: true })
  
  }} catch (err) {
    res.status(404).json({notFound: true})
  }
})

//Post order 

app.post('/orders', authenticateUser)
app.post('/orders', async (req, res) => {
  const {
    products,
    userId,
    firstName,
    lastName,
    email,
    address,
    zipCode,
    city,
    phoneNumber
  } = req.body

  try {
    const order = await new Order({
      products: products,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      zipCode: zipCode,
      city: city,
      phoneNumber: phoneNumber
    }).save()
    await User.findOneAndUpdate(
      {_id: userId},
      {
        //push items into mongo array via mongoose
        $push: {orderHistory: order._id}
      }
    )
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({
      message: 'Couldnt place order',
      errors: err.errors,
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
