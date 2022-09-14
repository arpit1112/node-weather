const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageLF = document.querySelector('#message-1')
const messageError = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageError.textContent = 'Loading...'
    e.preventDefault();
    const location = search.value;
    messageLF.textContent = ''
    fetch(`/weather?address=${location}`)    
        .then(res => {
                res.json().then(data => {
                    if(data.error) {
                        messageError.textContent = data.error;
                        console.log(data.error);
                    } else {
                        messageError.textContent = data.location;
                        messageLF.textContent = data.forecast;
                        console.log(data.location);
                        console.log(data.forecast);
                    }
                })
            }).catch(err => {
                console.log('Error occured!');
            })
})