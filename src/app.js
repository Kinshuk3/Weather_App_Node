const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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

//404
app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Kinshuk Chadha'
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})