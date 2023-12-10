const express = require("express");

const app = express();
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", (request, response, next) => {
  const posts = [
    {
      id: "1223amsd",
      title: "first title",
      content: "welcome in server side",
    },
    {
      id: "asdfe12123",
      title: "second title",
      content: "welcome in server side for second time",
    },
  ];
  response.status(200).json({
    message: "data fetched correctly",
    posts,
  });
});

module.exports = app;
