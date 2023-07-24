// Applicant class - Represents an applicant with an applicant type (Science or Humanities) and scores in different subjects
class Applicant {
  constructor(applicantType, scores) {
    this.applicantType = applicantType; // Initialize the applicantType property with the provided applicant type (Science or Humanities)
    this.scores = scores; // Initialize the scores property with an array of subject scores
  }

  // Method to calculate the total score of an applicant
  getTotalScore() {
    return this.scores.reduce((sum, score) => sum + score, 0); // Calculate and return the sum of all subject scores
  }

  // Method to get the score of a specific subject by its index
  getSubjectScore(subjectIndex) {
    return this.scores[subjectIndex]; // Return the score of the subject at the specified index
  }

  // Method to check if the applicant is of a specific type (Science or Humanities)
  isApplicantOfType(type) {
    return this.applicantType === type; // Return true if the applicant's type matches the specified type, otherwise false
  }
}

// Exam class - Represents the entrance examination and applicants
class Exam {
  constructor() {
    this.applicants = []; // Initialize an empty array to store applicant objects
    this.subjects = ['English', 'Mathematics', 'Science', 'Japanese', 'Geography']; // Initialize the main list of subjects
    this.scienceApplicantSubjects = ['Mathematics', 'Science']; // Initialize the subjects required for Science applicants
    this.humanitiesApplicantSubjects = ['Japanese', 'Geography']; // Initialize the subjects required for Humanities applicants
  }

  // Method to add an applicant to the exam
  addApplicant(applicant) {
    this.applicants.push(applicant); // Add the provided applicant object to the list of applicants
  }

  // Helper function to check if a subject already exists in the list of subjects
  subjectExists(subjectList, subjectName) {
    return subjectList.includes(subjectName); // Return true if the subjectName is found in the subjectList, otherwise false
  }

  // Method to add a new subject to the list of subjects
  addSubject(subjectName) {
    if (this.subjectExists(this.subjects, subjectName)) {
      return `Subject '${subjectName}' already exists.`; // If the subject already exists, return a message indicating that it's already in the list
    }

    this.subjects.push(subjectName); // Add the new subject to the main list of subjects
    return `Subject '${subjectName}' has been added.`; // Return a message indicating that the subject has been added
  }

  // Method to delete an existing subject from the list of subjects
  deleteSubject(subjectName) {
    if (!this.subjectExists(this.subjects, subjectName)) {
      return `Subject '${subjectName}' does not exist.`; // If the subject doesn't exist, return a message indicating that it's not found
    }

    // Check if the subject to be deleted is in the scienceApplicantSubjects or humanitiesApplicantSubjects lists
    const isScienceSubject = this.scienceApplicantSubjects.includes(subjectName);
    const isHumanitiesSubject = this.humanitiesApplicantSubjects.includes(subjectName);

    // Remove the subject from the main subjects list
    this.subjects = this.subjects.filter(subject => subject !== subjectName);

    // If the subject is part of the scienceApplicantSubjects list, remove it from there as well
    if (isScienceSubject) {
      this.scienceApplicantSubjects = this.scienceApplicantSubjects.filter(subject => subject !== subjectName);
    }

    // If the subject is part of the humanitiesApplicantSubjects list, remove it from there as well
    if (isHumanitiesSubject) {
      this.humanitiesApplicantSubjects = this.humanitiesApplicantSubjects.filter(subject => subject !== subjectName);
    }

    return `Subject '${subjectName}' has been deleted.`; // Return a message indicating that the subject has been deleted
  }

  // Helper function to get the index of a subject from the subjects array
  getSubjectScoreIndex(subjectName) {
    return this.subjects.indexOf(subjectName); // Return the index of the subject in the main list of subjects
  }

  // Helper function to get the total score required for a particular applicant type
  getTotalRequiredScoreForApplicantType(applicantType) {
    // Determine the subjects required for the specified applicant type (Science or Humanities)
    const applicantSubjects = applicantType === 'science' ? this.scienceApplicantSubjects : this.humanitiesApplicantSubjects;

    // Calculate and return the total score required for the specified applicant type
    return applicantSubjects.reduce((sum, subject) => sum + this.getSubjectScoreIndex(subject) + 1, 0);
  }

