const library = [];

function addBook(book){
    library.push(book);
}

//Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, false);

console.log(library);