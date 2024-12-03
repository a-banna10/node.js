const express = require("express");

const app = express();
app.use(express.json());
//CONNECT TO MONGODB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://richmindset9099:Richmindset909@myfirstnodejsapp.lu5e6.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstNodeJsApp"
  )
  .then(() => {
    console.log("connected successfully!");
  })
  .catch((error) => {
    console.log("error connecting to database ", error);
  });
//
const Article = require("./models/Article");
//

//

app.get("/hello", (req, res) => {
  res.send("hello");
});
//
app.listen(3000, () => {
  console.log("I am listening on port 3000");
});
//
app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 10; i++) {
    numbers += i + " - ";
  }
  // res.send(`numbers are: ${numbers}`);
  // res.send("<h1>Hello World</h1>");
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", { name: "yarob", numbers: numbers });
});
//
app.get("/test", (req, res) => {
  res.send("you visited test");
});
//
app.post("/addComment", (req, res) => {
  res.send("add your comment here!");
});
//path params
app.get("/findSum/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  const sum = Number(num1) + Number(num2);
  res.send(`the sum is: ${sum}`);
});
//body params
app.get("/sayHello", (req, res) => {
  const name = req.body.name;
  const age = req.query.age;
  // res.send(`Hello ${name}, your ${age} years old`);
  res.json({
    name: name,
    age: age,
  });
});

//ARTICLES ENDPOINT//
app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 0;
  await newArticle.save();
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});
app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  const article = await Article.findById(id);
  res.json(article);
});
app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  const article = await Article.findByIdAndDelete(id);
  res.json("deleted successfully");
});
app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("showArticles.ejs", { allArticles: articles });
});
//
