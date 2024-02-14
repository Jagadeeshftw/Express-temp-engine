const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItems = require("./models/cart-items");
const Order = require("./models/order");
const OrderItems = require("./models/order-items");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1).then((user)=>{
    console.log("The req.user body");
    console.log(req.user);
    req.user = user;
    next();
  }).catch((err)=>{
    console.log(err);
  });

    
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageName: "404 Not Found",
  });
});
Product.belongsTo(User, {
  onDelete: 'CASCADE', // Cascade delete when the associated user is deleted
 // onUpdate: 'CASCADE', // Cascade update when the associated user is updated
  constraints: true // Enable constraints for the association
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItems});
Product.belongsToMany(Cart,{through: CartItems});
User.hasOne(Order);
Order.belongsTo(User);
Order.belongsToMany(Product,{through: OrderItems});
sequelize
  .sync({force:true})
  .then((result) => {
    return User.findByPk(1);
  }).then((user)=>{
    if(!user)
    {
      return User.create({name:"Jagadeesh",email:"jagadeesh26062002@gmail.com"});
    }
    return user;
  }).then((user)=>{
    return user.createCart()
    
  }).then((cart)=>{
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
