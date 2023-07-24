import Applicant from './applicant.js';

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
      const applicantSubjects = applicantType === 'science' ? this.scienceApplicantSubjects : this.humanitiesApplicantSubjects;
      return applicantSubjects.reduce((sum, subject) => sum + this.getSubjectScoreIndex(subject) + 1, 0);
    }
  
    // Helper method to get the index of a subject from the subjects array
    getSubjectScoreIndex(subjectName) {
      return this.subjects.indexOf(subjectName);
    }
  
    // Method to check if an applicant passes the selection
    isApplicantPassed(applicant, passingScore, sciencePassingMarks, humanitiesPassingMarks) {
      const totalScore = applicant.getTotalScore();
      const isScience = applicant.isScienceApplicant();
  
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

// Export the Exam class
export default Exam;