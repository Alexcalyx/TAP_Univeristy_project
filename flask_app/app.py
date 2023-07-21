from flask import Flask, render_template, request, redirect, url_for
from entrance_exam import EntranceExam

app = Flask(__name__)

# Default passing criteria and subjects
passing_total_score = 350
passing_subject_score = 160
subjects = ["English", "Mathematics", "Science", "Japanese", "Geography"]

class ExamManager:
    def __init__(self):
        self.exam = None

    def update_passing_criteria(self):
        try:
            global passing_total_score, passing_subject_score
            passing_total_score = int(request.form["passing_total_score"])
            passing_subject_score = int(request.form["passing_subject_score"])
            return "Passing criteria updated successfully."
        except ValueError:
            return "Invalid input. Please enter integer values."

    def add_subject(self):
        new_subject = request.form["new_subject"]
        if new_subject and new_subject not in subjects:
            subjects.append(new_subject)
            return f"{new_subject} added to the subjects list."
        return f"{new_subject} already exists in the subjects list."

    def delete_subject(self):
        subject_to_delete = request.form["delete_subject"]
        if subject_to_delete and subject_to_delete in subjects:
            subjects.remove(subject_to_delete)
            return f"{subject_to_delete} deleted from the subjects list."
        return f"{subject_to_delete} not found in the subjects list."

    def get_exam_results(self):
        exam_results = []
        num_examinees = request.form["num_examinees"]
        for i in range(int(num_examinees)):
            exam_data = request.form.get(f"exam{i}")
            if exam_data:
                classification, *marks = exam_data.split()
                exam_results.append((classification, [int(mark) for mark in marks]))
        return exam_results


@app.route("/", methods=["GET", "POST"])
def index():
    exam_manager = ExamManager()

    if request.method == "POST":
        exam_manager.update_passing_criteria(request.form["passing_total_score"],
                                             request.form["passing_subject_score"])

        if "add_subject" in request.form:
            new_subject = request.form.get("new_subject")
            if new_subject:
                subjects.append(new_subject)

        if "delete_subject" in request.form:
            delete_subject = request.form.get("delete_subject")
            if delete_subject in subjects:
                subjects.remove(delete_subject)

        if "num_examinees" in request.form:
            num_examinees = int(request.form["num_examinees"])
            return redirect(url_for("marks_entry", num_examinees=num_examinees))

        return render_template("index.html", passing_total_score=passing_total_score,
                               passing_subject_score=passing_subject_score, subjects=subjects, num_examinees=5)

    return render_template("index.html", passing_total_score=passing_total_score,
                           passing_subject_score=passing_subject_score, subjects=subjects, num_examinees=5)


@app.route("/calculate", methods=["POST"])
def calculate_exam():
    exam_manager = ExamManager()
    exam_results = exam_manager.get_exam_results()
    exam = EntranceExam(passing_total_score, passing_subject_score, subjects)
    for classification, marks in exam_results:
        exam.add_result(marks, classification)

    num_passed = exam.get_num_passed()
    return render_template("result.html", num_passed=num_passed)

@app.route("/marks_entry", methods=["GET", "POST"])
def marks_entry():
    num_examinees = int(request.args.get("num_examinees", 0))
    if request.method == "POST":
        exam_manager = ExamManager()
        exam_results = exam_manager.get_exam_results(num_examinees)
        exam = EntranceExam(passing_total_score, passing_subject_score, subjects)
        for classification, marks in exam_results:
            exam.add_result(marks, classification)

        num_passed = exam.get_num_passed()
        return render_template("result.html", num_passed=num_passed)

    num_examinees = int(request.args.get("num_examinees", 0))
    return render_template("marks_entry.html", num_examinees=num_examinees)

if __name__ == "__main__":
    app.run(debug=True)