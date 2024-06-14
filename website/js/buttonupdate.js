import { getUserIDFromCookie } from "./cookiefunctions.js";
const userID = getUserIDFromCookie();


export function updateButtonVisibility() {
    let loginButton = document.getElementById('login');
    let accountbutton = document.getElementById('account');
    let logoutButton = document.getElementById('logout');
    let holdbackButton = document.getElementById('holdback');
    let borrowsButton = document.getElementById('borrows');
    let holdbackcolumn = document.getElementById('holdbackcolumn');
    
    if (userID) {
        // Wenn userID vorhanden ist, zeige Logout- und andere Buttons an
        loginButton.style.visibility = 'visible';
        loginButton.innerHTML = '<button onclick="logoutbutton()">Logout</button>';
        accountbutton.style.visibility = 'visible';
        holdbackButton.style.visibility = 'visible';
        borrowsButton.style.visibility = 'visible';
        holdbackcolumn.style.visibility = 'visible';
    } else {
        // Wenn keine userID vorhanden ist, zeige Login-Button an und verstecke andere
        loginButton.style.visibility = 'visible';
        loginButton.innerHTML = '<a href="login.html"><button>Login</button></a>';
        accountbutton.style.visibility = 'hidden';
        holdbackButton.style.visibility = 'hidden';
        borrowsButton.style.visibility = 'hidden';
        holdbackcolumn.style.visibility = 'hidden';
    }
}
export function updateButtonVisibilityforHnB() {
    let loginButton = document.getElementById('login');
    let accountbutton = document.getElementById('account');
    let logoutButton = document.getElementById('logout');
    let holdbackButton = document.getElementById('holdback');
    let borrowsButton = document.getElementById('borrows');
    
    
    if (userID) {
        // Wenn userID vorhanden ist, zeige Logout- und andere Buttons an
        loginButton.style.visibility = 'visible';
        loginButton.innerHTML = '<button onclick="logoutbutton()">Logout</button>';
        accountbutton.style.visibility = 'visible';
        holdbackButton.style.visibility = 'visible';
        borrowsButton.style.visibility = 'visible';
        
    } else {
        // Wenn keine userID vorhanden ist, zeige Login-Button an und verstecke andere
        loginButton.style.visibility = 'visible';
        loginButton.innerHTML = '<button onclick="logoutbutton()">Logout</button>';
        accountbutton.style.visibility = 'hidden';
        holdbackButton.style.visibility = 'hidden';
        borrowsButton.style.visibility = 'hidden';
        
    }
}