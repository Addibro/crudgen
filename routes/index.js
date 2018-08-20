var express = require('express');
var router  = express.Router();

// dummy data
var testColumns = {"artnum": "artnum", "artname": "artname", "price": "price", "stuff": "category", "amount": "amount", "value": "val", "shipdate": "shipdate"};
var testColumns2 = ["artnum", "artname", "price", "category", "amount", "val", "shipdate"];
var testData = [{"artnum": '13', "artname": 'Bogous', "price": 123, "stuff": "hey", "amount": 10, "value": "value", "shipdate": "19-09-2018"}, {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"}, 
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"}, {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "då", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},
                {"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"},{"artnum": '1337', "artname": 'Bogous', "price": 123, "stuff": "stuff", "amount": 10, "value": "value", "shipdate": "19-09-2018"}
                ];


// define which column is the id
var idCol = 0;

/* test */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: 'Hello, World!'});
});

/* GET products listing. */
router.get('/', function(req, res, next) {
    res.render('main', {data: testData, columns: testColumns2, name: "Hello World", idCol: idCol });
});

router.get('/details/:id', (req, res) => {
    res.render('details', {data: find(req.params.id), columns: testColumns2});
});

function find(param){
    return testData.find((element) => {return Object.values(element)[idCol] == param});
}

router.get('/edit/:id', (req, res) => {
    res.render('edit', {data: find(req.params.id), columns: testColumns2});
});

router.post('/save', (req, res) => {
    // TODO: saving logic
    res.redirect('/');
});

router.get('/search', (req, res) => {
    res.json(req.body);
});

router.get('/add', (req, res) => {
    res.render('add', {columns: testColumns2});
});


/* GET to Delete Uppgift */
router.get('/delete', function(req, res) {
    var id = req.query.id;

    MongoClient.connect(dburl, function(err, db) {

        if(err) { throw err;  }

        db.collection('uppgifter', function(err, uppgifter) {

            uppgifter.deleteOne({_id: new mongodb.ObjectID(id)});

            if (err){
                throw err;
            } else {
                db.close();
                res.redirect('/');
            }
        });
    });
});

module.exports = router;