# Predicting Portuguese Students' Interest in Higher Education

## Project Overview
This project explores the factors influencing Portuguese students' aspirations for higher education, with a special focus on the relationship between educational goals and alcohol consumption. Using a rich dataset from Kaggle, the analysis uncovers patterns in demographics, academic performance, social habits, and more.

## Table of Contents
- [Project Overview](#project-overview)
- [Dataset](#dataset)
- [Methodology](#methodology)
- [Key Results & Insights](#key-results--insights)
- [Live Demo](#live-demo)
- [Jupyter Notebooks](#jupyter-notebooks)
- [How to Use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Dataset
- **Primary Source:** [Kaggle: Student Alcohol Consumption](https://www.kaggle.com/uciml/student-alcohol-consumption)
- **Original Source:** [UCI Machine Learning Repository: Student Performance](https://archive.ics.uci.edu/dataset/320/student+performance)
- **Size:** 649 students, 33 attributes
- **Data Collection Period:** 2005-2006
- **Target Variable:** `higher` (yes/no) - Student's aspiration to pursue higher education
- **Key Features:**
  - `sex`: Gender (female/male)
  - `age`: 15–22 years
  - `Walc`: Weekend alcohol consumption (1–5 scale)
  - `Dalc`: Workday alcohol consumption (1–5 scale)
  - `health`: Health status (1–5 scale)
  - `absences`: Number of school absences (0-93)
  - `famrel`: Quality of family relationships (1-5 scale)
  - `G1`, `G2`, `G3`: First, second, and final period grades

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

## Jupyter Notebooks
To ensure transparency and reproducibility, this project includes detailed Jupyter notebooks that document the entire analysis process:

- **[Data Exploration](notebooks/data_exploration.ipynb)**: Initial exploratory data analysis, visualizations, and statistical summaries.
- **[Feature Engineering](notebooks/feature_engineering.ipynb)**: Creation of the Composite Risk Score and other derived features.
- **[Model Training](notebooks/model_training.ipynb)**: Implementation and tuning of various machine learning models.
- **[Model Evaluation](notebooks/model_evaluation.ipynb)**: Detailed evaluation metrics and performance analysis.
- **[Data Insights](notebooks/data_insights.ipynb)**: Additional analysis of key relationships and findings.

These notebooks provide a step-by-step walkthrough of the methodology and can be used to reproduce the analysis or explore alternative approaches.

## How to Use
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/tzolkowski96/tzolkowski96.git
    cd tzolkowski96/portuguese-students-higher-education-analysis
    ```
2.  **View the Project Website & Demo:**
    Open `index.html` in your preferred web browser. This file contains the complete project report, visualizations, and the interactive demo.
3.  **Explore the Notebooks:**
    The Jupyter notebooks in the `notebooks` directory provide detailed documentation of the analysis process. To run them, you'll need Python with the following packages installed:
    ```sh
    pip install jupyter pandas numpy matplotlib seaborn scikit-learn xgboost imblearn plotly
    ```
4.  **Examine the Code:**
    -   Key Python code snippets demonstrating data loading, preprocessing, feature engineering, and model training are embedded within the `index.html` file in the "Code Samples" section.
    -   The JavaScript for the website interactivity (including the demo logic and visualizations) can be found in `assets/js/main.js`.
    -   CSS styling is in `assets/css/style.css`, with cross-browser compatibility enhancements in `assets/css/compatibility.css` and footer styling in `assets/css/footer-resources.css`.
    -   Cross-browser compatibility tests can be found in `browser-test.html` and `cross-browser-compatibility.md`.

## Acknowledgements
- **Original Dataset**: P. Cortez and A. Silva. Using Data Mining to Predict Secondary School Student Performance. In A. Brito and J. Teixeira Eds., Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008, EUROSIS, ISBN 978-9077381-39-7.
- **Kaggle Dataset Provider**: [UCI ML](https://www.kaggle.com/uciml) for making the data accessible on Kaggle
- **Project Framework**: Completed for L I S 706 — Data Mining Planning and Management, Information M.S. program, Spring 2022.
- **Libraries & Tools**: Thanks to the maintainers of pandas, scikit-learn, XGBoost, Matplotlib, Seaborn, and other open-source tools that made this analysis possible.
- **Data Science Community**: For feedback, suggestions, and support throughout the development of this project.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.