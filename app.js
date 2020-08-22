const express=require('express');
const path = require('path');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const weather=require('./utils/weather_info');

const app=express();

const port= process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
var partialsDirectory=path.join(__dirname,'views/partials');
app.set('view engine','hbs');//giving a value to a particular setting of express
hbs.registerPartials(partialsDirectory);


app.get('/',function(req,res)
{
    res.render('index',{  //render by default will look into views 
        title: 'Weather',
        name: 'Saksham Pratap Singh'
    });
});


app.get('/about',function(req,res)
{
    res.render('about',{  //render by default will look into views 
        title: 'About File',
        name: 'Saksham Pratap Singh'
    });
});


app.get('/help',function(req,res){
    res.render('help',{
        title: 'pratapsaksham12@gmail.com',
        name:'Saksham Pratap Singh'
    });
});

app.get('/weather',function(req,res,next){

    if(!req.query.address)
    {
        res.send({
            error: 'Please enter an address'
        })
    }
    else
    {
        geocode(req.query.address,function(error,result){
                if(error)
                {
                    res.send({
                        error: error
                    })
                    next(error);
                }
                else
                {
               console.log(result);
             
               weather(result.latitude,result.longitude,function(err,weatherInfo){

                if(err)
                {
                    res.send({
                        error: err
                    })
                    next(err);
                }
                else
                {
               res.send(weatherInfo);
                }
               });
            }
        });
    }
});

app.get('/help/*',function(req,res){
    res.render('helpError')
});

app.get('*',function(req,res){
    res.render('error');
});



app.listen(port,function(){
    console.log('Server started on port '+port);
});