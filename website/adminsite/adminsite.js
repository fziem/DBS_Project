//test von Borrow macht noch faxen und holdbackdelete existiert noch nicht 
async function getHoldbackID(userID, bookID) {
    const response = await fetch(`http://localhost/api/holdback/fetch.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "UserID": userID, "BookID": bookID })
    });
    const holdback = await response.json();
    return holdback.HoldBackID;
}
async function getBorrowID(userID, bookID) {
    const response = await fetch(`http://localhost/api/borrow/fetch.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "UserID": userID, "BookID": bookID })
    });
    const borrow = await response.json();
    return borrow.BorrowID;

}

document.getElementById("AddBorrow").onsubmit = addBorrow;
async function addBorrow(event) {
    event.preventDefault();

    var UserID = document.getElementById("AddBorrow").elements["UserID"].value;
    var BookID = document.getElementById("AddBorrow").elements["BookID"].value;

    const response = await fetch(`http://localhost/api/borrow/add.php`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "UserID": UserID, "BookID": BookID })
    });
    const responseholder = await response.json();
    if (responseholder.status == "200") {
        console.log("Borrow added");
    }
    else {
        console.log("Borrow not added");
    }

}

document.getElementById("DeleteBorrow").onsubmit = deleteBorrow;
async function deleteBorrow(event) {
    event.preventDefault();

    var UserID = document.getElementById("DeleteBorrow").elements["UserID"].value;
    var BookID = document.getElementById("DeleteBorrow").elements["BookID"].value;

    const response = await fetch(`http://localhost/api/borrow/pay-fine.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "BorrowID": await getBorrowID(UserID, BookID) })
    });
    const responseholder = await response.json();
}

document.getElementById("PickupHoldback").onsubmit = pickupHoldback;
async function pickupHoldback(event) {
    event.preventDefault();

    var UserID = document.getElementById("PickupHoldback").elements["UserID"].value;
    var BookID = document.getElementById("PickupHoldback").elements["BookID"].value;

    const response = await fetch(`http://localhost/api/holdback/pickup.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "HoldBackID": await getHoldbackID(UserID, BookID) })
    });
    const responseholder = await response.json();
}

document.getElementById("DisableUser").onsubmit = disableUser;
async function disableUser(event) {
    event.preventDefault();

    var UserID = document.getElementById("DisableUser").elements["UserID"].value;

    const response = await fetch(`http://localhost/api/admin/disable-user.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "UserID": UserID })
    });


}

document.getElementById("EnableUser").onsubmit = enableUser;
async function enableUser(event) {
    event.preventDefault();

    var UserID = document.getElementById("EnableUser").elements["UserID"].value;

    const response = await fetch(`http://localhost/api/admin/enable-user.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "UserID": UserID })
    });
}
document.getElementById("DisableBook").onsubmit = disableBook;
async function disableBook(event) {
    event.preventDefault();

    var BookID = document.getElementById("DisableBook").elements["BookID"].value;

    const response = await fetch(`http://localhost/api/admin/disable-book.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "BookID": BookID })
    });
}
document.getElementById("EnableBook").onsubmit = enableBook;
async function enableBook(event) {
    event.preventDefault();

    var BookID = document.getElementById("EnableBook").elements["BookID"].value;

    const response = await fetch(`http://localhost/api/admin/enable-book.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "BookID": BookID })
    });
}
// This is where the fun begins.

async function getPublisherID(publisher) {
    const response = await fetch(`http://localhost/api/publisher/query-publisher.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Query": publisher })
    });
    if (response.headers.get("content-type") === 'application/json') {
        const responsholder = await response.json();
        return responsholder[0].PublisherID;
    }
    else {
        const response2 = await fetch(`http://localhost/api/publisher/add-publisher.php`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "PublisherName": publisher })
        });
        if (await response2.status == 200) {
            return getPublisherID(publisher);
        }
    }
}
async function getKeywordID(keyword) {
    const response = await fetch(`http://localhost/api/keyword/query-keyword.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Query": keyword })
    });
    if (response.headers.get("content-type") === 'application/json') {
        const responsholder = await response.json();
        return responsholder[0].KeywordID;
    }
    else {
        const response2 = await fetch(`http://localhost/api/keyword/add-keyword.php`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "KeywordName": keyword, "KeywordDescription": keyword})
        });
        if (await response2.status == 200) {
            return getKeywordID(keyword);
        }
    }
}
async function addAuthorToBook(authorID, isbn) {
    const checkResponse = await fetch(`http://localhost/api/author/get-author-by-isbn.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "ISBN": isbn })
    });
    const checkResult = await checkResponse;
    if (!(checkResult.headers.get("content-type") === 'application/json' && checkResult.headers.get("content-length") > 2)) {
        const response = await fetch(`http://localhost/api/author/add-author-to-book.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ISBN": isbn, "AuthorID": authorID, "AuthorPrio": 1 })
        });
    }
}
async function addKeywordToBook(keywordID,isbn){
    const checkResponse = await fetch(`http://localhost/api/keyword/get-keyword-by-isbn.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "ISBN": isbn })
    });
    const checkResult = await checkResponse;
    if (!(checkResult.headers.get("content-type") === 'application/json' && checkResult.headers.get("content-length") > 2)) {
    const response = await fetch(`http://localhost/api/keyword/add-keyword-to-book.php`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "ISBN": isbn, "KeywordID": keywordID })
    });
}
}
async function getAuthorID(FirstName, LastName) {
    const response = await fetch(`http://localhost/api/author/query-author.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Query": LastName })
    });
    if (response.headers.get("content-type") === 'application/json') {
        const responsholder = await response.json();
        return responsholder[0].AuthorID;
    }
    else {
        const response2 = await fetch(`http://localhost/api/author/add-author.php`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "FirstName": FirstName, "LastName": LastName })
        });
        if (await response2.status == 200) {
            return getAuthorID(FirstName, LastName);
        }
    }
}
document.getElementById("AddBook").onsubmit = addBook;
async function addBook(event) {
    event.preventDefault();
    var Title = document.getElementById("AddBook").elements["Title"].value;
    var Publisher = document.getElementById("AddBook").elements["Publisher"].value;
    var ISBN = document.getElementById("AddBook").elements["ISBN"].value;
    var AuthorFirstname = document.getElementById("AddBook").elements["FirstName"].value;
    var AuthorLastname = document.getElementById("AddBook").elements["LastName"].value;
    var Keyword = document.getElementById("AddBook").elements["Keywords"].value;
    var year = document.getElementById("AddBook").elements["Year"].value;

    const response = await fetch(`http://localhost/api/book/add-book.php`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Title": Title, "PublisherID": await getPublisherID(Publisher), "ISBN": ISBN, "Year": year })
    });
    if (response.status == 200) {
        var AuthorID = await getAuthorID(AuthorFirstname, AuthorLastname);
        var KeywordID = await getKeywordID(Keyword);
    addAuthorToBook(AuthorID,ISBN);
    addKeywordToBook(KeywordID,ISBN);
    }

}