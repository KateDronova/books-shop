
/////// Given JSON file
const books = [
    {
      "author": "Douglas Crockford",
      "imageLink": "./assets/images/Douglas-Crockford.jpg",
      "title": "JavaScript: The Good Parts",
      "price": 30,
      "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
    },
    {
      "author": "David Herman",
      "imageLink": "./assets/images/David-Herman.jpg",
      "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
      "price": 22,
      "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
    },
    {
      "author": "David Flanagan",
      "imageLink": "./assets/images/David-Flanagan.jpg",
      "title": "JavaScript: The Definitive Guide",
      "price": 40,
      "description": "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript"
    },
    {
      "author": " Eric Elliott",
      "imageLink": "./assets/images/Eric-Elliott.jpg",
      "title": "Programming JavaScript Applications",
      "price": 19,
      "description": "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows."
    },
    {
      "author": "Addy Osmani",
      "imageLink": "./assets/images/Addy-Osmani.jpg",
      "title": "Learning JavaScript Design Patterns",
      "price": 32,
      "description": "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
    },
    {
      "author": "Boris Cherny",
      "imageLink": "./assets/images/Boris-Cherny.jpg",
      "title": "Programming TypeScript",
      "price": 28,
      "description": "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system."
    },
    {
      "author": "Alex Banks, Eve Porcello",
      "imageLink": "./assets/images/Alex-Banks_Eve-Porcello.jpg",
      "title": "Learning React, 2nd Edition",
      "price": 25,
      "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary."
    },
    {
      "author": "Bradley Meck Alex Young and Mike Cantelon",
      "imageLink": "./assets/images/Bradley-Meck_Alex-Young_Mike-Cantelon.jpg",
      "title": "Node.js in Action",
      "price": 38,
      "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
    },
    {
      "author": "Kyle Simpson",
      "imageLink": "./assets/images/Kyle-Simpson.jpg",
      "title": "You Don't Know JS Yet: Get Started",
      "price": 26,
      "description": "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!"
    },
    {
      "author": "John Resig and Bear Bibeault",
      "imageLink": "./assets/images/John-Resig_Bear-Bibeault.jpg",
      "title": "Secrets of the JavaScript Ninja",
      "price": 33,
      "description": "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up."
    }
]

// /////////Accessing to JSON
// const books = [];
// fetch('./assets/books.json') //path to the file with json data
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         books.push(...data);
//     });

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
books.forEach(() => {
  cards.push(createNewElem(catalog,"div","card","<div>"));
})

const addingButton = createNewElem(main,"button","add","Add to Cart");
const showMoreButton = createNewElem(main,"button","show","Show more");

let i = 0;
function addContent(item) {
  item.append('"', books[i].title, '"', " of ", books[i].author);
  item.append(showMoreButton.cloneNode(true), "Price: ", books[i].price, "$", addingButton.cloneNode(true));
  item.setAttribute('id', i + 1);
  i++;
}
const showMoreButtons = document.querySelectorAll('.show');

cards.forEach((item) => {
    addContent(item);
});

const imageBoxes = document.querySelectorAll('.card div');
imageBoxes.forEach((item) => {
  const img1 = document.createElement("img");
  item.append(img1);
});

const images = document.querySelectorAll('img');
let j = 0;
images.forEach((item) => {
  item.src = books[j].imageLink;
  j++;
});

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

