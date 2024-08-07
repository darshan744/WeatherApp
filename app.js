

const weatherForm = document.querySelector('.Form')

const input = document.querySelector('.Input')

const card = document.querySelector('.card');
const api = "7949db26d156f09c454790a5714182ee";

weatherForm.addEventListener('submit',async event =>{

    event.preventDefault();

    const city = input.value;

    if(city){
        try{
            const weatherData = await getweatherData(city);
            displayWeather(weatherData);
        }catch(e){
            console.error(e);
            displayError(error);
        }
    }else{
        displayError('Please Enter City')
    }
});

async function getweatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`

    const res = await fetch(apiUrl);

    if(!res.ok){
        throw new Error("Could nt fetch data")
    }
    return await res.json();
}


function displayWeather(data){

        const {name:city,
            main:{temp,humidity},
            weather:[{description,id}]} =data; 

        card.textContent = "";
        card.style.display = 'flex'

        const cityDisplay = document.createElement('h1');
        const tempDisplay = document.createElement('p');
        const humidityDisplay = document.createElement('p');
        const descDisplay = document.createElement('p');
        const Emoji = document.createElement('p');

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${temp}°K`
        humidityDisplay.textContent = `Humidity:${humidity}`;
        descDisplay.textContent = description;
        Emoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add('cityDisplay');
        tempDisplay.classList.add('tempDisplay');
        humidityDisplay.classList.add('humidityDisplay');
        descDisplay.classList.add('descDisplay');
        Emoji.classList.add('weatherEmoji');
        

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(Emoji);
        

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId< 300):
            return "🌧️";
        
        case (weatherId >= 300 && weatherId< 400):
            return "🌧️";
        case (weatherId >= 400 && weatherId< 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId< 700):
            return "❄️";
        case (weatherId >= 700 && weatherId< 800):
            return "🌁";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId< 810):
            return "🌨️";
        default:
            return "❓";
        
    }

}


function displayError(message){

        const errorDisplay = document.createElement('p');
        errorDisplay.textContent = message;
        errorDisplay.classList.add('error');

        card.textContent = "";
        card.style.display="flex";
        card.appendChild(errorDisplay);

}