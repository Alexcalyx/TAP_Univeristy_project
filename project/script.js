// Subject class - Represents a subject with a name
class Subject {
    constructor(name) {
      this.name = name;
    }
}

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
  
    // Method to check if the applicant is of type Science
    isScienceApplicant() {
      return this.applicantType === 'science';
    }
  
    // Method to check if the applicant is of type Humanities
    isHumanitiesApplicant() {
      return this.applicantType === 'humanities';
    }
}

// Exam class - Represents the entrance examination and applicants
class Exam {
    constructor() {
      this.applicants = [];
      this.subjects = ['English', 'Mathematics', 'Science', 'Japanese', 'Geography'];
      this.scienceApplicantSubjects = ['English', 'Mathematics', 'Science'];
      this.humanitiesApplicantSubjects = ['Japanese', 'Geography'];
    }
  
    // Method to add an applicant to the exam
    addApplicant(applicant) {
      this.applicants.push(applicant);
    }
  
    // Method to add a new subject to the list of subjects
    addSubject(subjectName) {
      // Check if subject already exists
      if (this.subjects.includes(subjectName)) {
        return `Subject '${subjectName}' already exists.`;
      }
  
      // Add the new subject
      this.subjects.push(subjectName);
      return `Subject '${subjectName}' has been added.`;
    }
  
    // Method to delete an existing subject from the list of subjects
    deleteSubject(subjectName) {
      // Check if the subject exists
      if (!this.subjects.includes(subjectName)) {
        return `Subject '${subjectName}' does not exist.`;
      }
  
      // Remove the subject from the list
      this.subjects = this.subjects.filter(subject => subject !== subjectName);
      return `Subject '${subjectName}' has been deleted.`;
    }
  
    // Method to get the total score required for a particular applicant type (Science or Humanities)
    getTotalRequiredScore(applicantType) {
      let requiredScore = 0;
      if (applicantType === 'science') {
        // Science applicant needs at least 160 in Mathematics and Science
        requiredScore = this.scienceApplicantSubjects.reduce((sum, subject) => sum + this.getSubjectScoreIndex(subject) + 1, 0);
      } else if (applicantType === 'humanities') {
        // Humanities applicant needs at least 160 in Japanese and Geography
        requiredScore = this.humanitiesApplicantSubjects.reduce((sum, subject) => sum + this.getSubjectScoreIndex(subject) + 1, 0);
      }
      return requiredScore;
    }
  
    // Helper method to get the index of a subject from the subjects array
    getSubjectScoreIndex(subjectName) {
      return this.subjects.indexOf(subjectName);
    }
}

// Create an instance of the Exam class
const exam = new Exam();

// Initialize passing score, sciencePassingMarks, and humanitiesPassingMarks
let passingScore = 350;
let sciencePassingMarks = 160;
let humanitiesPassingMarks = 160;

// Function to display the passing score and passing marks on the webapp
function displayPassingScore() {
  const passingScoreElement = document.getElementById('currentPassingScore');
  passingScoreElement.textContent = passingScore;

  const sciencePassingMarksElement = document.getElementById('sciencePassingMarksValue');
  sciencePassingMarksElement.textContent = sciencePassingMarks;

  const humanitiesPassingMarksElement = document.getElementById('humanitiesPassingMarksValue');
  humanitiesPassingMarksElement.textContent = humanitiesPassingMarks;
}

// Function to update the passing score dynamically
function updatePassingScore() {
  const newPassingScore = parseInt(document.getElementById('newPassingScore').value);

  if (isNaN(newPassingScore) || newPassingScore < 1 || newPassingScore > 1000) {
    alert('Please enter a valid passing score between 1 and 1000.');
    return;
  }

  passingScore = newPassingScore;
  displayPassingScore();
  alert(`Passing score has been updated to ${passingScore}.`);

  // Recalculate the number of students who passed with the new passing score
  const applicants = collectApplicantData();
  const passedApplicantsCount = countPassedApplicants(applicants);
  const resultElement = document.getElementById('result');
  resultElement.textContent = `Number of applicants who passed the two-stage selection: ${passedApplicantsCount}`;
}

