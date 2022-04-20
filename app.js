//jshint esversion:6
const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine",'ejs');


app.get("/",function(req,res)
{
  res.render("home");
});

var temp;
var piccode;
 var picurl;
 var weatherdescription;
var cityname;




app.post("/",function(req,res)
{
   cityname=req.body.cityname;
  const key="";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname +"&appid="+key;


https.get(url,function(response)
{
response.on("data",function(data){

const weatherdata=JSON.parse(data);
  console.log(weatherdata);
 temp=weatherdata.main.temp;
 temperature=weatherdata.main.temp;
 piccode=weatherdata.weather[0].icon;
  picurl="https://openweathermap.org/img/wn/"+piccode+"@2x.png";
  weatherdescription=weatherdata.weather[0].description;
});
});

res.redirect("/about");

});

app.get("/about",function(req,res){

console.log("i am here");
console.log(temp);
const x=273;
const y= Math.floor(((temp)-(x)));
  res.render("about",{ten:y,citynames:cityname,weatherdes:weatherdescription,image:picurl});
});


app.listen(3000,function(req,res){
  console.log("server started");
});
