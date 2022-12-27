
/////////Accessing to JSON
const books = [];
fetch('./assets/books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        books.push(...data);
        init(books);
    })

/////////Creating all the newElements for layout
function createNewElem(parentElement, newElemTag, classToAdd, textContent) {
    const newElem = document.createElement(newElemTag);
    newElem.classList.add(classToAdd);
    newElem.insertAdjacentHTML('beforeend', textContent);
    parentElement.append(newElem);
    return newElem;
}

const main = document.querySelector('main');

const heading = createNewElem(main,"div","heading","<h1>Welcome to our Book shop!</h1>");

const shoppingCart = createNewElem(main,"div","shopCart","<p>Chosen books &#128722;0</p>");

const cartWindow = createNewElem(main,"div","cartWindow"," ");
cartWindow.hidden = true;

const confOrder = createNewElem(cartWindow,"a","confOrder","Confirm order");
confOrder.setAttribute("href","delivery_form.html");

const subheading = createNewElem(main,"div","subheading","<h2>Here you can find everything you need about <span>JavaScript</span></h2>");

const catalog = createNewElem(main,"div","catalog"," ");

const cards = [];
let i = 0;
function init(books) {
  books.forEach(() => {
    cards.push(createNewElem(catalog,"div","card","<div>"));
  })
  
  cards.forEach((item) => {
      addContent(item);
  });
  addImagesToCards();
  makeElementsDroppable(cards);
}

const addingButton = createNewElem(main,"button","add","Add to Cart");
const showMoreButton = createNewElem(main,"button","show","Show more");

function addContent(item) {
  item.append('"', books[i].title, '"', " of ", books[i].author);
  item.append(showMoreButton.cloneNode(true), "Price: ", books[i].price, "$", addingButton.cloneNode(true));
  item.setAttribute('id', i + 1);
  i++;
}

const showMoreButtons = document.querySelectorAll('.show');

let j = 0;
function addImagesToCards() {
  const imageBoxes = document.querySelectorAll('.card div');
  imageBoxes.forEach((item) => {
    const img1 = document.createElement("img");
    img1.src = books[j].imageLink;
    j++;
    item.append(img1);
  });
}

const closingButton = createNewElem(main,"button","close","&times;");

///////////////Using DOM events
let sum = 0;

document.addEventListener('click', function(event) {
/////1. For adding books to the shopping cart
//// Through the button
  if (event.target.className === 'add') {
      sum++;
      shoppingCart.textContent = "";
      shoppingCart.insertAdjacentHTML('beforeend', `<p>Chosen books &#128722;${sum}</p>`);
      const chosen = createNewElem(cartWindow,"div","chosen"," ");
          chosen.append(books[event.target.closest('div').id - 1].title + " of " + books[event.target.closest('div').id - 1].author + ", " + books[event.target.closest('div').id - 1].price + "$");
          chosen.append(closingButton.cloneNode(true));
          cartWindow.prepend(chosen);
          cartWindow.hidden = false;
  }

/////2. For showing popup
  if (event.target.className === 'show') {
    const annotation = createNewElem(main,"div","annot",books[event.target.closest('div').id - 1].title);
      annotation.append(closingButton.cloneNode(true));
      annotation.append(books[event.target.closest('div').id - 1].author);
      annotation.append(event.target.closest('div').querySelector('img').cloneNode(true));
      annotation.append(books[event.target.closest('div').id - 1].description);
      showMoreButtons.forEach((item) => {
        item.setAttribute('disabled','');
      })
  }

/////3. For closing divs
  if (event.target.className === 'close') {
    event.target.closest('div').remove();
    showMoreButtons.forEach((item) => {
      item.removeAttribute('disabled');
    })

    if (event.target.closest('div').className === 'chosen'){
      sum--;
    }

    shoppingCart.textContent = "";
    shoppingCart.insertAdjacentHTML('beforeend', `<p>Chosen books &#128722;${sum}</p>`);
    if (sum == 0) {
      cartWindow.hidden = true;
    }
  }
});

//// Drag'n Drop
function makeElementsDroppable(items) {
  let dragged = null;
  
  cards.forEach((item) => {
    item.draggable = true;
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData("text/plain", event.target.textContent);
      event.dataTransfer.effectAllowed = "copy";
      dragged = event.target;
    });
  });
  
  const dropArea = shoppingCart;
  
  dropArea.addEventListener('dragover', (event) => {
    event.dataTransfer.dropEffect = "copy";
    dropArea.classList.add('dropping');
    event.preventDefault();
  }, false);
  
  dropArea.addEventListener('dragend', (event) => {
    dropArea.classList.remove('dropping');
  }, false);
  
  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('dropping');
    sum++;
    shoppingCart.textContent = "";
    shoppingCart.insertAdjacentHTML('beforeend', `<p>Chosen books &#128722;${sum}</p>`);
    const chosen = createNewElem(cartWindow,"div","chosen"," ");
    chosen.append(books[dragged.closest('.card').id - 1].title + " of " + books[dragged.closest('.card').id - 1].author + ", " + books[dragged.closest('.card').id - 1].price + "$");
    chosen.append(closingButton.cloneNode(true));
    cartWindow.prepend(chosen);
    cartWindow.hidden = false;
  });
}
