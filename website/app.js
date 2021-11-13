/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

//baseURl
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='

//my personal API Key
const apiKey = ',&appid=b4a90f9b6a7e2a41d313a29b4c71c3e0&units=Metric' //here i added units=metric to get temp in Celsius learnt from api documentation

//get generate btn
const generate = document.getElementById('generate')

//get entry Holders elements
const date = document.getElementById('date')
const temperture = document.getElementById('temp')
const content = document.getElementById('content')

//addEventListener
//this function make object contain the data that will show on front end to api user
generate.addEventListener('click', (e) => {
    //get input fields
    const zip = document.getElementById('zip').value
    const feelings = document.getElementById('feelings').value
    getWeatherData(baseUrl, zip, apiKey).then((weatherData) => {
        const myData = {
            date: newDate,
            temp: weatherData.main.temp,
            feelings: feelings,
        }
        postData('/add', myData)
        showData()
    })
})

//this  get request to send user data (zip) using baseUrl and my apiKey
const getWeatherData = async(baseURl, zip, apiKey) => {
    const response = await fetch(baseURl + zip + apiKey)
    try {
        const data = await response.json()
        if (response.status != 200) {
            document.getElementById('zip').style.outlineColor = 'red'
            window.alert('please enter vaild zip code')
        }
        return data
    } catch (error) {
        console.log('error happend:', error)
    }
}

//post request to get data from web api as json

const postData = async(URL = '', myData = {}) => {
    console.log(myData)
    const response = await fetch(URL, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myData),
    })
    try {
        const nData = await response.json()
        return nData
    } catch (error) {
        console.log('error happend:', error)
    }
}

//this function to get data and show it for user
const showData = async() => {
    const req = await fetch('/all')
    try {
        const dataToShow = await req.json()
        const Integer = Math.round(dataToShow.temp)
        date.innerHTML = `<span class="color"> ${dataToShow.date}</span>`
        temperture.innerHTML = `<span class="color">${Integer}</span>`
        content.innerHTML = ` <span class="color">${dataToShow.feelings}</span>`
    } catch (error) {
        console.log('error happend:', error)
    }
}