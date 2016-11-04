
localStorage.addOrEdit = "add";
if (typeof localStorage.savedUsersData == "undefined") {
    var usersArray = [];
    localStorage.savedUsersData = JSON.stringify(usersArray); 
}

var formTable = {
    validateForm: function() {
        if ($("#uname").val() == "")
            alert("Please enter a Name.");
        else if ($("#uemail").val() == "")
            alert("Please enter an email");
        else if ($("#uage").val() == "")
            alert("Please enter age");
        else if ($("#ugender").val() == "")
            alert("Please select gender");
        else if (localStorage.addOrEdit == "add")
            this.addUser();
        else if (localStorage.addOrEdit == "edit")
            this.updateUser();
    },
    addUser: function() {
        console.warn("AddUser called");
        var tempObj = {};
        tempObj.uname = $("#uname").val();
        tempObj.uemail = $("#uemail").val();
        tempObj.uage = $("#uage").val();
        tempObj.ugender = $("#ugender").val();
        var usersArray = this.getUsers();
        usersArray.push(tempObj);
        this.setUsers(usersArray);

    },
    editUser: function(userId) {
        localStorage.addOrEdit = "edit";
        localStorage.currentEdited = userId;
        var usersArray = this.getUsers();
        var i = userId;
        $("#uname").val(usersArray[i].uname);
        $("#uemail").val(usersArray[i].uemail);
        $("#uage").val(usersArray[i].uage);
        $("#ugender").val(usersArray[i].ugender);
    },
    updateUser: function() {
        var usersArray = this.getUsers();
        var i = parseInt(localStorage.currentEdited);
        usersArray[i].uname = $("#uname").val();
        usersArray[i].uemail = $("#uemail").val();
        usersArray[i].uage = $("#uage").val();
        usersArray[i].ugender = $("#ugender").val();
        this.setUsers(usersArray);
        this.clearEdit();
        this.printUsers();
    },
    clearEdit: function() {
        localStorage.addOrEdit = "add";
        localStorage.currentEdited = "";
    },
    deleteUser: function(userId) {
        var usersArray = this.getUsers();
        usersArray.splice(userId, 1);
        this.setUsers(usersArray);
        this.printUsers();

    },
    setUsers: function(usersData) {
        console.warn("Set users called");
        localStorage.savedUsersData = JSON.stringify(usersData);
    },
    getUsers: function() {
        return JSON.parse(localStorage.savedUsersData);
    },
    printUsers: function() {
        var usersArray = this.getUsers();
        var userHtml = "";
        for (var i = 0; i < usersArray.length; i++) {
            userHtml += '<tr>';
            userHtml += '<td>' + usersArray[i].uname + '</td>';
            userHtml += '<td>' + usersArray[i].uemail + '</td>';
            userHtml += '<td>' + usersArray[i].uage + '</td>';
            userHtml += '<td>' + usersArray[i].ugender + '</td>';
            userHtml += '<td onclick="formTable.editUser(' + i + ')">Edit</td>';
            userHtml += '<td onclick="formTable.deleteUser(' + i + ')">Delete</td>';
            userHtml += '</tr>';
        }
        $("#usersList").html(userHtml);
    }
};


formTable.printUsers();
