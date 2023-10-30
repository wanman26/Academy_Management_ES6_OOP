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
    renderUIEmployee(employees);
    renderUICustomer(customers);

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
    content += `<tr id="${person.id}">
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>${person.math}</td>
    <td>${person.physics}</td>
    <td>${person.chemistry}</td>
    <td><b>${averageScore}</b></td>
    <td><button id="editPerson_${person.id}" type="button" data-toggle="modal"
    data-target="#myModalEditStudent" class="btn-outline-dark p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="delPerson_${person.id}"  class="btn btn-outline-danger p-1 pl-2 pr-2">
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
    content += `<tr id="${person.id}">
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>$${person.workingDay}</td>
    <td>$${person.dailySalary}</td>
    <td><b>$${calcSalary}</b></td>
    <td><button id="editPerson_${person.id}" type="button" data-toggle="modal"
    data-target="#myModalEditEmployee" class="btn-outline-dark p-1 pl-2 pr-2 btn mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="delPerson_${person.id}"  class="btn btn-outline-danger p-1 pl-2 pr-2">
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
    content += `<tr id="${person.id}">
    <td>${person.fullName}</td>
    <td>${person.address}</td>
    <td>${person.code}</td>
    <td>${person.email}</td>
    <td>${person.companyName}</td>
    <td><b>$${person.invoice}</b></td>
    <td>${person.rate} <i style="color: rgb(255, 145, 0); font-size: 15px; font-weight: 600;"
    class="fa-solid fa-star"></i></td>
    <td><button id="editPerson_${person.id}" type="button" data-toggle="modal"
    data-target="#myModalEditCustomer" class="btn btn-outline-dark p-1 pl-2 pr-2  mr-3 "><i
                class="fa-solid fa-pencil"></i></button>
        <button id="delPerson_${person.id}"  class="btn btn-outline-danger p-1 pl-2 pr-2">
            <i class="fa-solid fa-x" ></i>
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
    let student_id = document.getElementById("student_id").value;
    let student_category = "student";
    let student_name = document.getElementById("student_name").value;
    let student_address = document.getElementById("student_address").value;
    let student_code = document.getElementById("student_code").value;
    let student_email = document.getElementById("student_email").value;
    let student_math = document.getElementById("student_math").value;
    let student_physics = document.getElementById("student_physics").value;
    let student_chemistry = document.getElementById("student_chemistry").value;
    // Create student object
    let student = new Student(
      student_id,
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
    let employee_id = document.getElementById("employee_id").value;
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
      employee_id,
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
    let customer_id = document.getElementById("customer_id").value;
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
      customer_id,
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

document.getElementById("tblBody").addEventListener("click", deletePerson);
async function deletePerson(event) {
  let idEdit = event.target.id;
  if (idEdit.startsWith("delPerson_")) {
    let id = idEdit.substring("delPerson_".length);
    try {
      let { data } = await api.deletePersonById(id);
      getListPeople();
    } catch (error) {
      console.log(error);
    }
  }
}
// EDIT STUDENT
document.getElementById("tblBody").addEventListener("click", editPerson);
async function editPerson(event) {
  // console.log(event.target.id);
  let idEdit = event.target.id;
  if (idEdit.startsWith("editPerson_")) {
    let id = idEdit.substring("editPerson_".length);
    // console.log(id);
    fillInfo(id);
  }
}

// FILL OLD INFORMATIONS INTO EDIT MODAL
async function fillInfo(id) {
  try {
    let { data } = await axios.get(
      `https://6519a404818c4e98ac609bd3.mockapi.io/api/academy/${id}`
    );
    // FILL INTO INPUT STUDENT
    document.getElementById("edit_student_id").value = data.id;
    document.getElementById("edit_student_name").value = data.fullName;
    document.getElementById("edit_student_address").value = data.address;
    document.getElementById("edit_student_code").value = data.code;
    document.getElementById("edit_student_email").value = data.email;
    document.getElementById("edit_student_math").value = data.math;
    document.getElementById("edit_student_physics").value = data.physics;
    document.getElementById("edit_student_chemistry").value = data.chemistry;
    document.getElementById("btnUpdateStudent").value = data.id;

    // FILL INTO INPUT EMPLOYEE
    document.getElementById("edit_employee_id").value = data.id;
    document.getElementById("edit_employee_name").value = data.fullName;
    document.getElementById("edit_employee_address").value = data.address;
    document.getElementById("edit_employee_code").value = data.code;
    document.getElementById("edit_employee_email").value = data.email;
    document.getElementById("edit_employee_working_day").value =
      data.workingDay;
    document.getElementById("edit_employee_daily_salary").value =
      data.dailySalary;
    document.getElementById("btnUpdateEmployee").value = data.id;

    // FILL INTO INPUT CUSTOMER
    document.getElementById("edit_customer_id").value = data.id;
    document.getElementById("edit_customer_name").value = data.fullName;
    document.getElementById("edit_customer_address").value = data.address;
    document.getElementById("edit_customer_code").value = data.code;
    document.getElementById("edit_customer_email").value = data.email;
    document.getElementById("edit_customer_company_name").value =
      data.companyName;
    document.getElementById("edit_customer_invoice").value = data.invoice;
    document.getElementById("edit_customer_rate").value = data.rate;
    document.getElementById("btnUpdateCustomer").value = data.id;
  } catch (error) {
    console.log(error);
  }
}

