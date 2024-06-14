function logoutbutton(){
    document.cookie =  "userID" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();
}
function borrowsbutton(){
window.location.href = 'http://localhost/borrows.html?';
}
function holdbackbutton(){  
    window.location.href = 'http://localhost/holdback.html?'; 
    }
function indexbutton(){    
    window.location.href = 'http://localhost/index.html?'; 
    }
function accountbutton(){
    window.location.href = 'http://localhost/user/index.php?';
}