// Books will be stored in an array. Create an array library.
const library = [];

//get book container
const books = document.querySelector(".books");
const formTitle = document.getElementById("titleForm");
const formAuthor = document.getElementById("authorForm");
const formPages = document.getElementById("pagesForm");
const readCheck = document.getElementById("readCheck");

//Add a function to add a book to the library (array). Simple push should do the trick.
Book.prototype.addBook = function(){
    library.push(this);
    books.innerHTML = "";
    library.forEach(function(book, index){
        const newDiv = document.createElement("div");
        let newHTML = `<div class="text"><p id="titleP">${book.title}</p><p id="authorP">${book.author}</p><p id="pagesP">${book.pages} pages</p></div><div class="buttons"><button id="readToggle">Read</button><button id="deleteButton" data-buttonindex="${index}">Delete</button>`
        newDiv.classList.add("book");
        newDiv.innerHTML = newHTML;
        newDiv.setAttribute("data-index", index)
        newDiv.setAttribute("id", book.title);
        books.appendChild(newDiv);
    })
    const currentBooks = document.querySelectorAll(".book");
    const currentBooksArray = Array.from(currentBooks);
    currentBooksArray.forEach(function(book, index){
        const deleteButton = document.querySelector(`[data-buttonindex="${index}"]`);
        deleteButton.addEventListener("click", () => {
            const currentBook = document.querySelector(`[data-index="${index}"]`);
            books.removeChild(currentBook);
            library.splice(index, 1);
            console.log(library);
        })
    });
};

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
    const formBook = new Book(formTitle.value, formAuthor.value, formPages.value, readCheck.checked);
    formBook.addBook();
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    readCheck.checked = false;
});



//Create an object constructor function for a Book. This should include title, author, number of pages and if you have read the book yet.
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//TESTING AREA

/* const harrypotter = new Book("Harry Potter", "JK Rowling", 566, false);
harrypotter.addBook();

const lordoftherings = new Book("Lord of the Rings", "JRR Tolkien", 875, false);
lordoftherings.addBook();

const dailystoic = new Book("The Daily Stoic", "Ryan Holiday", 354, false);
dailystoic.addBook(); */

