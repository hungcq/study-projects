class Course {
  constructor(id, courseName, type, numberOfCredit, theory, exercise, lab, program, programValue, field1, field2) {
    this.id = id;
    this.courseName = courseName;
    this.type = type;
    this.numberOfCredit = numberOfCredit;
    this.theory = theory;
    this.exercise = exercise;
    this.lab = lab;
    this.program = program;
    this.programValue = programValue;
    this.field1 = field1;
    this.field2 = field2;
  }
}

export default Course;