// Function to check if a score is valid (between 0 and 100)
function isValidScore(score) {
  return !isNaN(score) && score >= 0 && score <= 100;
}

// Function to create input fields for entering applicant data
function createApplicantFields() {
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

    for (const subject of exam.subjects) {
      applicantFieldset.innerHTML += `
      <label for="${subject}${i}">${subject} Score:</label>
      <input type="number" id="${subject}${i}" name="${subject}${i}" value="0" required>
      <br>`;
    }

    applicantFieldsDiv.appendChild(applicantFieldset);
  }

  // Show the calculate results button after creating applicant fields
  const calculateButton = document.getElementById('calculateButton');
  calculateButton.style.display = 'block';

  // Show the change passing score functionality after creating applicant fields
  const changePassingScoreDiv = document.querySelector('.change-passing-score');
  changePassingScoreDiv.style.display = 'block';
}

// Function to collect applicant data from the input fields
function collectApplicantData() {
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

    for (const subject of exam.subjects) {
      const subjectScore = parseInt(document.getElementById(`${subject}${i}`).value);

      if (!isValidScore(subjectScore)) {
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

// Function to count the number of applicants who passed the entrance exam
function countPassedApplicants(applicants) {
  return applicants.filter(applicant => applicant.getTotalScore() >= passingScore &&
    applicant.getTotalScore() >= exam.getTotalRequiredScore(applicant.applicantType)
  ).length;
}

// Function to submit the form and display the result on the UI
function submitForm() {
  const applicants = collectApplicantData();

  // Display the result on the UI
  const passedApplicantsCount = countPassedApplicants(applicants);
  const resultElement = document.getElementById('result');
  resultElement.textContent = `Number of applicants who passed the two-stage selection: ${passedApplicantsCount}`;
}

// Function to add a new subject to the list of subjects
function addSubjectToList() {
  const subjectNameInput = document.getElementById('subjectToAdd');
  const subjectName = subjectNameInput.value.trim();

  if (subjectName === '') {
    alert('Please enter a valid subject name to add.');
    return;
  }

  const addSubjectMessage = document.getElementById('addSubjectMessage');
  const message = exam.addSubject(subjectName);
  addSubjectMessage.textContent = message;

  // Clear the input field after adding the subject
  subjectNameInput.value = '';

  // Update the applicant fields with the new subject
  createApplicantFields();

  // Show the change passing score functionality after adding a subject
  const changePassingScoreDiv = document.querySelector('.change-passing-score');
  changePassingScoreDiv.style.display = 'block';
}

// Function to delete an existing subject from the list of subjects
function deleteSubjectFromList() {
  const subjectNameInput = document.getElementById('subjectToDelete');
  const subjectName = subjectNameInput.value.trim();

  if (subjectName === '') {
    alert('Please enter a valid subject name to delete.');
    return;
  }

  const deleteSubjectMessage = document.getElementById('deleteSubjectMessage');
  const message = exam.deleteSubject(subjectName);
  deleteSubjectMessage.textContent = message;

  // Clear the input field after deleting the subject
  subjectNameInput.value = '';

  // Update the applicant fields without the deleted subject
  createApplicantFields();

  // Show the change passing score functionality after deleting a subject
  const changePassingScoreDiv = document.querySelector('.change-passing-score');
  changePassingScoreDiv.style.display = 'block';
}

// Display the passing score and passing marks on the webapp
displayPassingScore();

// Event listeners for the "Add subject" and "Delete subject" buttons
document.getElementById('addSubjectButton').addEventListener('click', addSubjectToList);
document.getElementById('deleteSubjectButton').addEventListener('click', deleteSubjectFromList);

// Event listener for the "Calculate Results" button
document.getElementById('calculateButton').addEventListener('click', submitForm);
