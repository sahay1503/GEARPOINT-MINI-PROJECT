function myfunc(event){
    event.preventDefault();
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var message = document.getElementById("message").value;

    localStorage.setItem('first_name',firstname);
    localStorage.setItem('last_name',lastname);
    localStorage.setItem('email_id',email);
    localStorage.setItem('mobile_number',number);
    localStorage.setItem('message',message);
    
}
