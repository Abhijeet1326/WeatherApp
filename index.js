import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use('/public',express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index",{city:"City", varHumid:"Humidity", varTemp:"Temperature", varWind:"Wind"})
});

app.post("/submit", async (req, res) => {
    const city = req.body["cityName"].slice(0,1).toUpperCase() +req.body["cityName"].slice(1,req.body["cityName"].length);
    const key = "17b17ba634d7434a096407a01f8b409d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    const raw_data =await fetch(url );
    const data =await raw_data.json();
    const varTemp = Math.floor(data.main.temp);
    const varHumid = data.main.humidity;
    const varWind = data.wind.speed;
    res.render("index.ejs", {city:city, varHumid:varHumid, varTemp:varTemp, varWind:varWind});
});

app.listen(PORT, () => {
    console.log("Server Live on Port 3000...");
});
