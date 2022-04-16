const request=require('request')

// After using destructing and property shorthand

const forecast=(latitude, longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4c1bfbebcb34635d41b315601ee79f45&query='+latitude+','+longitude+'&units=m'
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+ '. It is currently '+ body.current.temperature+ ' degrees out. But it feels like '+body.current.feelslike+ ' degrees.')
        }
    })
}

module.exports= forecast