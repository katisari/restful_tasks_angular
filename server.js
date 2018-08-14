const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/dist/public"));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_api');
var taskSchema  = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    description: {type: String, default: ""}
}, {timestamps: true});
var Task = mongoose.model('Task', taskSchema);

app.get('/', function(req,res) {
    res.json({message: "Index is here"});
});

app.get('/tasks', function(req,res) {
    Task.find({}, function(err, tasks) {
        if (err) {
            res.json({message: "Error"});
        } else {
            res.json({message: "Success", data: tasks});
        }
    });
});

app.get('/tasks/:id', function(req,res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
        if (err) {
            res.json({message: "Error"});
        } else {
            res.json({message: "Success", data: task});
        }
    });
});

app.post('/tasks', function(req,res) {
    var task = new Task({title: req.body.title, completed: req.body.completed, description: req.body.description});
    task.save(function(err) {
        if (err) {
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Saved", tasks: task});
        }
    });
});

app.put('/tasks/:id', function(req,res) {
    Task.update({_id: req.params.id}, {title: req.body.title, completed: req.body.completed, description: req.body.description}, function(err) {
        if (err) {
            res.json({message: "Error"});
        } else {
            res.json({message: "Updated"});
        }
    })
});

app.delete('/tasks/:id', function(req,res) {
    Task.remove({_id: req.params.id}, function(err) {
        if(err) {
            res.json({message: "Error"});
        } else {
            res.json({message: "Deleted"});
        }
    });
});

app.listen(8000, function() {
    console.log("listening to port 8000");
});