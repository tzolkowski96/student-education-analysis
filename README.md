# Predicting Portuguese Students' Interest in Higher Education

## Project Overview
This project explores the factors influencing Portuguese students' aspirations for higher education, with a special focus on the relationship between educational goals and alcohol consumption. Using a rich dataset from Kaggle, the analysis uncovers patterns in demographics, academic performance, social habits, and more.

## Table of Contents
- [Project Overview](#project-overview)
- [Dataset](#dataset)
- [Methodology](#methodology)
- [Key Results & Insights](#key-results--insights)
- [Live Demo](#live-demo)
- [How to Use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Dataset
- **Source:** [Kaggle: Student Alcohol Consumption](https://www.kaggle.com/uciml/student-alcohol-consumption)
- **Size:** 649 students, 33 attributes
- **Key Features:**
  - `sex`: Gender
  - `age`: 15–22 years
  - `higher`: Aspiration for higher education
  - `Walc`: Weekend alcohol consumption (1–5)
  - `health`: Health status (1–5)
  - `absences`: Number of school absences

## Methodology
1. **Exploratory Data Analysis (EDA):**
   - Visualized distributions of categorical and numerical variables.
2. **Data Preprocessing:**
   - No missing values; categorical variables encoded using one-hot encoding.
3. **Handling Class Imbalance:**
   - Used SMOTE to balance the target classes.
4. **Data Splitting:**
   - Training (80%), Testing (10%), Validation (10%).
5. **Model Selection:**
   - DummyClassifier, Gaussian Naive Bayes, Decision Tree, Logistic Regression, Random Forest, XGBoost.
6. **Hyperparameter Tuning:**
   - Random Search for Random Forest and XGBoost.
7. **Feature Engineering:**
   - Created composite risk scores and interaction features.

## Key Results & Insights
- **Top Predictors:** Absences, age, health, and weekend alcohol consumption.
- **Model Performance:**
  - XGBoost achieved the best AUC (0.82).
  - Random Forest and Decision Tree also performed well.
- **Visual Insights:**
  - Most students aspire to higher education.
  - Absences and age are strong predictors of academic outcomes.
  - Family support and health play important roles.

## Live Demo
Try the interactive model demo on the [project website](https://github.com/tzolkowski96/student-education-analysis) or see the `index.html` for a local version.

## How to Use
1. **Clone the repository:**
   ```sh
   git clone https://github.com/tzolkowski96/student-education-analysis.git
   ```
2. **Open `index.html` in your browser** to view the project report and live demo.
3. **For code and data analysis:**
   - See the `code-samples` section in the HTML or the [notebooks/scripts](https://github.com/tzolkowski96/student-education-analysis) in the repository.

## Acknowledgements
- Dataset: Kaggle
- Project completed for L I S 706 — Data Mining Planning and Management, Spring 2022.
- Thanks to the data science community for feedback and support.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.