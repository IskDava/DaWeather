import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 2727;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function getCordsByLocation(city, apikey) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`);
    const data = await response.json();
    const result = {
        lat: data[0].lat,
        lon: data[0].lon
    };
    return result;
}

app.get('/api/getWeather', async (req, res) => {
    const city = req.query.loc;
    const apikey = process.env.OPENWEATHER_API;
    
    const cords = await getCordsByLocation(city, apikey);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.lon}&appid=${apikey}`);

    const data = await response.json();

    const weather = {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        type: data.weather[0].main,
        description: data.weather[0].description,
        lat: cords.lat,
        lon: cords.lon
    };

    res.send(weather);
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}!`);
});