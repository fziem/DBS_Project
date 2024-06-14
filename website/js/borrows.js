import { updateButtonVisibilityforHnB } from "./buttonupdate.js";
import { getUserIDFromCookie } from "./cookiefunctions.js";
const userID = getUserIDFromCookie();

import { getTitle } from "./apifunctions.js";
import { getAuthor } from "./apifunctions.js";

async function fetchBooks() {
  const response = await fetch(`http://localhost/api/borrow/fetch-all.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "UserID": userID })
  });
  const books = await response.json();
  return books;
}

async function addBooksToTable() {
  const books = await fetchBooks();
  
  const tableBody = document.querySelector('tbody');

  books.forEach(async (book) => {
    const title = await getTitle(book);
    const author = await getAuthor(book);

    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const dueDateCell = document.createElement('td');

    titleCell.textContent = title;
    authorCell.textContent = author;
    var BorrowDate = new Date(book.BorrowDate);
    var BorrowTime = parseInt(book.BorrowTime);
    var dueDate = new Date(BorrowDate.getTime());
    dueDate.setDate(dueDate.getDate() + BorrowTime);
    var formattedDueDate = dueDate.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    dueDateCell.textContent = formattedDueDate;

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(dueDateCell);

    tableBody.appendChild(row);
  });
}

updateButtonVisibilityforHnB();
addBooksToTable();
