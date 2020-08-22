console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.innerHTML=data.error;
                message2.innerHTML="";
            } else {
                console.log(data);
                message1.innerHTML="Country = "+data.country+", Region ="+data.region;
                message2.innerHTML=data.weather_description;
            }
        })
    })
})
