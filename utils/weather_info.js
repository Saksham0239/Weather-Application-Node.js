const request = require("request");

const weather=function(latitude,longitude,callback){
    var url='http://api.weatherstack.com/current?access_key=4a6ce631cb2766211a3e32463cf570b0&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url:url,json:true},function(err,result){
          if(err)
          {
              callback('Unable to connect to weather api');
          } 
          else if(result.body.error)
          {
              callback('Location not found!! \n please specify the coordinates');
          } 
          else
          {
              callback(undefined,{weather_description:('temprature: '+result.body.current.temperature+ ' degrees,  weather Type: ' + result.body.current.weather_descriptions+', humidity: '+ result.body.current.humidity+
              '%, precipitation: '+result.body.current.precip),
            country:result.body.location.country,region:result.body.location.region});
          }
    });
}

module.exports=weather;

