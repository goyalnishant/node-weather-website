const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Set Up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Nishant Goyal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Need any help!',
        name:'Nishant Goyal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Nishant Goyal'
    })
})
// app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide city name'
        })
    }
    const cityName = req.query.address
    geoCode(cityName, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {description,current_temp,feelslike} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                description,
                current_temp,
                feelslike
            })
        })
    })
    // res.send({
    //     location:req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        error:'Help Article Not Found',
        name:'Nishant Goyal'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        error:'Page Not Found',
        name:'Nishant Goyal'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port ', port)
})