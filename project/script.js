// Applicant class - Represents an applicant with an applicant type (Science or Humanities) and scores in different subjects
class Applicant {
  constructor(applicantType, scores) {
    this.applicantType = applicantType;
    this.scores = scores;
  }

  // Method to calculate the total score of an applicant
  getTotalScore() {
    return this.scores.reduce((sum, score) => sum + score, 0);
  }

  // Method to get the score of a specific subject by its index
  getSubjectScore(subjectIndex) {
    return this.scores[subjectIndex];
  }

  // Method to check if the applicant is of a specific type (Science or Humanities)
  isApplicantOfType(type) {
    return this.applicantType === type;
  }
}

// Exam class - Represents the entrance examination and applicants
class Exam {
  constructor() {
    this.applicants = [];
    this.subjects = ['English', 'Mathematics', 'Science', 'Japanese', 'Geography'];
    this.scienceApplicantSubjects = ['Mathematics', 'Science'];
    this.humanitiesApplicantSubjects = ['Japanese', 'Geography'];
  }

  // Method to add an applicant to the exam
  addApplicant(applicant) {
    this.applicants.push(applicant);
  }

  // Helper function to check if a subject already exists in the list of subjects
  subjectExists(subjectList, subjectName) {
    return subjectList.includes(subjectName);
  }

  // Updated addSubject method using the helper function
  addSubject(subjectName) {
    if (this.subjectExists(this.subjects, subjectName)) {
      return `Subject '${subjectName}' already exists.`;
    }

    this.subjects.push(subjectName);
    return `Subject '${subjectName}' has been added.`;
  }

  // Updated deleteSubject method using the helper function
  deleteSubject(subjectName) {
    if (!this.subjectExists(this.subjects, subjectName)) {
      return `Subject '${subjectName}' does not exist.`;
    }

    this.subjects = this.subjects.filter(subject => subject !== subjectName);
    return `Subject '${subjectName}' has been deleted.`;
  }

  // Helper function to get the index of a subject from the subjects array
  getSubjectScoreIndex(subjectName) {
    return this.subjects.indexOf(subjectName);
  }

  // Helper function to get the total score required for a particular applicant type
  getTotalRequiredScoreForApplicantType(applicantType) {
    const applicantSubjects = applicantType === 'science' ? this.scienceApplicantSubjects : this.humanitiesApplicantSubjects;
    return applicantSubjects.reduce((sum, subject) => sum + this.getSubjectScoreIndex(subject) + 1, 0);
  }

  // Updated getTotalRequiredScore method using the helper function
  getTotalRequiredScore(applicantType) {
    return this.getTotalRequiredScoreForApplicantType(applicantType);
  }

  // Helper function to check if an applicant passes the selection
  isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
    const totalScore = applicant.getTotalScore();
    const isScience = applicant.isApplicantOfType('science');

    if (totalScore < passingScore) {
      return false;
    }

    const requiredPassingMarks = isScience ? sciencePassingMarks : humanitiesPassingMarks;
    const applicantSubjects = isScience ? this.scienceApplicantSubjects : this.humanitiesApplicantSubjects;

    const subjectPassingMarks = applicantSubjects.reduce((sum, subject) => sum + applicant.getSubjectScore(this.getSubjectScoreIndex(subject)), 0);

    return subjectPassingMarks >= requiredPassingMarks;
  }

  // Method to count the number of applicants who passed the two-stage selection
  countPassedApplicants(applicants, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
    return applicants.filter(applicant => this.isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks)).length;
  }
}

// UI class - Handles user interface interactions
class UI {
  constructor() {
    this.exam = new Exam();
    this.passingScore = 350;
    this.sciencePassingMarks = 160;
    this.humanitiesPassingMarks = 160;
  }

  // Method to display the passing score and passing marks on the webapp
  displayPassingScore() {
    document.getElementById('currentPassingScore').textContent = this.passingScore;
    document.getElementById('sciencePassingMarksValue').textContent = this.sciencePassingMarks;
    document.getElementById('humanitiesPassingMarksValue').textContent = this.humanitiesPassingMarks;
  }

