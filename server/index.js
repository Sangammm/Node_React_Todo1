var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
const path = require("path");
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });

app.post("/addtodo", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/view", (req, res) => {
  Todo.find().then(
    data => {
      console.log(data);
      res.send(data);
    },
    e => {
      res.status(400);
    }
  );
});

app.get("/find/:id", (req, res) => {
  console.log(req.params.id);
  Todo.findById(req.params.id).then(
    data => {
      res.send(data);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});
