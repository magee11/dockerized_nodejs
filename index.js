const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const app = express();
const d = process.env;
const MONGODB_URI = `${d.DB_HOST}://${d.MONGODB_USER}:${d.MONGODB_PASSWORD}@${d.MONGODB_COINTAINER}:${d.MONGODB_LOCAL_PORT}/${d.MONGODB_DATABASE}?authSource=admin`;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 
console.log("====================================");
console.log(MONGODB_URI);
console.log("====================================");
// const cloud = 'mongodb+srv://Magesh23:<Magee2002>@cluster0.q0b0xwz.mongodb.net/db?retryWrites=true&w=majority'
// Connect to MongoDB
const cloud =
  "mongodb+srv://root:5tIvntMQYHwj24DS@test.6wohkkn.mongodb.net/test";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.post("/register", async (req, res) => {
  const new_user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  await new_user.save()
  res.send(new_user);
});

app.get('/get_users',async(req, res) => {
  const users = await User.find({})
  res.send(users)
})

app.listen(port, () => console.log(`backend started on port ${port}`));
