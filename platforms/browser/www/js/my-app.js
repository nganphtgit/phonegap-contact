$(document).ready(function () {

    $(document).on('click', '#btnSearchName', function () {
        navigator.contacts.find(
            [navigator.contacts.fieldType.name],
            searchContacts,
            errorHandler);
    });

    function searchContacts(contact) {
        var name = $("#nameSearch").val();
        alert("Search Result of " + name);
        var i = 0;
        for (var i = 0; i < contact.length; i++) {
            if (contact[i].name.givenName == name) {
                var firstname = contact[i].name.givenName;
                var email = contact[i].emails[0].value;
                var phone = contact[i].phoneNumbers[0].value;
                var birthday = new Date(contact[i].birthday);
                pair = "<tr><th data-priority=\"1\"><center>Name</center></th><td><center>" + firstname + "</center></td></tr><tr><th data-priority=\"1\"><center>Email</center></th><td><center>" + email + "</center></td></tr><tr><th data-priority=\"1\"><center>Mobile No</center></th><td><center>" + phone + "</center></td></tr><tr><th data-priority=\"1\"><center>Birthday</center></th><td><center>" + birthday + "</center></td></tr><tr><td><a href='#' id='btnRemove' class='ui-shadow ui-btn ui-corner-all'>Remove Contact</a></td></tr>";
                $("#searchTable").html(pair);
            };
        }
    }
    $("#createContact").click(function () {

        var name = $("#dname").val();
        var mobile = $("#dmob").val();
        var omobile = $("#dothermob").val();
        var email = $("#demail").val();
        var bday = $("#dbday").val();

        var myContact = navigator.contacts.create(
            {
                "name": {
                    "givenName": name
                },
                "phoneNumbers": [
                    { "type": "mobile", "value": mobile, "id": 0, "pref": false },
                    { "type": "other", "value": omobile, "id": 1, "pref": false }
                ],
                "emails": [
                    { "type": "home", "value": email, "id": 0, "pref": false }
                ],
                "birthday": bday
            }
        );
        myContact.save();
        alert("The contact, " + myContact.name.givenName + ", has been created");
    });

    $(document).on('click', '#getContact', function () {
        navigator.contacts.find(
            [navigator.contacts.fieldType.name],
            gotContacts,
            errorHandler);
    });
    function errorHandler(e) {
        console.log("errorHandler: " + e);
    }

    function gotContacts(c) {
        console.log("gotContacts, number of results " + c.length);
        var pair = "<tr><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>Email</center></th><th><center>Mobile No</center></th></tr>";
        var i = 0;
        for (var i = 0, len = c.length; i < len; i++) {
            if (c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
                pair += "<tr><td><center>" + c[i].name.givenName + "</center></td><td><center>" + c[i].name.familyName + "</center></td><td><center>" + c[i].emails[0].value + "</center></td><td>" + c[i].phoneNumbers[1].value + "></td></tr>";
            }
        }
        alert(pair);
        $("#myTable").html(pair);
    }
});