import { getUserIDFromCookie } from "./cookiefunctions.js";
import { updateButtonVisibility } from "./buttonupdate.js";
import { getAuthor } from "./apifunctions.js";
import { getTitle } from "./apifunctions.js";
import { getISBN } from "./apifunctions.js";
import { getkeywords } from "./apifunctions.js";
import { getSearchtypeCookie } from "./cookiefunctions.js";
import { getSearchbarCookie } from "./cookiefunctions.js";

const userid = getUserIDFromCookie();

  async function getbooksbykeyword(searchbar) {
    const response = await fetch('http://localhost:/api/book/query-keyword.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Query": searchbar })
    })
    const books = await response.json();
    return books;
  }
  async function getbooksbyauthor(searchbar) {
    const response = await fetch('http://localhost:/api/book/query-author.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Query": searchbar })
    })
    const books = await response.json();
    return books;
  }
  async function getbooksbytitle(searchbar) {
    const response = await fetch('http://localhost:/api/book/query-books.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Query": searchbar })
    })
    const books = await response.json();
    return books;
  }
    async function addBooksToTable() {
      var books = null;
      switch(getSearchtypeCookie()) {
        case 'keywords' :
           books = await  getbooksbykeyword(getSearchbarCookie());
            break;
        case 'title' :
           books = await getbooksbytitle(getSearchbarCookie());
            break;
        case 'author' :
           books = await  getbooksbyauthor(getSearchbarCookie());
            break;
      }
      
      const tableBody = document.querySelector('tbody');
    
      books.forEach(async (book) => {
        
        const title = await getTitle(book);
        const author = await getAuthor(book);
        const ISBN = await getISBN(book);
        const keyword = await getkeywords(book);
        
    
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const keywordCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const ISBNCell = document.createElement('td');
        
        titleCell.textContent = title;
        keywordCell.textContent = keyword;
        authorCell.textContent = author;
        ISBNCell.textContent = ISBN;
        
        row.appendChild(titleCell);
        row.appendChild(keywordCell);
        row.appendChild(authorCell);
        row.appendChild(ISBNCell);
  
        if(userid){
          const holdbackCell = document.createElement('td');
          const holdbackButton = document.createElement('button');
            holdbackButton.textContent = 'Holdback';
            holdbackButton.addEventListener('click', async () => {
              const ckeckresponse = await fetch('http://localhost:/api/holdback/fetch.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "UserID": userid, "BookID": book.BookID })
              });
              const responseholder = await ckeckresponse;
              if(!(responseholder.headers.get("content-type") === 'application/json' && responseholder.headers.get("content-length") > 2)){
              const response = await fetch(`http://localhost:/api/holdback/add.php`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                      
                  },
                  body: JSON.stringify({ "UserID": userid,
                  "BookID": book.BookID })
              });
            }
            });
    
          holdbackCell.appendChild(holdbackButton);
          row.appendChild(holdbackCell);
          }
    
        tableBody.appendChild(row);
      });
    }
    updateButtonVisibility();
    addBooksToTable();