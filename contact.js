import{ init } from 'emailjs-com';
init("user_wU181qXsTCjZZPB6nwaik");

var templateParams = {
    name: 'James',
    notes: 'Check this out!'
};
 
emailjs.send('<YOUR SERVICE ID>','<YOUR TEMPLATE ID>', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(err) {
       console.log('FAILED...', err);
    });