const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f93e7efb7f698a79334d41fb00aae8b4&query='+latitude+','+longitude +'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                current_temp:body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })
}

module.exports = forecast