  // Method to update the passing score dynamically
  updatePassingScore() {
    const newPassingScore = parseInt(document.getElementById('newPassingScore').value);

    if (isNaN(newPassingScore) || newPassingScore < 1 || newPassingScore > 1000) {
      alert('Please enter a valid passing score between 1 and 1000.');
      return;
    }

    this.passingScore = newPassingScore;
    this.displayPassingScore();
    alert(`Passing score has been updated to ${this.passingScore}.`);
  }

  // Method to update the passing marks for Science applicants
  updateSciencePassingMarks() {
    const newSciencePassingMarks = parseInt(document.getElementById('sciencePassingMarks').value);

    if (isNaN(newSciencePassingMarks) || newSciencePassingMarks < 0 || newSciencePassingMarks > 1000) {
      alert('Please enter a valid Science passing marks between 0 and 1000.');
      return;
    }

    this.sciencePassingMarks = newSciencePassingMarks;
    document.getElementById('sciencePassingMarksValue').textContent = this.sciencePassingMarks;
    alert(`Science passing marks have been updated to ${this.sciencePassingMarks}.`);
  }

  // Method to update the passing marks for Humanities applicants
  updateHumanitiesPassingMarks() {
    const newHumanitiesPassingMarks = parseInt(document.getElementById('humanitiesPassingMarks').value);

    if (isNaN(newHumanitiesPassingMarks) || newHumanitiesPassingMarks < 0 || newHumanitiesPassingMarks > 1000) {
      alert('Please enter a valid Humanities passing marks between 0 and 1000.');
      return;
    }

    this.humanitiesPassingMarks = newHumanitiesPassingMarks;
    document.getElementById('humanitiesPassingMarksValue').textContent = this.humanitiesPassingMarks;
    alert(`Humanities passing marks have been updated to ${this.humanitiesPassingMarks}.`);
  }

  // Method to create input fields for entering applicant data
  createApplicantFields() {
    const numberOfApplicantsInput = document.getElementById('numberOfApplicants');
    const numberOfApplicants = parseInt(numberOfApplicantsInput.value);

    if (isNaN(numberOfApplicants) || numberOfApplicants < 1 || numberOfApplicants > 1000) {
      alert('Number of applicants must be between 1 and 1000.');
      return;
    }

    const applicantFieldsDiv = document.getElementById('applicantFields');
    applicantFieldsDiv.innerHTML = '';

    for (let i = 1; i <= numberOfApplicants; i++) {
      const applicantFieldset = document.createElement('fieldset');
      applicantFieldset.innerHTML = `<legend>Applicant ${i} Scores:</legend>
      <label for="applicantType${i}">Applicant Type:</label>
      <select id="applicantType${i}" name="applicantType${i}">
        <option value="science">Science</option>
        <option value="humanities">Humanities</option>
      </select>
      <br>`;

      for (const subject of this.exam.subjects) {
        applicantFieldset.innerHTML += `
        <label for="${subject}${i}">${subject} Score:</label>
        <input type="number" id="${subject}${i}" name="${subject}${i}" value="0" required>
        <br>`;
      }

      applicantFieldsDiv.appendChild(applicantFieldset);
    }

    // Show the calculate results button after creating applicant fields
    document.getElementById('calculateButton').style.display = 'block';
  }

  // Method to collect applicant data from the input fields
  collectApplicantData() {
    const numberOfApplicantsInput = document.getElementById('numberOfApplicants');
    const numberOfApplicants = parseInt(numberOfApplicantsInput.value);
    const applicants = [];

    if (isNaN(numberOfApplicants) || numberOfApplicants < 1 || numberOfApplicants > 1000) {
      alert('Number of applicants must be between 1 and 1000.');
      return applicants;
    }

    for (let i = 1; i <= numberOfApplicants; i++) {
      const applicantType = document.getElementById(`applicantType${i}`).value;
      const scores = [];

      for (const subject of this.exam.subjects) {
        const subjectScore = parseInt(document.getElementById(`${subject}${i}`).value);

        if (!this.isValidScore(subjectScore)) {
          alert('Subject scores must be between 0 and 100.');
          return [];
        }

        scores.push(subjectScore);
      }

      const applicant = new Applicant(applicantType, scores);
      applicants.push(applicant);
    }

    return applicants;
  }