  // Method to count the number of applicants who passed the two-stage selection
  countPassedApplicants(applicants, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
    // Filter the provided list of applicants to find only those who passed the selection criteria
    return applicants.filter(applicant => this.isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks)).length;
  }

  // Helper function to check if an applicant passes the selection
  isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
    const totalScore = applicant.getTotalScore(); // Get the total score of the applicant
    const isScience = applicant.isApplicantOfType('science'); // Check if the applicant is of Science type

    if (totalScore < passingScore) {
      return false; // If the total score is below the passing score, the applicant fails the selection
    }

    // Determine the passing marks required for the applicant type (Science or Humanities)
    const requiredPassingMarks = isScience ? sciencePassingMarks : humanitiesPassingMarks;

    // Get the subjects required for the applicant type (Science or Humanities)
    const applicantSubjects = isScience ? this.scienceApplicantSubjects : this.humanitiesApplicantSubjects;

    // Calculate the sum of subject scores for the required subjects
    const subjectPassingMarks = applicantSubjects.reduce((sum, subject) => sum + applicant.getSubjectScore(this.getSubjectScoreIndex(subject)), 0);

    // Check if the sum of subject scores meets the passing marks required
    return subjectPassingMarks >= requiredPassingMarks;
  }
}

// UI class - Handles user interface interactions
class UI {
  constructor() {
    this.exam = new Exam(); // Create an instance of the Exam class to manage exam data
    this.passingScore = 350; // Initialize the passing score required to pass the exam
    this.sciencePassingMarks = 160; // Initialize the passing marks required for Science applicants
    this.humanitiesPassingMarks = 160; // Initialize the passing marks required for Humanities applicants
  }

  // Method to display the passing score and passing marks on the webapp
  displayPassingScore() {
    // Set the content of HTML elements to display the current passing score and passing marks
    document.getElementById('currentPassingScore').textContent = this.passingScore;
    document.getElementById('sciencePassingMarksValue').textContent = this.sciencePassingMarks;
    document.getElementById('humanitiesPassingMarksValue').textContent = this.humanitiesPassingMarks;
  }

  // Method to update the passing score dynamically
  updatePassingScore() {
    // Get the new passing score entered by the user from the input field
    const newPassingScore = parseInt(document.getElementById('newPassingScore').value);

    // Validate the new passing score to ensure it's a valid number between 1 and 1000
    if (isNaN(newPassingScore) || newPassingScore < 1 || newPassingScore > 1000) {
      alert('Please enter a valid passing score between 1 and 1000.');
      return;
    }

    // Update the passing score with the new value
    this.passingScore = newPassingScore;

    // Update the displayed passing score on the webapp
    this.displayPassingScore();

    // Show an alert to confirm the passing score update
    alert(`Passing score has been updated to ${this.passingScore}.`);
  }

  // Method to update the passing marks for Science applicants
  updateSciencePassingMarks() {
    // Get the new passing marks for Science applicants entered by the user from the input field
    const newSciencePassingMarks = parseInt(document.getElementById('sciencePassingMarks').value);

    // Validate the new passing marks to ensure it's a valid number between 0 and 1000
    if (isNaN(newSciencePassingMarks) || newSciencePassingMarks < 0 || newSciencePassingMarks > 1000) {
      alert('Please enter a valid Science passing marks between 0 and 1000.');
      return;
    }

    // Update the passing marks for Science applicants with the new value
    this.sciencePassingMarks = newSciencePassingMarks;

    // Update the displayed Science passing marks on the webapp
    document.getElementById('sciencePassingMarksValue').textContent = this.sciencePassingMarks;

    // Show an alert to confirm the Science passing marks update
    alert(`Science passing marks have been updated to ${this.sciencePassingMarks}.`);
  }

