const express = require("express")
const mongoose = require("mongoose");
const app = express();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const passport = require("passport");
const bodyParser = require("body-parser")
const cors = require("cors")
const multer = require("multer");
const uuid = require("uuid");
require("./config/jwt")(passport);
const path = require("path");
const utils = require("./utils");
const authenticate = require('./config/authenticate');
const authRoute = require("./routes/authRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (_file?.fieldname == "image") {
      cb(null, "upload/product/");
    }
  },
  filename: (_req, file, cb) => {
    cb(null, `${uuid.v4()}_${file.originalname}`);
  }
});

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

mongoose.connect("mongodb://localhost:27017/Oscar", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // app.post("/payment", cors(), async (req, res) => {
  //   let { amount, id } = req.body
  //   try {
  //     const payment = await stripe.paymentIntents.create({
  //       amount,
  //       currency: "USD",
  //       description: "Spatula company",
  //       payment_method: id,
  //       confirm: true
  //     })
  //     console.log("Payment", payment)
  //     res.json({
  //       message: "Payment successful",
  //       success: true
  //     })
  //   } catch (error) {
  //     console.log("Payment Error", error)
  //     res.json({
  //       message: "Payment failed",
  //       success: false
  //     })
  //   }
  // })

  // app.post('/charge', async (req, res) => {
  //   const { amount, token } = req.body;
  
  //   try {
  //     const charge = await stripe.charges.create({
  //       amount,
  //       currency: 'usd',
  //       source: token.id,
  //       description: 'Charge for testing',
  //     });
  
  //     res.send('Payment successful');
  //   } catch (err) {
  //     console.error('Error processing payment:', err);
  //     let message = 'An error occurred while processing your payment.';
  
  //     if (err.type === 'StripeCardError') {
  //       message = err.message;
  //     }
  
  //     res.status(500).send(message);
  //   }
  // });

  // app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
  //   const sig = req.headers['stripe-signature'];
  //   let event;
  
  //   try {
  //     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  //   } catch (err) {
  //     console.error('Error processing webhook:', err);
  //     res.status(400).send(`Webhook Error: ${err.message}`);
  //     return;
  //   }
  
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       const paymentIntent = event.data.object;
  //       // Fulfill the order
  //       break;
  //     case 'payment_intent.payment_failed':
  //       const paymentFailedIntent = event.data.object;
  //       // Notify the customer that their payment has failed
  //       break;
  //     // Handle other event types as needed
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }
  
  //   res.status(200).end();
  // });

  app.post("/api/create-checkout-session", async (req, res) => { 
    try {
      const product = req.body;
      console.log('product', product);
      const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ["card"], 
        line_items: [ 
          { 
            price_data: { 
              currency: "usd", 
              product_data: { 
                name: product.name, 
              }, 
              unit_amount: product.price * 100, 
            }, 
            quantity: product.quantity,
          }, 
        ],
        mode: "payment",
        // shipping_address_collection: {
        //   allowed_countries: ['US', 'SG', "IT"],
        // },
        // custom_text: {
        //   shipping_address: {
        //     message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
        //   },
        //   submit: {
        //     message: 'We\'ll email you instructions on how to get started.',
        //   },
        // },
        success_url: "http://localhost:3000/success", 
        cancel_url: "http://localhost:3000/cancel", 
      }); 
      res.json({ id: session.id }); 
    } catch (err) {
      console.log('Stripe API Error', err);
      res.status(400).json({msg: err.toString()});
    }
  });

  const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  };

  app.post("/api/payment", async (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd"
    };
    stripe.charges.create(body, stripeChargeCallback(res));
  });

  app.use(multer({ storage: fileStorage, fileFilter }).fields([{ name: 'image', maxCount: 1 }]));
  app.use("/upload", express.static(path.join(utils.rootDir, "server/upload")));

  console.log('path', path.join(utils.rootDir, "server/upload"));
  
  app.use('/api/category', categoryRoute);
  app.use('/api/product', productRoute);
  app.use('/api/user', authenticate, userRoute);
  app.use('/api/order', authenticate, orderRoute);
  app.use("/api", authRoute);
  
  app.listen(process.env.PORT || 4000, () => {
    console.log("Sever is listening on port 4000")
  })


})
