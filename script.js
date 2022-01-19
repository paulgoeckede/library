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
    library.push(this); //adds new Book to library array
    books.innerHTML = ""; //deletes current list
    library.forEach(function(book, index){ //for each book in the array creates a book div and adds it
        const newDiv = document.createElement("div");
        let newHTML = `<div class="text"><p id="titleP">${book.title}</p><p id="authorP">${book.author}</p><p id="pagesP">${book.pages} pages</p></div><div class="buttons"><button class="readToggle">Read</button><button class="deleteButton">Delete</button>`
        newDiv.classList.add("book");
        newDiv.innerHTML = newHTML;
        newDiv.setAttribute("data-index", index)
        newDiv.setAttribute("data-read", book.read);
        newDiv.setAttribute("id", book.title);
        books.appendChild(newDiv);
        if(!book.read){ //if book has not been read then change style
            newDiv.classList.add("notread");
        } else {
            newDiv.querySelector(".readToggle").innerHTML = "Not read";
        }
    })


    //Functionality of the remove button. All books are selected and then the event listener is added for each one
    const deleteButtons = document.querySelectorAll(".deleteButton");
    const deleteArray = Array.from(deleteButtons);
    deleteArray.forEach(function(button){
        button.addEventListener("click", () => {
            const book = button.parentElement.parentElement;
            book.remove();
            library.splice(book.getAttribute("data-index", 1));
            updateIndex();
        });
    });

    //Functonality of the Read Status button. If toggled, the book div should change to grean color, if untoggled it should change to red.
    const readButtons = document.querySelectorAll(".readToggle");
    const readArray = Array.from(readButtons);
    readArray.forEach(function(button){
        const book = button.parentElement.parentElement;
        button.addEventListener("click", () => {
            book.classList.toggle("notread");
            if(book.classList.contains("notread")){
                button.innerHTML = "Read";
                library[book.dataset.index].read = false;
            } else{
                button.innerHTML = "Not read";
                library[book.dataset.index].read = true;
            }
        });
    });
};

//This function is to make sure the data-index attribute is updated each time a book is removed from the list to keep track of each books position in the list
function updateIndex(){
    const currentBooks = document.querySelectorAll(".book");
    const currentBooksArray = Array.from(currentBooks);
    currentBooksArray.forEach(function(book, index){
        book.setAttribute("data-index", index);
    });
}

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

