Website link : https://tap-university-project.netlify.app

**Summary:**

This project works on three classes: "Applicant," "Exam," and "UI." These classes work together to manage an entrance examination for a university, where applicants are classified into two types: "Science" and "Humanities." Each applicant has scores in different subjects, and the system calculates the total score of each applicant and determines if they pass the selection based on passing scores and passing marks for their respective applicant types.

**Workflow:**

1. When the web page loads, an instance of the "UI" class is created to handle user interactions.

2. The initial passing score and category specific passing marks are displayed on the web page.

3. The user can update the passing score and category specific passing marks by entering new values and clicking on the "Update" buttons next to each value.

4. The user can enter the number of applicants they want to add and click the "Submit" button. This creates input fields for each applicant, where the user can enter the applicant type (Science or Humanities) and marks for each subject.

5. After filling out the applicant details, the user clicks the "Calculate Results" button, which triggers the calculation of the number of applicants who pass the two-stage selection process based on the passing score and passing marks. The result is displayed on the web page.

6. Additionally, the user can add new subjects or delete existing subjects. If they click the "Add Subject" button and enter the name of a new subject, it will be added to the list of subjects. If they click the "Delete Subject" button and enter the name of an existing subject, it will be removed from the list of subjects.

The code uses classes and methods to make it organized and easy to manage. Each class has a specific responsibility, and they work together to handle the entire entrance examination process and user interactions on the web page.
