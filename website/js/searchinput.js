import { setSearchCookies } from "./cookiefunctions.js";

document.getElementById("searchForm").onsubmit = searchstuff;

function searchstuff(event) {
    event.preventDefault();
    setSearchCookies(); 
    window.location.href = 'http://localhost/search.html?';
}