// returns title of book
export async function getTitle(book) {
    const BookID = book.BookID;
    const response = await fetch(`http://localhost/api/book/get-book-by-id.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "BookID": BookID })
    });
    const title = await response.json();
    return title[0].Title;
  }
// returns ISBN of book
export async function getISBN(book) {
    const BookID = book.BookID;
    const response = await fetch(`http://localhost/api/book/get-book-by-id.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "BookID": BookID })
    });
    const responseholder = await response.json();
    const ISBN = responseholder[0].ISBN;
    return ISBN;
  }
// returns author of book
export async function getAuthor(book){
    const BookID = book.BookID;
    const response = await fetch(`http://localhost/api/book/get-book-by-id.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "BookID": BookID })
    });
    const responseholder = await response.json();
    const ISBN = responseholder[0].ISBN;
    const response1 = await fetch('http://localhost/api/author/get-author-by-isbn.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "ISBN": ISBN })
  });
  const authorid = await response1.json();
  const response2 = await fetch('http://localhost/api/author/get-author-by-id.php',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "AuthorID": authorid[0].AuthorID })
  });
  const authorName = await response2.json();
    return authorName[0].FirstName + " " + authorName[0].LastName;
  }
// returns keywords of book
export async function getkeywords(book){
    const BookID = book.BookID;
    const response = await fetch(`http://localhost/api/book/get-book-by-id.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "BookID": BookID })
    });
    const responseholder = await response.json();
    const ISBN = responseholder[0].ISBN;
    const response1 = await fetch('http://localhost/api/keyword/get-keyword-by-isbn.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "ISBN": ISBN })
  });
  const keywordid = await response1.json();
  const keywordPromises = keywordid.map(async (keyword) => {
    const response2 = await fetch('http://localhost/api/keyword/get-keyword-by-id.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "KeywordID": keyword.KeywordID })
    });
    const keywordName = await response2.json();
    return keywordName[0].KeywordName;
  });
  const keywords = await Promise.all(keywordPromises);
  return keywords;
  }