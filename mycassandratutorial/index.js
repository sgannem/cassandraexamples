var express = require('express');
var app = express();

var models = require('express-cassandra');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory( __dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            protocolOptions: { port: 9042 },
            keyspace: 'test_ks',
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err) throw err;

        // You'll now have a `person` table in cassandra created against the model
        // schema you've defined earlier and you can now access the model instance
        // in `models.instance.Person` object containing supported orm operations.
    }
);

app.set('view engine', 'pug');
app.set('views','./views');

//Simple request time logger
app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());
   
   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
  //    function/route handler.
   next();
});

app.get('/firstpug', function(req, res){
   res.render('first_view', {
      "name" : "testing...", 
      "list": ["one", "two", "three"]
   });
});

app.get('/person/:name/:surname/:age', function(req, res) {
    res.send('name: ' + req.params.name+', surname:'+req.params.surname+', age:'+req.params.age);
    var person = new models.instance.Person({
        name: req.params.name,
        surname: req.params.surname,
        age: parseInt(req.params.age),
        created: Date.now()
    });
    person.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log('person saved!');
    });
});

app.get('/person/:name', function (req, res) {
    models.instance.Person.findOneAsync({name: req.params.name})
    .then(function(person) {
        console.log('Found ' + person.name + ' to be ' + person.age + ' years old!');
    })
    .catch(function(err) {
        console.log(err);
    });
    res.send('person found');
  });

  app.put('/person/:name/:surname/:age?', function (req, res) {
    models.instance.Person.findOne({name: req.params.name }, function(err, person){
        if(err) throw err;
        if(person){
            if(req.params.surname){
                person.surname = req.params.surname;
            }
            if(req.params.age){
                person.age = parseInt(req.params.age);
            }
            person.save(function(err){
                if(err) console.log(err);
                else console.log('Person got updated...');
            });
        }
    });
    
    res.send('person updated');
  })

app.listen(3000);