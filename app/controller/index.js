import { Student, Employee, Customer } from "../model/person.js";
const api = new CallApi();

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
  try {
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
    document.getElementById("quantityStudents").innerHTML = students.length;
    document.getElementById("quantityEmployees").innerHTML = employees.length;
    document.getElementById("quantityCustomers").innerHTML = customers.length;
  } catch (error) {
    console.log(error);
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
    <td><button id="editPerson_${person.code} type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn-outline-dark p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="${person.id}" class="btn btn-outline-danger p-1 pl-2 pr-2">
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
    <td><button id="editPerson_${person.code} type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn-outline-dark p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="${person.id}" class="btn btn-outline-danger p-1 pl-2 pr-2">
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
    <td><button id="editPerson_${person.code} type="button" data-toggle="modal"
    data-target="#myModalEdit" class="btn btn-outline-dark p-1 pl-2 pr-2  mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="${person.id}" class="btn btn-outline-danger p-1 pl-2 pr-2">
            <i class="fa-solid fa-x"></i>
        </button>
    </td>
</tr>`;
  }
  document.getElementById("tblDataCustomers").innerHTML = content;
}

// ADD STUDENT
document.getElementById("btnAddStudent").addEventListener("click", addStudent);
async function addStudent() {
  try {
    // Get info from input tag
    let student_category = "student";
    let student_name = document.getElementById("student_name").value;
    let student_address = document.getElementById("student_address").value;
    let student_code = document.getElementById("student_code").value;
    let student_email = document.getElementById("student_email").value;
    let student_math = document.getElementById("student_math").value;
    let student_physics = document.getElementById("student_physics").value;
    let student_chemistry =
      document.getElementById("student_chemistry").innerHTML;
    // Create student object
    let student = new Student(
      student_category,
      student_name,
      student_address,
      student_code,
      student_email,
      student_math,
      student_physics,
      student_chemistry
    );
    const { data } = await api.addPersonApi(student);
    console.log(data);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
// ADD EMPLOYEE
document
  .getElementById("btnAddEmployee")
  .addEventListener("click", addEmployee);
async function addEmployee() {
  try {
    // Get info from input tag
    let employee_category = "employee";
    let employee_name = document.getElementById("employee_name").value;
    let employee_address = document.getElementById("employee_address").value;
    let employee_code = document.getElementById("employee_code").value;
    let employee_email = document.getElementById("employee_email").value;
    let employee_working_day = document.getElementById(
      "employee_working_day"
    ).value;
    let employee_daily_salary = document.getElementById(
      "employee_daily_salary"
    ).value;
    // Create employee object
    let employee = new Employee(
      employee_category,
      employee_name,
      employee_address,
      employee_code,
      employee_email,
      employee_working_day,
      employee_daily_salary
    );
    const { data } = await api.addPersonApi(employee);
    console.log(data);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
// ADD CUSTOMER
document
  .getElementById("btnAddCustomer")
  .addEventListener("click", addCustomer);
async function addCustomer() {
  try {
    // Get info from input tag
    let customer_category = "customer";
    let customer_name = document.getElementById("customer_name").value;
    let customer_address = document.getElementById("customer_address").value;
    let customer_code = document.getElementById("customer_code").value;
    let customer_email = document.getElementById("customer_email").value;
    let customer_company_name = document.getElementById(
      "customer_company_name"
    ).value;
    let customer_invoice = document.getElementById("customer_invoice").value;
    let customer_rate = document.getElementById("customer_rate").value;
    // Create customer object
    let customer = new Customer(
      customer_category,
      customer_name,
      customer_address,
      customer_code,
      customer_email,
      customer_company_name,
      customer_invoice,
      customer_rate
    );
    const { data } = await api.addPersonApi(customer);
    console.log(data);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
// DELETE PERSON

async function deletePerson(event) {
  if (event.target.id === id) console.log(id);
  try {
    let { data: deleteByCode } = await api.deletePersonById(id);
    console.log(deleteByCode);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
