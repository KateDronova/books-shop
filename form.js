
let form = document.forms[0];
    form.action = "#";
    form.method = 'post';
    form.innerHTML = "<h2>Order form</h2>"
let div = document.createElement('div');
    form.append(div);

function newLabel(value, id) {
    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.append(value);
    div.append(label);
}
function newInput(elemName, elemType, elemLabel, elemID) {
    elemName = document.createElement('input');
    elemName.setAttribute('type', elemType);
    elemName.setAttribute('id', elemID);
    elemName.required = true;
    let label = newLabel(elemLabel, elemID);
    div.append(elemName);
}

let userName = newInput('userName','text','Name','name');
    userName = document.querySelector('#name');
    userName.setAttribute('pattern',"[a-z,A-Z]{4,15}");
let userSurname = newInput('userSurname','text','Surname','surname');
    userSurname = document.querySelector('#surname');
    userSurname.setAttribute('pattern',"[a-z,A-Z]{5,20}");
let street = newInput('street','text','Street','street');
    street = document.querySelector('#street');
    street.setAttribute('pattern',"[0-9,a-z,A-Z]{5,15}");
let house = newInput('house','text','House number','house');
    house = document.querySelector('#house');
    house.setAttribute('pattern',"[0-9]{1,15}");
let flat = newInput('flat','text','Flat number','flat');
    flat = document.querySelector('#flat');
    flat.setAttribute('pattern',"[0-9][0-9,-]{1,15}");

 //// Check data validity
 function getToday() {
    let now = new Date().toString();
    let year = now.slice(11,15);
    let day = +now.slice(8,10) + 1;
    let monthStr = now.slice(4,7);
    let month;
    switch (monthStr) {
        case "Jan":
            month = 1;
            break;
        case "Feb":
            month = 2;
            break;
        case "Mar":
            month = 3;
            break;
        case "Apr":
            month = 4;
            break;
        case "May":
            month = 5;
            break;
        case "Jun":
            month = 6;
            break;
        case "Jul":
            month = 7;
            break;
        case "Aug":
            month = 8;
            break;
        case "Sep":
            month = 9;
            break;
        case "Oct":
            month = 10;
            break;
        case "Nov":
            month = 11;
                break;
        case "Dec":
            month = 12;
            break;
    }
        let minDay = `${year}-${month}-${day}`;
        return minDay;
}
let dateOfDelivery = newInput('date','date','Delivery Date','date');
    dateOfDelivery = document.querySelector('#date');
    dateOfDelivery.setAttribute('min', getToday());

let paySection = document.createElement('fieldset');
let legend = document.createElement('legend');
    legend.innerText = "Choose pay method";
let ul = document.createElement('ul');
    let li_cash = document.createElement('li');
        let cash = document.createElement('input');
            cash.type = "radio";
            cash.name = "payMethod";
            cash.value = "Cash to the courier";
            cash.id = "cash";
            cash.required = true;
        let cashLabel = document.createElement('label');
            cashLabel.setAttribute('for',cash.id);
            cashLabel.append(cash.value);
    li_cash.append(cash, cashLabel);
// Tried to make <li> shorter, but that didn't work then~
    let li_card = document.createElement('li');
        let bankCard = document.createElement('input');
            bankCard.type = "radio";
            bankCard.name = "payMethod";
            bankCard.value = "Bank Card";
            bankCard.id = "card";
            bankCard.required = true;
            bankCard.checked = true;
        let cardLabel = document.createElement('label');
            cardLabel.setAttribute('for',bankCard.id);
            cardLabel.append(bankCard.value);
    li_card.append(bankCard, cardLabel);
ul.append(li_cash, li_card);
paySection.append(legend, ul);
div.append(paySection);


let gift = document.createElement('select');
    gift.setAttribute('id','gift');
    gift.setAttribute('multiple','');
    gift.setAttribute('size','4');
    let option1 = new Option("pack as a gift",'pack',true,true);
    let option2 = new Option("add postcard",'addPost',true,true);
    let option3 = new Option("provide 2% discount to the next time",'discountLater');
    let option4 = new Option("branded pen or pencil",'pen');
    gift.append(option1, option2, option3, option4);
    gift.addEventListener('click', function(event) {
        let sum = 0;
        for (let option of gift.options) {
            if (option.selected) {
                sum++;
                if (sum > 2) {
                    event.target.selected = false;
                }
            }
        }
    });

let label = newLabel('Choose 2 gifts','gift');
    div.append(gift);

  ///// Buttons and whole form validation
  function toValidate(form) {
    if (form.checkValidity() === false) {
        complete.disabled = true;
    } else {
        complete.disabled = false;
    }
}
let error = document.createElement('span');
    error.classList.add('error');
    error.innerHTML = 'The field is invalid';

let complete = document.createElement('input');
    complete.setAttribute('value','Complete');
    complete.setAttribute('type','submit');
    form.append(complete);

toValidate(form);
let elements = document.querySelectorAll('[id]');

for (let i = 0; i < elements.length; i++) {

    elements[i].addEventListener('change', function(event) {
        console.log(event.target.checkValidity());
        if (event.target.checkValidity() == false) {
            form.append(error);
        }
        if (event.target.checkValidity() == true) {
            error.remove();
        }
        toValidate(form);
    });
}

let reset = document.createElement('input');
    reset.setAttribute('value','Reset');
    reset.setAttribute('type','reset');
    form.append(reset);

let back = document.createElement('a');
    back.innerHTML = '<span>To the main page</span>';
    back.setAttribute('href','index.html')
    form.append(back);