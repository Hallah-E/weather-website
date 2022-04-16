const request=require('request')


// After using destructing and property shorthand
//1. geocode function
const geocode=(address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFsbGFoZSIsImEiOiJjbDFnbjB4NGgxY2drM2ZwM3hkaDBocDc3In0.gAVmAFNqpubv_PXuLeGYfQ&limit=1'
    request({url , json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined) //customize what to do with error depending on the caller
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search!', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports= geocode