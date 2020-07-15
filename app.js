const express = require("express");
const Sequelize = require("sequelize");

const app = express();

const connection = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

connection
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');
      require('./models/blog');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

const { Blog } = require('./models/index');
app.get("/", async (req, res) => {
  const blog = await Blog.create({
    title: 'ale',
    content: 'holo'
  });
  if(blog) {
    return res.json({
      ok: true,
      data: blog,
    })
  }
  return res.json({
    ok: false,
    err: 'error bringing blogs',
  })
}); 

app.get("/find", async (req, res) => {
  try {
    const blogs = await Blog.findAll({})
    res.json({
      ok:true,
      data: blogs
    })
  } catch (err) {
    throw new Error(err);
  }
})

app.listen(3000, () => {
  console.log('running on port 3000');
});
