// function stores userid in cookie
export function setUserIDCookie(userID) {
    document.cookie = "userID=" + userID + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

// function gets userid from cookie
export function getUserIDFromCookie() {
    const name = "userID" + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}
export function setSearchTypeCookie(searchtype) {
    document.cookie = "searchType=" + searchtype + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}
export function getSearchtypeCookie() {
    const name = "searchType=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

export function setSearchbarCookie(searchbar){
    document.cookie = "searchbar=" + searchbar + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

export function getSearchbarCookie() {
    const name = "searchbar=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}
export function deleteSeearchCookies(){
    document.cookie =  "searchType" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =  "searchbar" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
export function setSearchCookies(){
    
deleteSeearchCookies(); 
setSearchTypeCookie(document.getElementById("searchType").value);
setSearchbarCookie(document.getElementById("searchInput").value);
    
}
  