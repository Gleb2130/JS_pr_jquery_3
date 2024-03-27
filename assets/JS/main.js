'use strict';
var books = [
    { id: 0, title: "Book 1", author: "Author 1", price: 5 },
    { id: 1, title: "Book 2", author: "Author 2", price: 3 },
];

function cleanHTML(){
    $("#book-list").remove();
    $("#main").append('<div id="book-list"></div>')
}

function delElement(books,id){
    var temp = [];
    var index = 0;
    for (var i in books){
        if (books[i].id == id){
            index = i;
            break;
        }
    }


    for (var i in books){
        if (i < index)
            temp[i] = books[i];
        else if (i > index)
            temp[i-1] = books[i];
    }
    return temp;
}

function showBook(book) {
    var newBook = $("#book-template").html();
    newBook = newBook.replace("{{title}}", book.title);
    newBook = newBook.replace("{{author}}", book.author);
    newBook = newBook.replace("{{price}}", book.price);
    newBook = newBook.replace("{{id}}", `btn_book${book.id}`);
    $('#book-list').append(newBook);
    $(`#btn_book${book.id}`).on('click', function () {
        window.books = delElement(window.books, book.id);
        cleanHTML();
        showAllBooks(window.books);
    });
}



function findBook(word,books){
    for(var book of books ){
        if (book.title.toLowerCase().includes(word.toLowerCase()) || book.author.toLowerCase().includes(word.toLowerCase())){
            showBook(book,books);
        }
    }
}

function showAllBooks(books){
    cleanHTML();
    console.log(books);

    for (let a = 0;a<books.length;a++){
        showBook(books[a],books);
    }
}


$('document').ready(function () {
    showAllBooks(books);

    $('#add-book-btn').on('click', function () {
        console.log("AddBook -> in progress");
        $('#modal').show();
    });

    $(".modal-content .close").click(function () {
        console.log('AddBook -> cancel');
        $("#modal").hide();
    });

    $("#modal").on('click', '#save-book-btn', function () {
        var book = { id: books.length, title: $('#title').val(), author: $('#author').val(), price: $('#price').val() };
        books.push(book);
        console.log('AddBook -> done');
        console.log(`Books list length: ${books.length}`);
        $("#modal").hide();
        showBook(book,books);
    });

    $("#find").on('click', function () {
        cleanHTML();
        console.log(`Find -> ${$("#search-books").val()}`);
        findBook($("#search-books").val(), books);
    });

    $("#refresh-book-btn").on('click', function () {
        cleanHTML(); 
        showAllBooks(books);
    });

});
    

