const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const persons = [
    {"id":1,"name":"Roland Valdez","age":39,"date_joined":"1982-05-26","date_updated":"2021-08-17"},{"id":2,"name":"Norma Valdez","age":39,"date_joined":"1981-10-04","date_updated":"2021-08-17"},{"id":3,"name":"Tatiana Valdez","age":17,"date_joined":"2004-08-03","date_updated":"2021-08-17"},{"id":4,"name":"Alejandro Valdez","age":10,"date_joined":"2011-02-18","date_updated":"2021-08-17"},{"id":5,"name":"Daniel Valdez","age":7,"date_joined":"2014-06-05","date_updated":"2021-08-17"}
];

app.get('/', (req,res) =>{
   res.send("Welcome to Person API");
});

app.get('/api/v1/person', (req, res) => {
    res.send(persons);
});

app.get('/api/v1/person/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if (!person) res.status(404).send("The person with the provided ID does not exist");
    res.send(person);
});
app.post('/api/v1/person', (req, res) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }
    if(mm<10)
    {
        mm='0'+mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
    const schema = Joi.object({
        name: Joi.string().max(2).required()
    });
    const result = schema.validate();
    if(result.error){
        res.status(400).send(result.error);
        return;
    }
    const person = {
        id: persons.length + 1,
        name: req.body.name,
        age: req.body.age,
        date_joined: req.body.date_joined,
        date_updated: today
    }
    persons.push(person);
    res.send(person);
});
app.put('/api/v1/person/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if (!person) res.status(404).send("The person with the provided ID could not be updated as it does not exist");
    res.send(person);
});
app.delete('/api/v1/person/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if (!person) res.status(404).send("The person with the provided ID does not exist and could not delete");
    res.send(person);
});

const port  = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}....`));