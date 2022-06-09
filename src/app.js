const path=require('path')
const forecast=require('../utilis/forecast')
const express=require('express')
const hbs=require('hbs')
const request=require('postman-request')
const geocode=require('../utilis/geocode')
const { error } = require('console')

const app=express()

//Define paths
const publicDirectoryPath= path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Hamza'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        name:'Hamza'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Shehzain Butt',
        helpText:'I want help ',
        name:'Hamza'

    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'Please provide the address'
        })
        
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
            return res.send({error})
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if (error) {
                return res.send({error})                   
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            


        })
    })
    
})
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    } 
    console.log(    req.query.search    )
    res.send({
        product:[]
    })
    

})

app.get('/help/*',(req,res)=>{
    res.render(
        '404',{
        title:'404',
        errorMessage:'Help Article not Found',
        name:'Hamza'
    })

})
app.get('*',(req,res)=>{
    res.render(
        '404',{
        title:'404',
        errorMessage:'Page not found ',
        name:'Hamza'
    })

})

//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})