// UPDATE INFOR STUDENT
document
  .getElementById("btnUpdateStudent")
  .addEventListener("click", updateStudent);

async function updateStudent() {
  let id = document.getElementById("btnUpdateStudent").value;
  try {
    let student_id = id;
    let student_category = "student";
    let student_name = document.getElementById("edit_student_name").value;
    let student_address = document.getElementById("edit_student_address").value;
    let student_code = document.getElementById("edit_student_code").value;
    let student_email = document.getElementById("edit_student_email").value;
    let student_math = document.getElementById("edit_student_math").value;
    let student_physics = document.getElementById("edit_student_physics").value;
    let student_chemistry = document.getElementById(
      "edit_student_chemistry"
    ).value;

    let student = new Student(
      student_id,
      student_category,
      student_name,
      student_address,
      student_code,
      student_email,
      student_math,
      student_physics,
      student_chemistry
    );
    const { data } = await api.updatePersonById(student);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}

// UPDATE INFOR EMPLOYEE
document
  .getElementById("btnUpdateEmployee")
  .addEventListener("click", updateEmployee);

async function updateEmployee() {
  let id = document.getElementById("btnUpdateEmployee").value;
  try {
    let employee_id = id;
    let employee_category = "employee";
    let employee_name = document.getElementById("edit_employee_name").value;
    let employee_address = document.getElementById(
      "edit_employee_address"
    ).value;
    let employee_code = document.getElementById("edit_employee_code").value;
    let employee_email = document.getElementById("edit_employee_email").value;
    let employee_working_day = document.getElementById(
      "edit_employee_working_day"
    ).value;
    let employee_daily_salary = document.getElementById(
      "edit_employee_daily_salary"
    ).value;

    let employee = new Employee(
      employee_id,
      employee_category,
      employee_name,
      employee_address,
      employee_code,
      employee_email,
      employee_working_day,
      employee_daily_salary
    );
    const { data } = await api.updatePersonById(employee);
    console.log(data);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
// UPDATE INFOR CUSTOMER
document
  .getElementById("btnUpdateCustomer")
  .addEventListener("click", updateCustomer);

async function updateCustomer() {
  let id = document.getElementById("btnUpdateCustomer").value;
  try {
    let customer_id = id;
    let customer_category = "customer";
    let customer_name = document.getElementById("edit_customer_name").value;
    let customer_address = document.getElementById(
      "edit_customer_address"
    ).value;
    let customer_code = document.getElementById("edit_customer_code").value;
    let customer_email = document.getElementById("edit_customer_email").value;
    let customer_company_name = document.getElementById(
      "edit_customer_company_name"
    ).value;
    let customer_invoice = document.getElementById(
      "edit_customer_invoice"
    ).value;
    let customer_rate = document.getElementById("edit_customer_rate").value;

    let customer = new Customer(
      customer_id,
      customer_category,
      customer_name,
      customer_address,
      customer_code,
      customer_email,
      customer_company_name,
      customer_invoice,
      customer_rate
    );
    const { data } = await api.updatePersonById(customer);
    console.log(data);
    getListPeople();
  } catch (error) {
    console.log(error);
  }
}
