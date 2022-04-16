const path= require('path')
const express= require('express')
const { get } = require('http')
const hbs= require('hbs')
const request= require('request')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const { isBuffer } = require('util')


const app= express()

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup a static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup routes for each of our views/templates
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Hallah Elhassan'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Hallah Elhassan'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'How can I help you?',
        name: 'Hallah Elhassan'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
            forecast: forecastData,
            location: location,
            address:req.query.address
            })
        })
    })
})


// app.get('/products', (req, res)=>{
//     if(!req.query.search){
//        return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*', (req, res)=>{
    res.render('404',{
                title:'404',
                errorMessage:'Help article not found',
                name:'Hallah Elhassan'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
            title:'404',
            errorMessage: 'Page not found',
            name: 'Hallah Elhassan'
    })
})

//app.com
//app.com/help
//app.com/about


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
