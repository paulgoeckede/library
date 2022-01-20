//Books will be stored in this array
const library = [];

//get all relevant HTML elements
const books = document.querySelector(".books");
const formTitle = document.getElementById("titleForm");
const formAuthor = document.getElementById("authorForm");
const formPages = document.getElementById("pagesForm");
const readCheck = document.getElementById("readCheck");

//Object constructor function for book
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Basically "Master" function. Gets called when the "Add Book" Button is pressed. Creates a new entry in the books list with the input Title, Author, Pagesnumber and Read status. Also calls functions to add Button functionality for both buttons (Read and delete)
Book.prototype.addBook = function(){
    library.push(this); //adds new Book to library array
    books.innerHTML = ""; //deletes current list
    addBookDiv();
    activateRemoveButtons();
    activateReadButtons();
};

//Functionality for adding/displaying the new book in the library list on the page.
function addBookDiv(){
    library.forEach(function(book, index){ //for each book in the array creates a book div and adds it
        const newDiv = document.createElement("div");
        let newHTML = `<div class="text"><p id="titleP">${book.title}</p><p id="authorP">${book.author}</p><p id="pagesP">${book.pages} pages</p></div><div class="buttons"><button class="readToggle">Read</button><button class="deleteButton">Delete</button>`
        newDiv.classList.add("book"); //gives the book item the approriate styling
        newDiv.innerHTML = newHTML;
        newDiv.setAttribute("data-index", index)
        books.appendChild(newDiv);
        if(!book.read){ //if book has not been read then change style
            newDiv.classList.add("notread");
        } else {
            newDiv.querySelector(".readToggle").innerHTML = "Not read";
        }
    })
}

//Adds functionality to the remove button on each displayed book div
function activateRemoveButtons(){
    const deleteButtons = document.querySelectorAll(".deleteButton"); //Grabs all delete Buttons
    const deleteArray = Array.from(deleteButtons);
    deleteArray.forEach(function(button){ 
        button.addEventListener("click", () => { //For every book add EVL to remove the element form the DOM.
            const book = button.parentElement.parentElement;
            book.remove();
            library.splice(book.getAttribute("data-index"),1); //Removes the deleted book from the library array using the data-index (position in array)
            updateIndex(); //updates the data-indexes for each book so they correspond correctly to the library array whenever a book is deleted
            if(library.length=== 0){
                books.innerHTML = `<p id="placeholder">Add a book to start tracking your library!</p>`;
            }
        });
    });
}

//Adds functionality for the Read Toggle buttons displayed in each book div
function activateReadButtons(){
    const readButtons = document.querySelectorAll(".readToggle");
    const readArray = Array.from(readButtons);
    readArray.forEach(function(button){
        button.addEventListener("click", () => {
            const book = button.parentElement.parentElement;
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
}

//This function is to make sure the data-index attribute is updated each time a book is removed from the list to keep track of each books position in the list
function updateIndex(){
    const currentBooks = document.querySelectorAll(".book");
    const currentBooksArray = Array.from(currentBooks);
    currentBooksArray.forEach(function(book, index){
        book.setAttribute("data-index", index);
    });
}

//Functionality for "Add Book" button which creates a new Book in the library array and then calls the add Book function. Afterwards blanks the form
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {
    if(formTitle.value==="" || formAuthor.value === "" || formPages.value === ""){
        alert("Please enter all necessary information!");
    } else if(library.find(function(book){
        return formTitle.value === book.title && formAuthor.value === book.author;
    })){
        alert("This book is already in your library!");
    }else if(isNaN(formPages.value)){
        alert("Please enter a correct number of pages!");
    } else{
        const formBook = new Book(formTitle.value, formAuthor.value, formPages.value, readCheck.checked);
        formBook.addBook();
    }
    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    readCheck.checked = false;
});