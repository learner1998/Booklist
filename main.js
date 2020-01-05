// jshint esversion:6


// Book class is respresenting a Book!
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class BookMethods{
    static displayBooks(){

        const books=Store.getBooks();
        books.forEach((book)=>BookMethods.addBookToList(book));
    }


    //function for adding a book to list
    static addBookToList(book){
        const list=document.querySelector("#book-list");
        const row=document.createElement("tr");
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-warning btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    
    //for delete a book entry.
    static delete(el){       
            if(el.classList.contains("delete")){
                el.parentElement.parentElement.remove();
                BookMethods.showAlert("book data has been deleted!","warning")
            }
    }
    static showAlert(message,alertcls){
        const div=document.createElement("div");
        div.className=`alert alert-${alertcls}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div,form);
        //dissaper in 3 seconds
        setTimeout(() => {
        document.querySelector(".alert").remove();            
        }, 3000);
    }

    //function for clearing fields after form submit.
    static clearFields(){                       
       document.querySelector("#title").value='';
       document.querySelector("#author").value='';
       document.querySelector("#isbn").value='';
    }
}
class Store{

   static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
          if(book.isbn===isbn){
              books.splice(index,1);
          }  
        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}
document.addEventListener("DOMContentLoaded",BookMethods.displayBooks());
document.querySelector("#book-form").addEventListener("submit",(e)=>{
    e.preventDefault();

//taking values from form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

//validating Form
if(title=="" || author==""|| isbn==""){
    BookMethods.showAlert("fill all the fields","warning");
}
else{
    const book = new Book(title, author, isbn);
    BookMethods.addBookToList(book);
     Store.addBook(book);
      
    BookMethods.showAlert("New Book data has been Added","success");
    BookMethods.clearFields();
}
});

document.querySelector("#book-list").addEventListener("click",(e)=>{
    BookMethods.delete(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});