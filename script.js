
///////// Given JSON file
const books = [{
    "author": "Douglas Crockford",
    "imageLink": "assets/images/Douglas-Crockford.jpg",
    "title": "JavaScript: The Good Parts: The Good Parts",
    "price": 30,
    "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
    },
    {
      "author": "David Herman",
      "imageLink": "assets/images/David-Herman.jpg",
      "title": "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript",
      "price": 22,
      "description": "Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples. You’ll learn how to choose the right programming style for each project, manage unanticipated problems, and work more successfully with every facet of JavaScript programming from data structures to concurrency"
    },
    {
      "author": "David Flanagan",
      "imageLink": "assets/images/David-Flanagan.jpg",
      "title": "JavaScript: The Definitive Guide",
      "price": 40,
      "description": "This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today's Web 2.0 applications. This book is both an example-driven programmer's guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript"
    },
    {
      "author": " Eric Elliott",
      "imageLink": "assets/images/Eric-Elliott.jpg",
      "title": "Programming JavaScript Applications",
      "price": 19,
      "description": "Take advantage of JavaScript’s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that’s easier—yes, easier—to work with as your code base grows."
    },
    {
      "author": "Addy Osmani",
      "imageLink": "assets/images/Addy-Osmani.jpg",
      "title": "Learning JavaScript Design Patterns",
      "price": 32,
      "description": "With Learning JavaScript Design Patterns, you’ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you."
    },
    {
      "author": "Boris Cherny",
      "imageLink": "assets/images/Boris-Cherny.jpg",
      "title": "Programming TypeScript",
      "price": 28,
      "description": "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That’s why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system."
    },
    {
      "author": "Alex Banks, Eve Porcello",
      "imageLink": "assets/images/Alex-Banks_Eve-Porcello.jpg",
      "title": "Learning React, 2nd Edition",
      "price": 25,
      "description": "If you want to learn how to build efficient React applications, this is your book. Ideal for web developers and software engineers who understand how JavaScript, CSS, and HTML work in the browser, this updated edition provides best practices and patterns for writing modern React code. No prior knowledge of React or functional JavaScript is necessary."
    },
    {
      "author": "Bradley Meck Alex Young and Mike Cantelon",
      "imageLink": "assets/images/Bradley-Meck_Alex-Young_Mike-Cantelon.jpg",
      "title": "Node.js in Action",
      "price": 38,
      "description": "Node.js in Action, Second Edition is a thoroughly revised book based on the best-selling first edition. It starts at square one and guides you through all the features, techniques, and concepts you'll need to build production-quality Node applications."
    },
    {
      "author": "Kyle Simpson",
      "imageLink": "assets/images/Kyle-Simpson.jpg",
      "title": "You Don't Know JS Yet: Get Started",
      "price": 26,
      "description": "It seems like there's never been as much widespread desire before for a better way to deeply learn the fundamentals of JavaScript. But with a million blogs, books, and videos out there, just where do you START? Look no further!"
    },
    {
      "author": "John Resig and Bear Bibeault",
      "imageLink": "assets/images/John-Resig_Bear-Bibeault.jpg",
      "title": "Secrets of the JavaScript Ninja",
      "price": 33,
      "description": "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up."
    }
  ]

/////////Creating all the elements for layout
function newDiv(elemName, elemTag, classToAdd, textContent) {
    elemName = document.createElement(elemTag);
    elemName.classList.add(classToAdd);
    elemName.innerHTML = textContent;
    main.append(elemName);
}

let main = document.querySelector('main');

let heading = newDiv("heading","div","heading","<h1>Welcome to our Book shop!</h1>");

let shoppingCart = newDiv("shoppingCart","div","shopCart","<p>Chosen books &#128722;0</p>");
shoppingCart = document.querySelector('.shopCart');

let cartWindow = newDiv("cartWindow","div","cartWindow"," ");
cartWindow = document.querySelector('.cartWindow');
cartWindow.hidden = true;

let confOrder = newDiv("confOrder","a","confOrder","Confirm order");
confOrder = document.querySelector('.confOrder');
confOrder.setAttribute("href","delivery_form.html");
cartWindow.append(confOrder);

let subheading = newDiv("subheading","div","subheading","<h2>Here you can find everything you need about <span>JavaScript</span></h2>");

let catalog = newDiv("catalog","div","catalog"," ");
catalog = document.querySelector('.catalog');

let addingButton = newDiv("addingButton","button","add","Add to Cart");
  addingButton = document.querySelector('.add');
let showMoreButton = newDiv("showMoreButton","button","show","Show more");
  showMoreButton = document.querySelector('.show');

let arrOfCards = [];

for (let i = 0; i < books.length; i++) {
  let card = newDiv("card","div","card","<div>");
}
let cards = document.querySelectorAll('.card');
let i = 0;
for (let card of cards) {
    card.append('"', books[i].title, '"', " of ", books[i].author);
    card.append(showMoreButton.cloneNode(true), "Price: ", books[i].price, "$", addingButton.cloneNode(true));
    card.setAttribute('id', i + 1);
    catalog.append(card);
    i++;
}
let showButtons = document.querySelectorAll('.show');

let imageBoxes = document.querySelectorAll('.card div');
for (let bookImg of imageBoxes) {
  let img1 = document.createElement("img");
  bookImg.append(img1);
}

let images = document.querySelectorAll('img');
let j = 0;
for (let image of images) {
  image.src = books[j].imageLink;
  j++;
}

let closingButton = newDiv("closingButton","button","close","&times;");
  closingButton = document.querySelector('.close');

///////////////Using DOM events
let sum = 0;

document.addEventListener('click', function(event) {
/////1. For adding books to the shopping cart
  if (event.target.className === 'add') {
    sum++;
    shoppingCart.innerHTML = `<p>Chosen books &#128722;${sum}</p>`;
    let chosen = document.createElement("div");
        chosen.classList.add('chosen');
        chosen.append(books[event.target.closest('div').id - 1].title + " of " + books[event.target.closest('div').id - 1].author + ", " + books[event.target.closest('div').id - 1].price + "$");
        chosen.append(closingButton.cloneNode(true));
    cartWindow.prepend(chosen);
    cartWindow.hidden = false;
  }

/////2. For showing popup
  if (event.target.className === 'show') {
    let annotation = newDiv("annotation","div","annot",books[event.target.closest('div').id - 1].title);
      annotation = document.querySelector('.annot');
      annotation.append(closingButton.cloneNode(true));
      annotation.append(books[event.target.closest('div').id - 1].author);
      annotation.append(event.target.closest('div').querySelector('img').cloneNode(true));
      annotation.append(books[event.target.closest('div').id - 1].description);
      for (let showButton of showButtons) {
        showButton.setAttribute('disabled','');
      }
  }

/////3. For closing divs
  if (event.target.className === 'close') {
    event.target.closest('div').remove();
    for (let showButton of showButtons) {
      showButton.removeAttribute('disabled');
    }
    if (event.target.closest('div').className === 'chosen'){
      sum--;
    }
    shoppingCart.innerHTML = `<p>Chosen books &#128722;${sum}</p>`;
    if (sum == 0) {
      cartWindow.hidden = true;
    }
  }
});
