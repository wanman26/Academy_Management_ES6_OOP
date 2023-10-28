class Person {
  constructor(category, fullName, address, code, email) {
    this.category = category;
    this.fullName = fullName;
    this.address = address;
    this.code = code;
    this.email = email;
  }
}
export class Student extends Person {
  constructor(fullName, address, code, email, math, physics, chemistry) {
    super(fullName, address, code, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }
  averageScore() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

export class Employee extends Person {
  constructor(fullName, address, code, email, workingDay, dailySalary) {
    super(fullName, address, code, email);
    this.workingDay = workingDay;
    this.dailySalary = dailySalary;
  }
  calcSalary() {
    return this.workingDay * this.dailySalary;
  }
}

export class Customer extends Person {
  constructor(fullName, address, code, email, companyName, invoice, rate) {
    super(fullName, address, code, email);
    this.companyName = companyName;
    this.invoice = invoice;
    this.rate = rate;
  }
}
