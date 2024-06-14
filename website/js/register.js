document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    var salt = 'somesalt';
    var iterations = 10000;
    var keyLength = 32;
    var email = document.getElementById("email_reg").value;
    var password = document.getElementById("password_reg").value;
    var FirstName = document.getElementById("firstName_reg").value;
    var LastName = document.getElementById("lastName_reg").value;
    var Phone = document.getElementById("phone_reg").value;
    var STR = document.getElementById("str_reg").value;
    var PLZ = document.getElementById("plz_reg").value;

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
          "Pass": hashedPassword,
          "FirstName": FirstName, 
          "LastName": LastName, 
          "Phone": Phone, 
          "STR": STR, 
          "PLZ": PLZ 
        };
        fetch('http://localhost/api/user/register.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(function(response) {
      if (response.ok) {
        console.log("Registration successful.");
      } else {
        console.log("Registration failed.");
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      
    });
  
      })
      .catch(error => {
        console.error('Error hashing password:', error);
      });
    });
  