  // Method to update the passing marks for Humanities applicants
  updateHumanitiesPassingMarks() {
    // Get the new passing marks for Humanities applicants entered by the user from the input field
    const newHumanitiesPassingMarks = parseInt(document.getElementById('humanitiesPassingMarks').value);

    // Validate the new passing marks to ensure it's a valid number between 0 and 1000
    if (isNaN(newHumanitiesPassingMarks) || newHumanitiesPassingMarks < 0 || newHumanitiesPassingMarks > 1000) {
      alert('Please enter a valid Humanities passing marks between 0 and 1000.');
      return;
    }

    // Update the passing marks for Humanities applicants with the new value
    this.humanitiesPassingMarks = newHumanitiesPassingMarks;

    // Update the displayed Humanities passing marks on the webapp
    document.getElementById('humanitiesPassingMarksValue').textContent = this.humanitiesPassingMarks;

    // Show an alert to confirm the Humanities passing marks update
    alert(`Humanities passing marks have been updated to ${this.humanitiesPassingMarks}.`);
  }

  // Method to create input fields for entering applicant data
  createApplicantFields() {
    // Get the number of applicants entered by the user from the input field
    const numberOfApplicantsInput = document.getElementById('numberOfApplicants');
    const numberOfApplicants = parseInt(numberOfApplicantsInput.value);

    // Validate the number of applicants to ensure it's a valid number between 1 and 1000
    if (isNaN(numberOfApplicants) || numberOfApplicants < 1 || numberOfApplicants > 1000) {
      alert('Number of applicants must be between 1 and 1000.');
      return;
    }

    // Get the container div for the applicant fields
    const applicantFieldsDiv = document.getElementById('applicantFields');
    applicantFieldsDiv.innerHTML = ''; // Clear any existing content in the container

    // Create input fields for each applicant
    for (let i = 1; i <= numberOfApplicants; i++) {
      // Create a fieldset element to group the applicant data
      const applicantFieldset = document.createElement('fieldset');
      applicantFieldset.innerHTML = `<legend>Applicant ${i} Scores:</legend>
      <label for="applicantType${i}">Applicant Type:</label>
      <select id="applicantType${i}" name="applicantType${i}">
        <option value="science">Science</option>
        <option value="humanities">Humanities</option>
      </select>
      <br>`;

      // Create input fields for subject scores for each applicant
      for (const subject of this.exam.subjects) {
        applicantFieldset.innerHTML += `
        <label for="${subject}${i}">${subject} Score:</label>
        <input type="number" id="${subject}${i}" name="${subject}${i}" value="0" required>
        <br>`;
      }

      // Add the fieldset to the container
      applicantFieldsDiv.appendChild(applicantFieldset);
    }

    // Show the calculate results button after creating applicant fields
    document.getElementById('calculateButton').style.display = 'block';
  }

  // Method to collect applicant data from the input fields
  collectApplicantData() {
    // Get the number of applicants entered by the user from the input field
    const numberOfApplicantsInput = document.getElementById('numberOfApplicants');
    const numberOfApplicants = parseInt(numberOfApplicantsInput.value);
    const applicants = []; // Initialize an empty array to store applicant objects

    // Validate the number of applicants to ensure it's a valid number between 1 and 1000
    if (isNaN(numberOfApplicants) || numberOfApplicants < 1 || numberOfApplicants > 1000) {
      alert('Number of applicants must be between 1 and 1000.');
      return applicants; // Return an empty array since the input is invalid
    }

    // Collect data for each applicant and create applicant objects
    for (let i = 1; i <= numberOfApplicants; i++) {
      const applicantType = document.getElementById(`applicantType${i}`).value; // Get the selected applicant type (Science or Humanities)
      const scores = []; // Initialize an empty array to store subject scores for the applicant

      // Collect subject scores for the applicant
      for (const subject of this.exam.subjects) {
        const subjectScore = parseInt(document.getElementById(`${subject}${i}`).value); // Get the subject score for the current applicant

        // Validate the subject score to ensure it's a valid number between 0 and 100
        if (!this.isValidScore(subjectScore)) {
          alert('Subject scores must be between 0 and 100.');
          return []; // Return an empty array since the input is invalid
        }

        scores.push(subjectScore); // Add the subject score to the array of subject scores
      }

      // Create an applicant object with the collected data and add it to the array of applicants
      const applicant = new Applicant(applicantType, scores);
      applicants.push(applicant);
    }

    return applicants; // Return the array of applicant objects
  }

