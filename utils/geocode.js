const request = require("request");

const geocode=function(location,callback)
{
    var url='http://api.weatherstack.com/current?access_key=4a6ce631cb2766211a3e32463cf570b0&query='+encodeURIComponent(location);
    request({url: url, json: true},function(error,result){
        if(error)
        {
            callback('Not able to connect to weatherStack api');
        }
        else if(result.body.error)
        {
            callback('Location not found!!! Please recheck your query');
        }
        else
        {
            callback(undefined,{
                latitude: result.body.location.lat,
                longitude:result.body.location.lon
            })
        }
    });
}

module.exports=geocode;