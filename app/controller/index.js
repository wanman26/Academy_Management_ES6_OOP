import { Student, Employee, Customer } from "../model/person.js";

// FITLER CATERGORY
document
  .getElementById("student")
  .addEventListener("click", () => displayTable("student"));
document
  .getElementById("employee")
  .addEventListener("click", () => displayTable("employee"));
document
  .getElementById("customer")
  .addEventListener("click", () => displayTable("customer"));

function displayTable(category) {
  //   console.log(category);
  const tables = ["table_student", "table_employee", "table_customer"];
  for (const table of tables) {
    document.getElementById(table).style.display =
      table === `table_${category}` ? "table" : "none";
  }
  getListPeople(category);
  // console.log(category);
}

// CHANGE BUTTON
const buttons = document.querySelectorAll(".category_button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
function handleButtonClick(event) {
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
  event.target.classList.add("selected");
}
getListPeople(student);
async function getListPeople(data) {
  const { data: academyList } = await axios.get(
    "https://6519a404818c4e98ac609bd3.mockapi.io/api/academy"
  );
  //   {data:[],status:...}
  //   console.log(academyList);
  let students = [];
  let employees = [];
  let customers = [];
  for (let person of academyList) {
    let category = person.category;
    switch (category) {
      case "student":
        students.push(person);
        break;
      case "employee":
        employees.push(person);
        break;
      case "customer":
        customers.push(person);
        break;
    }
  }
  renderUIStudent(students);

  // console.log(students);
  // console.log(employees);
  // console.log(customers);

  if (data === "employee") {
    renderUIEmployee(employees);
  } else if (data === "customer") {
    renderUICustomer(customers);
  }
}

// RENDER UI
//? FOR STUDENT
function renderUIStudent(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    let person = data[i];
    const averageScore = (
      (person.math * 1 + person.physics * 1 + person.chemistry * 1) /
      3
    ).toFixed(2);
    content += `<tr>
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>${person.math}</td>
    <td>${person.physics}</td>
    <td>${person.chemistry}</td>
    <td><b>${averageScore}</b></td>
    <td><button type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn-warning p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-outline-danger p-1 pl-2 pr-2">
            <i class="fa-solid fa-x"></i>
        </button>
    </td>
</tr>`;
  }
  document.getElementById("tblDataStudents").innerHTML = content;
}
//? FOR EMPLOYEE
function renderUIEmployee(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    let person = data[i];
    const calcSalary = person.workingDay * person.dailySalary;
    content += `<tr>
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>$${person.workingDay}</td>
    <td>$${person.dailySalary}</td>
    <td><b>$${calcSalary}</b></td>
    <td><button type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn-warning p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-outline-danger p-1 pl-2 pr-2">
            <i class="fa-solid fa-x"></i>
        </button>
    </td>
</tr>`;
  }
  document.getElementById("tblDataEmployees").innerHTML = content;
}
//? FOR CUSTOMER
function renderUICustomer(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    let person = data[i];
    content += `<tr>
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>${person.companyName}</td>
    <td><b>$${person.invoice}</b></td>
    <td>${person.rate} <i style="color: rgb(255, 145, 0); font-size: 15px; font-weight: 600;"
    class="fa-solid fa-star"></i></td>
    <td><button type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn-warning p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button class="btn btn-outline-danger p-1 pl-2 pr-2">
            <i class="fa-solid fa-x"></i>
        </button>
    </td>
</tr>`;
  }
  document.getElementById("tblDataCustomers").innerHTML = content;
}
