const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const swaggerDocument = require("./swaggerDoc.js");

const booksRoute = require("./routes/books.route.js");
const usersRoute = require("./routes/users.route.js");
const transactionRoute = require("./routes/transaction.route.js");
const authRoute = require("./routes/auth.route.js");
const cartRoute = require("./routes/cart.route.js");

const apiLoginRoute = require("./api/routes/login.route.js");
const apiTransactionRoute = require("./api/routes/transaction.route.js");
const apiBookRoute = require("./api/routes/book.route.js");
const apiUserRoute = require("./api/routes/user.route.js");

const authMiddleware = require("./middleware/auth.middleware.js");
const sessionMiddleware = require("./middleware/session.middleware.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json(process.env.SESSION_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", booksRoute);
app.use("/users", authMiddleware.requiredAuth, usersRoute);
app.use("/transactions", authMiddleware.requiredAuth, transactionRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.use("/api", apiLoginRoute);
app.use("/api", apiTransactionRoute);
app.use("/api", apiBookRoute);
app.use("/api", apiUserRoute);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("500.pug", { error: err });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
