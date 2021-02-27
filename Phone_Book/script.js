var lastId = 1;
var contactList = [];

var nameField = $('#nameField');
var phoneField = $('#phoneField');
var emailField = $('#emailField');
var genderField = $('#genderField');

function Contact(id, name, phone, email, gender, imgUrl) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    this.imgUrl = imgUrl;
}



window.onload = function () {

//    localStorage.clear();
    
    fetchContactsFromStorage();
    
    //Display All Contacts From Page , Given The List

}

function fetchContactsFromStorage() {
    //Get List from local storage
    //if it exists, init pagee
    //Also Update last Id, so that subsequent entries
    //Are valid
    //if not dont do a thing
    contactList = JSON.parse(localStorage.getItem("contacts"));
    console.log(contactList);
    if (contactList != null) {
        console.log("Found contacts in storage")

        lastId = contactList[contactList.length - 1].id + 1;
        displayAllContacts(contactList);
        console.log("LAST ID" + lastId);
    } else {
        console.log("No contacts in storage")
        contactList = [];
    }

}

function displayAllContacts(list) {

    var ulList = $('#allContacts');

    ulList.empty();

    for (var i = 0; i < list.length; i++) {

        var html = " <li id='" + list[i].id + "' class='contact' data-filtertext='" + list[i].name + "'><a href='#contactDetails' onclick='selectContact('"+list[i]+"')'><img class='contactAvatar' src='" + list[i].imgUrl + "' ><h2>" + list[i].name + "</h2></a> <a href='tel:"+list[i].phone+"' data-rel='popup' data-position-to='window' data-transition='pop'>Purchase album</a></li >";

        ulList.append(html).listview("refresh");
    }

}

function selectContact(contact){
    console.log(contact.id);
        var contactName = $("#contactName");
        var contactAvatar = $(".bigContactAvatar");

        contactName.text(contact.name);
        contactAvatar.src=contact.imgUrl;


}


function addContact() {


    //Get all fields, extract data frpm them 
    var name = nameField.val();
    var phone = phoneField.val();
    var email = emailField.val();
    var gender = genderField.val();
    var imgUrl = "";

    if (gender == "male") {
        imgUrl = "./assets/cyber.jpg";
    } else if (gender == "female") {
        imgUrl = "./assets/van.jpg";
    }

    var isFormValid = true;


    if (name == "") {
        $("#nameFieldErrArea").text("Name Is required");
        isFormValid = false;
    }else{
        $("#nameFieldErrArea").empty();
    }
    if (phone == "") {

        $("#phoneFieldErrArea").text("Phone Is required");
        isFormValid = false;
    } else if (!isPhoneValid(phone)) {
        $("#phoneFieldErrArea").text("Phone is not valid");
        isFormValid = false;
    }else{
        $("#phoneFieldErrArea").empty();
    }

    if (email == "") {
        $("#emailFieldErrArea").text("Email Is required");
        isFormValid = false;
    } else if (!isEmailValid(email)) {
        $("#emailFieldErrArea").text("Email Is not valid");
        isFormValid = false;
    }else{
        $("#emailFieldErrArea").empty();
    }

    if(!isFormValid){
        return;
    }





    //Contact Should take last avail ID
    var newContact = new Contact(lastId++, name, phone, email, gender, imgUrl);

    console.log("THE NE CONATCT" + newContact);
    //Add New contact to list
    contactList.push(newContact);
    //Save new List in Local Storage
    localStorage.setItem("contacts", JSON.stringify(contactList));
    //Refresh The HTML listview
    displayAllContacts(contactList);
    //Clear all inputs
    clearFormInputs();
    
    window.location.href = '#contactsPage';
}

function appendContactToListView(newContact) {


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



