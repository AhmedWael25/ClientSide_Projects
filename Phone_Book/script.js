var lastId = 0;
var contactList = [];

var nameField = $('#nameField');
var phoneField = $('#phoneField');
var emailField = $('#emailField');
var genderField = $('#genderField');

var currentContactID;


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

        if (contactList.length === 0) {
            lastId = 0;
        } else {
            lastId = contactList[contactList.length - 1].id + 1;
            displayAllContacts(contactList);
            console.log("LAST ID " + lastId);
        }

    } else {
        console.log("No contacts in storage")
        contactList = [];
    }

}

function displayAllContacts(list) {

    var ulList = $('#allContacts');

    ulList.empty();

    for (var i = 0; i < list.length; i++) {

        var html = " <li id='" + list[i].id + "' class='contact' data-filtertext='" + list[i].name + "' ><a onclick='selectContact()' href='#contactDetails' ><img class='contactAvatar' src='" + list[i].imgUrl + "' ><h2>" + list[i].name + "</h2></a> <a href='tel:" + list[i].phone + "' data-rel='popup' data-position-to='window' data-transition='pop'>Purchase album</a></li >";

        //        console.log("+++++++++ IDssssssssss " + list[i].id);
        //        console.log("+++++++++ index " + i);
        ulList.append(html).listview("refresh");
    }

}

function selectContact() {



    var contactName = $("#contactName");
    var contactAvatar = $("#contactImage");
    var deleteButton = $("#deleteContactPopup");
    var updateButton = $("#updateContactAnchor");
    var callButton = $("#callContactAnchor");
    
    
    if(event.target.tagName.toLowerCase() === 'h2'){
        console.log("h2");
        currentContactID = event.target.parentElement.parentElement.id;
    }else if(event.target.tagName.toLowerCase() === 'img'){
        currentContactID = event.target.parentElement.parentElement.id;
    }else{
        
        currentContactID = event.target.parentElement.id;
    }



    console.log(currentContactID);


    var contact = getContactByID(currentContactID);
    contactName.text(contact.name);
    contactAvatar.attr("src", contact.imgUrl);

}

function getContactByID(ID) {
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].id == ID) {

            return contactList[i];
        }
    }
}

//         --------Handling Clicks----------


$('#deleteButton').on("click", function () {

    console.log("delete was cliked **********************************");

    console.log("deleting element " + currentContactID);

    //TODO REFACTOR
    console.log("asaas" + currentContactID);

    delEmployeeById(currentContactID);

    localStorage.setItem("contacts", JSON.stringify(contactList));

    ///TODO REFACTOR
    contactList = JSON.parse(localStorage.getItem("contacts"));

    displayAllContacts(contactList);
    $.mobile.navigate("#contactsPage");

});


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
        } else {
            $("#nameFieldErrArea").empty();
        }
        if (phone == "") {
    
            $("#phoneFieldErrArea").text("Phone Is required");
            isFormValid = false;
        } else if (!isPhoneValid(phone)) {
            $("#phoneFieldErrArea").text("Phone is not valid");
            isFormValid = false;
        } else {
            $("#phoneFieldErrArea").empty();
        }
    
        if (email == "") {
            $("#emailFieldErrArea").text("Email Is required");
            isFormValid = false;
        } else if (!isEmailValid(email)) {
            $("#emailFieldErrArea").text("Email Is not valid");
            isFormValid = false;
        } else {
            $("#emailFieldErrArea").empty();
        }
    
        if (!isFormValid) {
            return;
        }


    //Contact Should take last avail ID
    var newContact = new Contact(lastId, name, phone, email, gender, imgUrl);
    lastId++;
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

function delEmployeeById(id) {


    for (var i = 0; i < contactList.length; i++) {

        if (contactList[i].id == id) {
            contactList.splice(i, 1)
        }
    }

}
