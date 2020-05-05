// console.log("Client side js is loading")

// fetch('http://localhost:3000/weather?address=Jaipur').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log("Ahh..Error")
//         }else{
//             console.log(data)
//         }
//     })
// })

// const weatherform = document.querySelector('form')
// const search = document.querySelector('input')

// weatherform.addEventListener("submit",(e)=>{
//     e.preventDefault()
//     const location = search.value
//     console.log(location)
// })

console.log("Your Js is setup")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelectorAll('#message2')

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    message2[0].textContent = ""
    message1.textContent = "Loading.... Please Wait...."
    const location = search.value
    const url = '/weather?address='+location
    
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = "Ahh...Error.Please try again"
            }else{
                message1.textContent = "Weather Details"
                console.log(data.temperature)
                message2[0].textContent = 'Temperature out there in '+ location.toUpperCase() +' is '+data.temperature+" degree Celcius.But it feels like it's almost "+data.feelslike +" degree Celcius temprature out there."
                
                
            }
        })
    })
})