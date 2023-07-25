**Documentation for the Code:**

**1. Applicant Class:**
- The `Applicant` class represents an applicant of the university entrance examination. It contains information about the applicant's type (Science or Humanities) and their scores in different subjects.
- Constructor: When an applicant object is created, it requires two pieces of information:
  - `applicantType`: The type of the applicant, which can be "Science" or "Humanities."
  - `scores`: An array that stores the scores of the applicant in different subjects.
- Method: The class has several methods to perform specific tasks:
  - `getTotalScore()`: Calculates and returns the total score of the applicant by adding all the subject scores together.
  - `getSubjectScore(subjectIndex)`: Retrieves the score of a specific subject based on its index in the subject scores array.
  - `isApplicantOfType(type)`: Checks if the applicant's type matches the provided type (Science or Humanities).

**2. Exam Class:**
- The `Exam` class represents the entrance examination and manages a list of applicants and subjects required for each applicant type.
- Constructor: When an `Exam` object is created, it initializes an empty array to store applicant objects and defines the main list of subjects, as well as the subjects required for Science and Humanities applicants.
- Methods: The class has several methods to perform various tasks related to the examination and applicants:
  - `addApplicant(applicant)`: Adds an applicant object to the list of applicants.
  - `subjectExists(subjectList, subjectName)`: A helper function to check if a subject already exists in the list of subjects.
  - `addSubject(subjectName)`: Adds a new subject to the main list of subjects, and returns a message indicating success or failure.
  - `deleteSubject(subjectName)`: Deletes an existing subject from the main list of subjects, and also removes it from the subject lists of Science and Humanities applicants.
  - `getSubjectScoreIndex(subjectName)`: A helper function to get the index of a subject from the subjects array.
  - `getTotalRequiredScoreForApplicantType(applicantType)`: A helper function to calculate the total score required for a particular applicant type (Science or Humanities).
  - `countPassedApplicants(applicants, passingScore, sciencePassingMarks, humanitiesPassingMarks)`: Counts the number of applicants who passed the two-stage selection based on the provided passing scores and passing marks.
  - `isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks)`: A helper function to check if an applicant passes the selection.

**3. UI Class:**
- The `UI` class handles user interface interactions for the entrance examination web application.
- Constructor: When a `UI` object is created, it initializes an `Exam` object and sets the initial passing score and passing marks required for Science and Humanities applicants.
- Methods: The class has several methods to handle various user interactions on the web app:
  - `displayPassingScore()`: Displays the current passing score and passing marks on the web app.
  - `updatePassingScore()`: Updates the passing score dynamically when the user clicks the "Update" button.
  - `updateSciencePassingMarks()`: Updates the passing marks required for Science applicants when the user clicks the "Update" button.
  - `updateHumanitiesPassingMarks()`: Updates the passing marks required for Humanities applicants when the user clicks the "Update" button.
  - `createApplicantFields()`: Creates input fields for entering applicant data based on the number of applicants specified by the user.
  - `collectApplicantData()`: Collects the applicant data entered by the user from the input fields and creates applicant objects.
  - `isValidScore(score)`: A helper function to validate a subject score, ensuring it's a valid number between 0 and 100.
  - `submitForm()`: Submits the applicant data and calculates the number of applicants who passed the two-stage selection based on the current passing scores and marks.
  - `addSubjectToList()`: Adds a new subject to the list of subjects and updates the input fields for applicant data accordingly.
  - `deleteSubjectFromList()`: Deletes an existing subject from the list of subjects and updates the input fields for applicant data accordingly.

**4. Event Listeners:**
- The code adds event listeners to several buttons in the web app to trigger the respective methods when clicked.
- For example, when the "Update Passing Score" button is clicked, the `updatePassingScore` method is called, which updates the passing score based on the value entered by the user.


