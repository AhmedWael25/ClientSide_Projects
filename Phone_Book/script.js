var lastId = 1;
var contactList = [];

var nameField = $('#nameField');
var phoneField = $('#phoneField');
var emailField = $('#emailField');
var genderField = $('#genderField');


function Contact(id, name, phone, email, gender) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
}





window.onload = function () {

    contactList = fetchContactsFromStorage();
    
    //Display All Contacts From Page , Given The List
    displayAllContacts(contactList);

}
function fetchContactsFromStorage(){
    //Get List from local storage
    //if it exists, init pagee
    //Also Update last Id, so that subsequent entries
    //Are valid
    //if not dont do a thing
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    
    if (contacts !== null){
        lastId = contacts.length;
        return contacts;
    }
    else{
        return [];
    }

}

function displayAllContacts(list){
    
    
    
}

function initContacts() {


}


function addContact() {


    //Get all fields, extract data frpm them 
    var name = nameField.val();
    var phone = phoneField.val();
    var email = emailField.val();
    var gender = genderField.val();

    //Contact Should take last avail ID
    var newContact = new Contact(1, name, phone, email, gender);

    console.log(newContact);

    
    var s = JSON.stringify(newContact);
    
    console.log(s);

    clearFormInputs();
}

function cancelAdding() {
    clearFormInputs();
}



function clearFormInputs() {
    $('#nameField').val("");
    $('#phoneField').val("");
    $('#emailField').val("");
    $('#genderField').val("male").change();
}

//============== VALIDATIONS======================

function isPhoneValid(phone) {
    const regex = /^(01[1250][0-9]{8})$/;
    return regex.test(phone);
}

function isEmailValid(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function isNameValid(name) {

}
