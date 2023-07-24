import UI from './userinterface.js'

// Create an instance of the UI class
const ui = new UI();

// Display the passing score and passing marks on the webapp
ui.displayPassingScore();

// Event listeners for the "Update" buttons
document.getElementById('updatePassingScoreButton').addEventListener('click', ui.updatePassingScore.bind(ui));
document.getElementById('updateSciencePassingMarksButton').addEventListener('click', ui.updateSciencePassingMarks.bind(ui));
document.getElementById('updateHumanitiesPassingMarksButton').addEventListener('click', ui.updateHumanitiesPassingMarks.bind(ui));

// Event listener for the "Submit" button
document.getElementById('submitApplicantFieldsButton').addEventListener('click', () => {
  ui.createApplicantFields();
});

// Event listeners for the "Add subject" and "Delete subject" buttons
document.getElementById('addSubjectButton').addEventListener('click', () => {
  ui.addSubjectToList();
});
document.getElementById('deleteSubjectButton').addEventListener('click', () => {
  ui.deleteSubjectFromList();
});

// Event listener for the "Calculate Results" button
document.getElementById('calculateButton').addEventListener('click', () => {
  ui.submitForm();
});

// Event listener for modifying applicant subjects
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", modifySelectedCheckboxes);
});
