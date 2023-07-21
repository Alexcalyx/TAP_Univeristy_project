class EntranceExam:
    def __init__(self, passing_total_score, passing_subject_score, subjects):
        self.passing_total_score = passing_total_score
        self.passing_subject_score = passing_subject_score
        self.subjects = subjects
        self.results = []
        self.num_passed = 0

    def add_result(self, subject_scores, classification):
        if classification not in ["s", "l"]:
            raise ValueError("Classification must be 's' for science or 'l' for humanities.")
        if len(subject_scores) != len(self.subjects):
            raise ValueError(f"Number of subject scores must be {len(self.subjects)}.")

        total_score = sum(subject_scores)
        passing_subject_condition = all(score >= self.passing_subject_score for score in subject_scores)
        passing_total_condition = total_score >= self.passing_total_score

        if passing_total_condition and passing_subject_condition:
            self.num_passed += 1

        self.results.append({
            "classification": classification,
            "subject_scores": subject_scores,
            "total_score": total_score,
            "passing_total_condition": passing_total_condition,
            "passing_subject_condition": passing_subject_condition,
            "passed": passing_total_condition and passing_subject_condition
        })

    def get_num_passed(self):
        return self.num_passed


class ExamInput:
    @staticmethod
    def from_stdin():
        subjects = ["English", "Mathematics", "Science", "Japanese", "Geography"]
        passing_total_score = 350
        passing_subject_score = 160

        num_examinees = int(input())
        exam = EntranceExam(passing_total_score, passing_subject_score, subjects)

        for _ in range(num_examinees):
            data = input().split()
            classification, scores = data[0], list(map(int, data[1:]))
            exam.add_result(scores, classification)

        return exam


class ExamOutput:
    @staticmethod
    def to_stdout(num_passed):
        print(num_passed)


class ExamManager:
    def __init__(self):
        self.exam = None
        self.subjects = ["English", "Mathematics", "Science", "Japanese", "Geography"]
        self.passing_total_score = 350
        self.passing_subject_score = 160

    def update_passing_criteria(self):
        try:
            self.passing_total_score = int(input("Enter the new passing total score: "))
            self.passing_subject_score = int(input("Enter the new passing subject score: "))
            print("Passing criteria updated successfully.")
        except ValueError:
            print("Invalid input. Please enter integer values.")

    def add_subject(self):
        new_subject = input("Enter the name of the subject to add: ")
        if new_subject not in self.subjects:
            self.subjects.append(new_subject)
            print(f"{new_subject} added to the subjects list.")
        else:
            print(f"{new_subject} already exists in the subjects list.")

    def delete_subject(self):
        subject_to_delete = input("Enter the name of the subject to delete: ")
        if subject_to_delete in self.subjects:
            self.subjects.remove(subject_to_delete)
            print(f"{subject_to_delete} deleted from the subjects list.")
        else:
            print(f"{subject_to_delete} not found in the subjects list.")

    def run_exam(self):
        num_examinees = int(input("Enter the number of examinees: "))
        self.exam = EntranceExam(self.passing_total_score, self.passing_subject_score, self.subjects)

        for i in range(num_examinees):
            classification = input(f"Enter classification for examinee {i + 1} (s/l): ")
            subject_scores = [int(input(f"Enter score for {subject}: ")) for subject in self.subjects]
            self.exam.add_result(subject_scores, classification)

        num_passed = self.exam.get_num_passed()
        print(f"{num_passed} examinees passed the two-stage selection of the University entrance examination.")


def main():
    exam_manager = ExamManager()

    while True:
        print("1. Add Subject")
        print("2. Delete Subject")
        print("3. Change Passing/Failing Criteria")
        print("4. Run Entrance Exam")
        print("5. Exit")
        choice = input("Enter your choice (1/2/3/4/5): ")

        if choice == "1":
            exam_manager.add_subject()
        elif choice == "2":
            exam_manager.delete_subject()
        elif choice == "3":
            exam_manager.update_passing_criteria()
        elif choice == "4":
            exam_manager.run_exam()
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
