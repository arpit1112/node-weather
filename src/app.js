const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicFolderPath = path.join(__dirname, '../public')

// Setup handle bars and view location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory path
app.use(express.static(publicFolderPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arpit Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Arpit Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page!',
        title: 'Help page',
        name: 'Arpit Singh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, name } = {}) => {
        if(error) {
            return res.send({
                error: 'Request can not be processed'
            })
        }
        
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error) {
                return res.send({
                    error: 'Request can not be processed'
                })
            }

            res.send({
                location: name,
                forecast: forecastResponse,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arpit Singh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arpit Singh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is Up! ', port);
}) 