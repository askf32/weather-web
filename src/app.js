const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, './views/partials')
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })  
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
   
    if(!req.query.address){
         res.send({
            error:"Address not provided"})
    }else {
        geocode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
    
                console.log(location)
                console.log(forecastData)
            })
        })
    }
   
    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})