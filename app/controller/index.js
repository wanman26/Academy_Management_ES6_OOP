import { Student, Employee, Customer } from "../model/person.js";

async function getListPeople() {
  const { data: academyList } = await axios.get(
    "https://6519a404818c4e98ac609bd3.mockapi.io/api/academy"
  );
  //   {data:[],status:...}
  //   console.log(academyList);
  let students = [];
  for (let person of academyList) {
    let category = person.category;
    // if (category == "student") {
    //   student.push(category);
    // } else {
    //   return;
    // }
    // console.log(category);
    if (category === "student") {
      //   console.log(category);
      students.push(person);
    }
  }
  console.log(students);
  for (let student of students) {
    let fullName = student.fullName;
    // console.log(fullName);
  }
}
getListPeople();

// FITLER CATERGORY
// STUDENTS
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
      table === `table_${category}` ? "block" : "none";
  }
}
//   if (category === "student") {
//   }
