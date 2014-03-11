async = require("async");
persistence = require("./persistence");

module.exports = {
    init: function(app) {
        app.get("/", function(req, res, next) {
            var todos;

            async.series([
                function(callback) {
                    persistence.Todo.findAll({
                        order: "createdAt ASC"
                    }).complete(function(err, fetchedTodos) {
                        if (!err) {
                            todos = fetchedTodos;
                        }
                        callback(err);
                    });
                }
            ], function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.render("todos.ejs", {
                        todos: todos
                    });
                }
            });            
        });

        app.post("/create", function(req, res, next) {
            async.series([
                function(callback) {
                    persistence.Todo.create({
                        description: req.body.description
                    }).complete(callback);
                }
            ], function(err) {
                if (err) {
                    next(new Error("Creating todo failed"));
                }
                else {
                    res.redirect("/");
                }
            });
        });

        app.post("/edit/:todoId", function(req, res, next) {
            var todo;

            async.series([
                function(callback) {
                    persistence.Todo.find(req.params.todoId).complete(function(err, fetchedTodo) {
                        if (!err) {
                            todo = fetchedTodo;
                        }
                        callback(err);
                    });
                },
                function(callback) {
                    todo.description = req.body.description;
                    todo.done = (req.body.done && req.body.done == "true") ? true : false;
                    todo.save().complete(callback);
                }
            ], function(err) {
                if (err) {
                    next(new Error("Updating todo failed"));
                }
                else {
                    res.redirect("/");
                }
            });
        });

        app.post("/delete/:todoId", function(req, res, next) {
            var todo;

            async.series([
                function(callback) {
                    persistence.Todo.find(req.params.todoId).complete(function(err, fetchedTodo) {
                        if (!err) {
                            todo = fetchedTodo;
                        }
                        callback(err);
                    });
                },
                function(callback) {
                    todo.destroy().complete(callback);
                }
            ], function(err) {
                if (err) {
                    next(new Error("Deleting todo failed"));
                }
                else {
                    res.redirect("/");
                }
            });
        });
    }
}
