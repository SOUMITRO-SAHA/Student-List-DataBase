console.log("Welcome...");
updateData();
// !!!!!!!!!!!!!!!!!!!!!!! [ Main Logic for The Application ] !!!!!!!!!!!!!!!!!!!!!!! //

// ######## If User adds any new list , added it to the localStorage #######
// ########## [ Save Button ] ################## //
// * [Working...]
function save() {
  console.log("Saving...");
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let fullName = firstName + " " + lastName;
  let grade = document.getElementById("grade").value;
  let division = document.getElementById("division").value;
  let dateOfBirth = document.querySelector(".dob").value;
  let gender = document.querySelector('input[name="optradio"]:checked').value;

  let data = localStorage.getItem("data");
  //   Condition for Adding the data to the table
  if (data == null) {
    console.log("Updating List for the First Time Addition...");
    dataArray = [];
  } else {
    dataArray = JSON.parse(data);
  }
  dataArray.push([fullName, grade, division, dateOfBirth, gender]);
  localStorage.setItem("data", JSON.stringify(dataArray));
  // console.log(dataArray);
  // Calling Refreshing the Input Box
  refresh();

  updateData();
}
// Refreshing the Input Box
function refresh() {
  firstName.value = "";
  lastName.value = "";
  // dateOfBirth.value = "";
}

// ###### [Updating the Table of the Home Page] ######### //
function updateData() {
  let data = localStorage.getItem("data");
  if (data == null) {
    // console.log("Updating List...");
    dataArray = [];
  } else {
    dataArray = JSON.parse(data);
  }
  // Add the Inputs into the Main Table
  let html = "";
  dataArray.forEach(function (element, index) {
    html += ` 
              <tr class="studentName">
                  <td scope="row">
                  <input type="checkbox" name="" id="checkbox" [(ngModel)]="rememberMe" class="form-check-input">
                  <span class= "numberIndicator">${index + 1}</span>
                  </td>
                  <td id="student-name">${element[0]}</td>
                  <td id="studentGrade">${element[1]}</td>
                  <td id="studentDivision">${element[2]}</td>
                  <td id="stDob">${element[3]}</td>
                  <td id="stGender">${element[4]}</td>
                  <td>
                      <div class="inline-button">
                      <i class="fa-solid fa-pencil editValues" onclick="edit(${index})"></i>
                      <i class="fa-solid fa-trash-can" onclick="deleted(${index})"></i>
                      </div>
                  </td>
              </tr>
            `;
  });
  let dataElement = document.getElementById("data");
  if (dataArray.length != 0) {
    dataElement.innerHTML = html;
  } else {
    dataElement.innerHTML = `
              <tr>
                  <th scope="row"><input type="checkbox" name="" id="checkbox" [(ngModel)]="rememberMe"
                          class="form-check-input">
                          <span class= "numberIndicator">1</span>
                  </th>
                  <td>Giacome 1213 [Demo]</td>
                  <td>5</td>
                  <td>A</td>
                  <td>23/10/2001</td>
                  <td>Male</td>
                  <td>
                      <div class="inline-button">
                          <i class="fa-solid fa-pencil" onclick="edit()"></i>
                          <i class="fa-solid fa-trash-can" onclick="deleted()"></i>
                      </div>
                  </td>
              </tr>
    `;
  }
  // [Updating the total Number of the Student on top] //
  let studentCount = dataArray.length;
  $("#totStudentNumber").html(studentCount);
}

// ########## [Delete Items Individually] ############# //
function deleted(itemIndex) {
  console.log("I am Deleted " + itemIndex);
  let data = localStorage.getItem("data");
  if (data == null) {
    console.log("Updating List for the First Time Addition...");
    dataArray = [];
  } else {
    dataArray = JSON.parse(data);
  }
  dataArray.splice(itemIndex, 1);
  localStorage.setItem("data", JSON.stringify(dataArray));
  updateData();
}

// ################ [Editing the Elements within the Table] ############# //
function edit() {
  $("tr.student-name").each(function () {
    var html = $(this).html();
    var input = $('<input type="text" />');
    input.val(html);
    $(this).html(input);
  });
  editStr();
  editedTextDisplay();
}
function editStr() {
  console.log("Edit is Called");

  let html = `
  <tr class="student-name">
  <th scope="row">
  <input type="checkbox" name="" id="checkbox" [(ngModel)]="rememberMe" class="form-check-input">
  </th>
  <td id="student-name">$("#student-name").val()</td>
  <td id="studentGrade">$("#studentGrade").val()</td>
  <td id="studentDivision">$("#studentDivision").val()</td>
  <td id="stDob">$("#stDob").val()</td>
  <td id="stGender">$("#stGender").val()</td>
  <td>
      <div class="inline-button">
      <i class="fa-solid fa-pencil editValues" onclick="edit()"></i>
      <i class="fa-solid fa-trash-can" onclick="deleted()"></i>
      </div>
  </td>
</tr>
  `;
  return html;
}
function editedTextDisplay(index) {
  console.log("Edit is Activated");
  let row = $(index).parent("tr");
  let cols = row.children("td");
  $("#student-name").val($(cols[1]).text());
  $("#studentGrade").val($(cols[2]).text());
  $("#studentDivision").val($(cols[3]).text());
  $("#stDob").val($(cols[4]).text());
  $("#stGender").val($(cols[5]).text());

  updateData();
}
// ************ [Main Table Section / Index.html ] ************************ //
// ###### [Search Box Section] ########### //
let search = document.getElementById("searchStudent");
search.addEventListener("input", () => {
  console.log("Search Working");
  let inputVal = search.value;
  console.log("Input event fired!", inputVal);
  let student = document.getElementsByClassName("studentName");
  Array.from(student).forEach(function (element) {
    // console.log(element);
    let sName = element.getElementsByTagName("td")[1].innerText;
    console.log("Student Name is " + sName);

    if (sName.toLocaleLowerCase() == inputVal.toLocaleLowerCase()) {
      console.log(sName);
      element.style.backgroundColor = "yellow";
    } else {
      element.style.backgroundColor = "none";
    }
  });
  if (inputVal == "") {
    window.location.reload();
  }
});

// *************** [ Popup.html Section ] ***************** //

// ########## ContextMenu Shows Up Section #############
const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");
const background = document.querySelector(".tableContainer");

// ############ [Function for Add / Edit Elements to the Table] ############### //
// * [Working...]
function add() {
  console.log("Add Items Working...");
  contextMenu.classList.add("visible");
  background.classList.add("blur");
}
// ########## [ Cancel Button ] ################## //
// * [Working...]
function cancel() {
  console.log("Cancel Working...");
  contextMenu.classList.remove("visible");
  background.classList.remove("blur");
}

//  ############## Delete All Button ########### //
// Function for Delete All
// * [Working...]
function clearStorage() {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    updateData();
  }
}

// ########## [ Tabs Switching ] ################ //
// * [Working...]
function switchTab(evt, tabName) {
  // Declare all variables
  var i, tabContent, tablinks;

  // Get all elements with class="tabContent" and hide them
  tabContent = document.getElementsByClassName("tab-contents");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// ########### [Add Activity Button] ############# //
function addActivityBtn() {
  console.log("Add Activity Working...");
  var container = document.getElementById("extra-curricular");
  var card = document.getElementById("card");
  let push = $("#card").clone();
  $("#activity-container").append(push);
}
