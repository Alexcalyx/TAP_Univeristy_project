
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

  // Export the Applicant class
  export default Applicant;
