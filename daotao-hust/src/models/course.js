class Course {
  constructor(id, courseName, type, numberOfCredit, theory, exercise, lab, program, programValue) {
    this.id = id;
    this.courseName = courseName;
    this.type = type;
    this.numberOfCredit = numberOfCredit;
    this.theory = theory;
    this.exercise = exercise;
    this.lab = lab;
    this.program = program;
    this.programValue = programValue;
  }
}

export default Course;