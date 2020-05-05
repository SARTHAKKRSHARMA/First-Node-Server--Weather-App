const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define Path
const viewPath = (path.join(__dirname,'../templates/views'))
const partialsPath = path.join(__dirname,'../templates/partials') 
//Setup Handlebar engine and views location
app.set('views', viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(path.join(__dirname,'..','public')))

//routes..............................

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:"Sarthak"
    })
})


app.get('/about',(req,res)=>{     
    res.render('about',{
        content:'About Me',
        title:"About",
        author:'Sarthak'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        help:"For any help call God",
        title:"Help",
        author:"Sarthak"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address has been provided by you."
        })
    }
    geocode.geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({
                error:error
            })
        }else{
            forecast.foreCast(latitude,longitude,(error,data)=>{
                if(error){
                    res.send(error)
                }else{
                   res.send(data) 
                }
            })
        }

    })
   
})

app.get('/product',(req,res)=>{
    if(!req.query.products){
       return res.send({
            error : "You must provide a search term"
        })
    }

    console.log(req.query.products)
    res.send({
    products : []
    })    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404 Error",
        error:"Hey look like you have been trying to get to the help page. To get help page go to /help.",
        author:"Sarthak"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404 Error",
        error:"Hey we haven't created what you have been looking for",
        author:"Sarthak"
    })
})

//starting up server
app.listen(port,()=>{
    console.log("Server is up on port "+ port)
    console.log("http://localhost:"+port)
})