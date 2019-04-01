var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
const path = require("path");
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addtodo", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    () => {
      Todo.find().then(
        data => {
          res.send(data);
        },
        e => {
          res.status(400).send(e);
        }
      );
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/delete", (req, res) => {
  console.log("delete api");
  console.log(req.body.id);

  Todo.findByIdAndDelete(req.body.id, (err, todo) => {
    console.log(todo);
    Todo.find().then(
      data => {
        res.send(data);
      },
      e => {
        res.status(400);
        res.end();
      }
    );
  });
});

app.post("/toggle", (req, res) => {
  Todo.findByIdAndUpdate(req.body.id, { completed: req.body.completed }, () => {
    Todo.find().then(
      data => {
        res.send(data);
      },
      err => {
        console.log(err);
        res.sendStatus(400);
        res.end();
      }
    );
  });
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

app.get("/find ", (req, res) => {
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
