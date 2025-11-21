# What Makes Students Aspire to Higher Education?

A machine learning analysis of 649 Portuguese students revealing the hidden factors that predict educational aspirations with 77% accuracy.

![Project Banner](https://img.shields.io/badge/Accuracy-77%25-brightgreen) ![Dataset Size](https://img.shields.io/badge/Students-649-blue) ![Algorithm](https://img.shields.io/badge/Algorithm-Random_Forest-orange) ![Features](https://img.shields.io/badge/Features-33-purple)

## 🔍 Overview

This project investigates the factors that influence Portuguese students' aspirations for higher education through comprehensive data analysis and machine learning. Using data from 649 students across two Portuguese schools, the analysis reveals surprising insights about what truly predicts educational ambition.

### Key Findings

- **Age** emerged as the top predictor (followed closely by absences)
- **School absences** played a critical role (tipping point at 6 days)
- **Weekend alcohol consumption** correlated with aspirations
- The Random Forest model achieved **77% accuracy**
- **Male students** showed lower likelihood of aspirations

## 🎯 Live Demo

Experience the interactive analysis: [**View Live Site**](https://tzolkowski96.github.io/student-education-analysis/)

## 📊 Technical Details

### Dataset
- **Source**: UCI Machine Learning Repository (2005-2006)
- **Size**: 649 Portuguese secondary school students
- **Features**: 33 variables including demographics, academic performance, and lifestyle factors
- **Schools**: Gabriel Pereira and Mousinho da Silveira

### Methodology
- **Primary Algorithm**: Random Forest with hyperparameter tuning
- **Validation**: Train/Test/Holdout split (80/10/10)
- **Class Balancing**: SMOTE (Synthetic Minority Over-sampling Technique)

### Model Performance
| Algorithm | Accuracy Score |
|-----------|---------------|
| Random Forest | 0.77 |
| Decision Tree | 0.77 |
| Logistic Regression | 0.70 |
| Naive Bayes | 0.69 |
| Baseline | 0.50 |

## ✨ Features

### Interactive Elements
- **Dark Mode Support**: Fully responsive dark theme with persistent preferences
- **Reading Progress Indicator**: Visual scroll progress bar
- **Dynamic Charts**: Plotly.js visualizations with lazy loading
- **Prediction Tool**: Interactive calculator to test the model with custom student profiles
- **Scroll Animations**: Smooth reveal effects for content sections

### Visualizations
- Feature importance ranking
- Model performance comparison
- Interactive student profile comparison
- Real-time prediction results

### Accessibility & Design
- **NYT-Inspired Aesthetic**: Clean typography using Cheltenham and Georgia fonts
- **Responsive Layout**: Mobile-optimized design with touch-friendly controls
- **Accessibility**: ARIA labels, keyboard navigation, and high-contrast support
- **Print Optimization**: Clean formatting for printed reports

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), JavaScript (ES6+)
- **Visualization**: Plotly.js
- **Analysis**: Python (Pandas, Scikit-learn) - *Analysis performed in Jupyter Notebooks*
- **Hosting**: GitHub Pages

## 🛠️ Project Structure

```
student-education-analysis/
├── index.html          # Main interactive article
├── css/
│   └── styles.css      # NYT-inspired design system with dark mode
├── js/
│   └── main.js         # Interactive functionality & chart logic
├── .gitignore          # Git exclusion rules
├── .nojekyll           # GitHub Pages configuration
└── README.md           # Project documentation
```

## 📱 Responsive Design

- **Desktop**: Full interactive experience with side-by-side layouts
- **Tablet**: Stacked layouts with maintained functionality
- **Mobile**: Single-column design with touch-optimized controls
- **Print**: Clean, publication-ready formatting

## 🔬 Academic Context

This analysis was completed as part of **L I S 706 — Data Mining Planning and Management** at the University of Wisconsin-Madison, Spring 2022. The project demonstrates:

- Advanced machine learning techniques
- Statistical bias testing and fairness analysis
- Interactive data visualization
- Academic writing and presentation skills

**Grade Received**: A

## 🎓 Author

**Tobin Zolkowski**
- Deaf data analyst with 3+ years of experience
- Specializes in Python, SQL, and data visualization
- Degrees: International Studies (BA), Information Science (MS) from UW-Madison

### Connect
- [LinkedIn](https://www.linkedin.com/in/tobin-zolkowski-844873200/)
- [GitHub](https://github.com/tzolkowski96)
- [Medium](https://medium.com/@tzolkowski)

## 📄 License

This project is available under the MIT License. See the analysis methodology and code implementation for educational and research purposes.

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for external dependencies (Plotly.js, Google Fonts)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/tzolkowski96/student-education-analysis.git
   ```

2. Navigate to the project directory:
   ```bash
   cd student-education-analysis
   ```

3. Open `index.html` in your web browser or serve via a local web server:
   ```bash
   # Using Python 3 (Recommended)
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

4. Visit `http://localhost:8000` to view the project

## 📸 Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| *Add screenshot here* | *Add screenshot here* |
| **Interactive Prediction** | **Mobile View** |
| *Add screenshot here* | *Add screenshot here* |

## 🔍 Data Sources

- **Primary Dataset**: Portuguese Student Performance Dataset from UCI ML Repository
- **Original Research**: P. Cortez and A. Silva (2008)
- **Citation**: Using Data Mining to Predict Secondary School Student Performance

## 📈 Future Enhancements

- Integration with modern datasets (post-2020)
- Additional machine learning algorithms
- Extended demographic analysis
- Mobile app version
- API for real-time predictions

---

**Originally published Spring 2022 | University of Wisconsin-Madison | 8 min read**
