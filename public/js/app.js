const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    //fetch API
    fetch('/weather?address=' + location).then((res)=>{
        res.json().then(({forecast, location, address, error}) =>{
            
            if(error){
                message1.textContent = error;
            }else{
                message1.textContent = location;
                message2.textContent = forecast;
            }
            
        })

    })
    search.value = '';
})