  // Helper function to validate a subject score
  isValidScore(score) {
    return !isNaN(score) && score >= 0 && score <= 100; // Return true if the score is a valid number between 0 and 100, otherwise false
  }

  // Method to submit the applicant data and calculate the number of passed applicants
  submitForm() {
    const applicants = this.collectApplicantData(); // Collect the applicant data from the input fields
    // Calculate the number of applicants who passed the two-stage selection based on the passing score and passing marks
    const passedApplicantsCount = this.exam.countPassedApplicants(applicants, this.passingScore, this.sciencePassingMarks, this.humanitiesPassingMarks);
    document.getElementById('result').textContent = `Number of applicants who passed the two-stage selection: ${passedApplicantsCount}`; // Display the result on the webapp
  }

  // Method to add a new subject to the list of subjects
  addSubjectToList() {
    // Get the new subject name entered by the user from the input field
    const subjectNameInput = document.getElementById('subjectToAdd');
    const subjectName = subjectNameInput.value.trim();

    // Validate the subject name to ensure it's not empty
    if (subjectName === '') {
      alert('Please enter a valid subject name to add.');
      return;
    }

    // Get the message element to display the result of adding the subject
    const addSubjectMessage = document.getElementById('addSubjectMessage');

    // Call the addSubject method of the exam object to add the new subject and get the result message
    const message = this.exam.addSubject(subjectName);

    // Display the result message on the webapp
    addSubjectMessage.textContent = message;

    subjectNameInput.value = ''; // Clear the input field after adding the subject
    this.createApplicantFields(); // Recreate applicant fields to include the new subject in the input fields
  }

  // Method to delete an existing subject from the list of subjects
  deleteSubjectFromList() {
    // Get the subject name to be deleted entered by the user from the input field
    const subjectNameInput = document.getElementById('subjectToDelete');
    const subjectName = subjectNameInput.value.trim();

    // Validate the subject name to ensure it's not empty
    if (subjectName === '') {
      alert('Please enter a valid subject name to delete.');
      return;
    }

    // Get the message element to display the result of deleting the subject
    const deleteSubjectMessage = document.getElementById('deleteSubjectMessage');

    // Call the deleteSubject method of the exam object to delete the subject and get the result message
    const message = this.exam.deleteSubject(subjectName);

    // Display the result message on the webapp
    deleteSubjectMessage.textContent = message;

    subjectNameInput.value = ''; // Clear the input field after deleting the subject
    this.createApplicantFields(); // Recreate applicant fields to exclude the deleted subject from the input fields
  }
}

// Create an instance of the UI class to handle user interface interactions
const ui = new UI();

// Display the initial passing score and passing marks on the webapp
ui.displayPassingScore();

// Add event listeners to the buttons to trigger respective methods when clicked
document.getElementById('updatePassingScoreButton').addEventListener('click', ui.updatePassingScore.bind(ui));
document.getElementById('updateSciencePassingMarksButton').addEventListener('click', ui.updateSciencePassingMarks.bind(ui));
document.getElementById('updateHumanitiesPassingMarksButton').addEventListener('click', ui.updateHumanitiesPassingMarks.bind(ui));

document.getElementById('submitApplicantFieldsButton').addEventListener('click', ui.createApplicantFields.bind(ui));

document.getElementById('addSubjectButton').addEventListener('click', ui.addSubjectToList.bind(ui));
document.getElementById('deleteSubjectButton').addEventListener('click', ui.deleteSubjectFromList.bind(ui));

document.getElementById('calculateButton').addEventListener('click', ui.submitForm.bind(ui));

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", modifySelectedCheckboxes);
});
