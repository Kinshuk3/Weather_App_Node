const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//create custome path for express
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set handlebars engine and custom views path
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); //register partials

//app.com send static content via this
app.use(express.static(publicDirPath))

app.get('/', (req,res) =>{
    //render the handlebars template
    res.render('index', {
        title: 'Weather App',
        name: 'Kinshuk Chadha'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About the App',
        name: 'Kinshuk Chadha'
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        help: 'I will help you.',
        title: 'Help',
        name: 'Kinshuk Chadha'
    });
})

//app.com/weather
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data)=>{
            if(error){
                return res.send({
                   error
                })
            }
            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

//wildcard character if user is going thru help
app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        name: 'Kinshuk Chadha'
    })
})
//404
app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Kinshuk Chadha'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})