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
- **Top Predictors:** The analysis identified several key factors significantly influencing students' higher education aspirations. These include:
  - School Absences
  - Age
  - Weekend Alcohol Consumption (Walc)
  - Health Status
  - The custom-engineered Composite Risk Score (combining absences, alcohol, and health)
- **Model Performance:**
  - The **XGBoost model** demonstrated the strongest predictive power, achieving an **AUC (Area Under the ROC Curve) of 0.82**.
  - Other models like Random Forest and Decision Trees also provided valuable insights into feature importance and data relationships.
- **Core Findings & Implications:**
  - A strong correlation exists between lower absences, younger age, and a higher likelihood of aspiring to higher education.
  - Weekend alcohol consumption patterns are statistically relevant in profiling students regarding their educational outlook.
  - Overall health and a holistic view of risk factors (captured by the Composite Risk Score) are important indicators.
  - These insights can help educators and policymakers identify students who might benefit from targeted support and interventions.

## Live Demo
An interactive demonstration of the model's predictions (using simplified logic for illustrative purposes) is available in the `index.html` file. Open this file in your web browser to try it out. You can also view the full project website by opening `index.html`.

## How to Use
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/tzolkowski96/student-education-analysis.git
    cd student-education-analysis
    ```
2.  **View the Project Website & Demo:**
    Open `index.html` in your preferred web browser. This file contains the complete project report, visualizations, and the interactive demo.
3.  **Explore the Code:**
    -   Key Python code snippets demonstrating data loading, preprocessing, feature engineering, and model training are embedded within the `index.html` file in the "Code Samples" section.
    -   The JavaScript for the website interactivity (including the demo logic and visualizations) can be found in `assets/js/main.js`.
    -   CSS styling is in `assets/css/style.css`.

## Acknowledgements
- Dataset: Kaggle
- Project completed for L I S 706 — Data Mining Planning and Management, Spring 2022.
- Thanks to the data science community for feedback and support.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.