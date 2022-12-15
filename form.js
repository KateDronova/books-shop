
let form = document.forms[0];
let userName = document.getElementById('name');
let userSurname = document.getElementById('surname');
let street = document.getElementById('street');
let house = document.getElementById('house');
let flat = document.getElementById('flat');

 ///// Check data validity
 function getToday() {
    let now = new Date().toString();
    let year = now.slice(11,15);
    let day = +now.slice(8,10) + 1;
    let monthStr = now.slice(4,7);
    let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = monthList.indexOf(monthStr) + 1;
    let minDay = `${year}-${month}-${day}`;
    return minDay;
}
let dateOfDelivery = document.getElementById('date');
    dateOfDelivery.setAttribute('min', getToday());

///// Check gifts validity
let gift = document.querySelector('select');
    gift.addEventListener('click',(event) => {
        let sum = 0;
        for (const option of gift.options) {
            if (option.selected) {
                sum++;
                if (sum > 2) {
                    event.target.selected = false;
                }
            }
        }
    });

///// Buttons and whole form validation
function toValidate(form) {
    complete.disabled = !form.checkValidity();
}

let error = document.querySelector('span');
let complete = document.querySelector('[type="submit"]');

toValidate(form);

let elements = document.querySelectorAll('[id]');
elements.forEach((item) => {
    item.addEventListener('change',(event) => {
        if (!event.target.checkValidity()) {
            form.append(error);
        }
        if (event.target.checkValidity()) {
            error.remove();
        }
        toValidate(form);
    })
});

//// Final message
form.addEventListener("submit", function(event) {
    event.preventDefault();
    alert(`The order created. Dear ${userName.value} ${userSurname.value}, your parcel will come ${dateOfDelivery.value} to ${street.value} street, house: ${house.value}, flat: ${flat.value}. Thanks for choosing our shop!`);
    form.submit();
});

//// Saving data
if (window.localStorage) {
    let elements = document.querySelectorAll('[id]');
    elements.forEach((item) => {
        item.addEventListener('blur',() => {
            localStorage.setItem(item.id, item.value);
        });
        item.value = localStorage.getItem(item.id) || item.value;
    });
}