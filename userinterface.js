import Exam from './exam.js';

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

// Export the UI class
export default UI;
