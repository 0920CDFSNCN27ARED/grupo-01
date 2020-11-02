const express = require("express");
const app = express();
const path = require("path");

app.listen(3000, ()=>{
    console.log("Server running in port 3000");
});

app.use(express.static(__dirname + "/public"));

app.get("/carritoDeCompras",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"views","productCart.html"))
})

app.get("*",(req,res=>{
    res.status(404).send("Error 404 not found")
}));