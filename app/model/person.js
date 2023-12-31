class Person {
  constructor(id, category, fullName, address, code, email) {
    this.id = id;
    this.category = category;
    this.fullName = fullName;
    this.address = address;
    this.code = code;
    this.email = email;
  }
}
export class Student extends Person {
  constructor(
    id,
    category,
    fullName,
    address,
    code,
    email,
    math,
    physics,
    chemistry
  ) {
    super(id, category, fullName, address, code, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }
  averageScore() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

export class Employee extends Person {
  constructor(
    id,
    category,
    fullName,
    address,
    code,
    email,
    workingDay,
    dailySalary,
    rate
  ) {
    super(id, category, fullName, address, code, email, rate);
    this.workingDay = workingDay;
    this.dailySalary = dailySalary;
    this.rate = rate;
  }
  calcSalary() {
    return this.workingDay * this.dailySalary;
  }
}

export class Customer extends Person {
  constructor(
    id,
    category,
    fullName,
    address,
    code,
    email,
    companyName,
    invoice,
    rate
  ) {
    super(id, category, fullName, address, code, email);
    this.companyName = companyName;
    this.invoice = invoice;
    this.rate = rate;
  }
}
