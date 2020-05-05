const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=8d857ac38a4c7362345ab04b426cebf2&query="+latitude+","+longitude
    // console.log(url)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to access weather stack",undefined)
        }else if(body.error){
            callback("Unable to find required result.Please try again",undefined)
        }else{
           const temperature = body.current.temperature
            const feelslike =body.current.feelslike
            const location = body.location.region
            // console.log(temperature,feelslike,location)
            callback(undefined,{
                temperature,
                feelslike,
                location
            })
        }
    })
}



module.exports = {
    foreCast:forecast   
}