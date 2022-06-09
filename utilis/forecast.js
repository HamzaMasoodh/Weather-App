const request = require('postman-request')


const forecast=(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bf21ec132698aeb5bac9e2b14c882942&query='+long+","+lat+"&units=f&limit=1"

    request({url,json:true},(error,{body})=>{

        if (error) {
            callback('Unable to find location service',undefined)
            
        } else if (body.error) {
            callback('Unable to find coordinated . Try another',undefined)
        }else{
            callback(undefined,"There is "+body.current.weather_descriptions[0]+' It is currently '+body.current.temperature+' degrees out . There is a '+body.current.precip + '% chance of rain')
        }
    })


}

module.exports=forecast