  // Method to check if a score is valid (between 0 and 100)
  isValidScore(score) {
    return !isNaN(score) && score >= 0 && score <= 100;
  }

  // Method to submit the form and display the result on the UI
  submitForm() {
    const applicants = this.collectApplicantData();

    // Display the result on the UI
    const passedApplicantsCount = this.exam.countPassedApplicants(applicants, this.passingScore, this.sciencePassingMarks, this.humanitiesPassingMarks);
    document.getElementById('result').textContent = `Number of applicants who passed the two-stage selection: ${passedApplicantsCount}`;
  }

  // Helper function to check if an applicant passes the selection
  isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
    const totalScore = applicant.getTotalScore();
    const isScience = applicant.isApplicantOfType('science');

    if (totalScore < passingScore) {
      return false;
    }

    const requiredPassingMarks = isScience ? sciencePassingMarks : humanitiesPassingMarks;
    const applicantSubjects = isScience ? this.exam.scienceApplicantSubjects : this.exam.humanitiesApplicantSubjects;

    const subjectPassingMarks = applicantSubjects.reduce((sum, subject) => sum + applicant.getSubjectScore(this.exam.getSubjectScoreIndex(subject)), 0);

    return subjectPassingMarks >= requiredPassingMarks;
  }

  // Method to add a new subject to the list of subjects
  addSubjectToList() {
    const subjectNameInput = document.getElementById('subjectToAdd');
    const subjectName = subjectNameInput.value.trim();

    if (subjectName === '') {
      alert('Please enter a valid subject name to add.');
      return;
    }

    const addSubjectMessage = document.getElementById('addSubjectMessage');
    const message = this.exam.addSubject(subjectName);
    addSubjectMessage.textContent = message;

    // Clear the input field after adding the subject
    subjectNameInput.value = '';

    // Update the applicant fields with the new subject
    this.createApplicantFields();
  }

  // Method to delete an existing subject from the list of subjects
  deleteSubjectFromList() {
    const subjectNameInput = document.getElementById('subjectToDelete');
    const subjectName = subjectNameInput.value.trim();

    if (subjectName === '') {
      alert('Please enter a valid subject name to delete.');
      return;
    }

    const deleteSubjectMessage = document.getElementById('deleteSubjectMessage');
    const message = this.exam.deleteSubject(subjectName);
    deleteSubjectMessage.textContent = message;

    // Clear the input field after deleting the subject
    subjectNameInput.value = '';

    // Update the applicant fields without the deleted subject
    this.createApplicantFields();
  }
}

// Create an instance of the UI class
const ui = new UI();

// Display the passing score and passing marks on the webapp
ui.displayPassingScore();

// Event listeners for the "Update" buttons
document.getElementById('updatePassingScoreButton').addEventListener('click', ui.updatePassingScore.bind(ui));
document.getElementById('updateSciencePassingMarksButton').addEventListener('click', ui.updateSciencePassingMarks.bind(ui));
document.getElementById('updateHumanitiesPassingMarksButton').addEventListener('click', ui.updateHumanitiesPassingMarks.bind(ui));

// Event listener for the "Submit" button
document.getElementById('submitApplicantFieldsButton').addEventListener('click', ui.createApplicantFields.bind(ui));

// Event listeners for the "Add subject" and "Delete subject" buttons
document.getElementById('addSubjectButton').addEventListener('click', ui.addSubjectToList.bind(ui));
document.getElementById('deleteSubjectButton').addEventListener('click', ui.deleteSubjectFromList.bind(ui));

// Event listener for the "Calculate Results" button
document.getElementById('calculateButton').addEventListener('click', ui.submitForm.bind(ui));

// Event listener for the modifying applicant subjects
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", modifySelectedCheckboxes);
});
