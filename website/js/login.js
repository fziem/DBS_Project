import {setUserIDCookie} from "./cookiefunctions.js";


document.getElementById("loginForm").onsubmit = login;
 function login(event){
  event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    var salt = 'somesalt';
    var iterations = 10000;
    var keyLength = 32;

    async function hashPasswordWithPBKDF2(password, salt, iterations, keyLength) {
      const passwordBuffer = new TextEncoder().encode(password);
      const saltBuffer = new TextEncoder().encode(salt);
    
      const key = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );
    
      const derivedKey = await window.crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBuffer,
          iterations: iterations,
          hash: 'SHA-256'
        },
        key,
        keyLength * 8
      );
    
      const keyArray = new Uint8Array(derivedKey);
      const hashedPassword = Array.from(keyArray)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    
      return hashedPassword;
    }
    
    hashPasswordWithPBKDF2(password, salt, iterations, keyLength)
      .then(hashedPassword => {
        var user = {
          "Email": email,
          "Pass": hashedPassword
        };
        fetch('http://localhost/api/user/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      .then(async function(response) {
        if(response.ok) {
          const data = await response.json();
          
          setUserIDCookie(data.UserID);
          
          window.location.href = 'http://localhost/index.html';
        } else {
          
        }
      })
      .catch(function(error) {
          console.error('Error:', error);
          
        });
      })
      .catch(error => {
        console.error('Error hashing password:', error);
      });
}