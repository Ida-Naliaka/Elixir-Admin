const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const AuthRoutes = require("./Routes/AuthRoutes");
const CartRoutes = require("./Routes/CartRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const stripeRoute = require("./Routes/Stripe");
const mpesa = require("./Routes/mpesa");
const { notFound, errorHandler } = require("./errorMiddleware");
const path = require("path");
const { userArr } = require("./Controllers/AuthController");
const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/checkout", stripeRoute);
app.use("/api/mpesa", mpesa);
//-------------------------deployment setup
const __dirname2 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname2, "/admin/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname2, "admin", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully..");
  });
}
//-------------------------deployment setup

app.use(notFound);
app.use(errorHandler);
db().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
});
/*
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://ovenway.herokuapp.com",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("user connected");
    console.log("user setup is working");
  });

  socket.on("new order", (newOrder) => {
    console.log("a new order has been made");

    if ((userArr.length = 0)) {
      console.log("chat.users not defined");
      return;
    }
    userArr.forEach((user) => {
      if (user._id == newOrder.UserId) return;
      else {
        socket.to(user._id).emit("new Order", newOrder);
        console.log("notification emitted");
      }
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
*/
