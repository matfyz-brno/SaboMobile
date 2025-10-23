# BMI Calculator – User Stories

## Story 1 – Calculate BMI
As a user, I want to enter my height and weight so that I can see my Body Mass Index (BMI) calculated automatically.

**Acceptance Criteria**
1. BMI = weight_kg / (height_m)^2, where height_m = height_cm / 100.
2. BMI is displayed with one decimal place (e.g., "24.7 kg/m²").
3. Rounding is for display only; internal calculations use full precision.
4. If height or weight input is missing, non-numeric, or unrealistic, BMI is not calculated and an error message is displayed.
5. Pressing **Clear** resets all input fields and removes previous results.

## Story 2 – Calculate Body Fat
As a user, I want to see an estimate of my body fat percentage so that I can better understand my overall health.

**Acceptance Criteria**
1. BodyFat% = 1.20 × BMI + 0.23 × Age − 10.8 × Sex − 5.4 (Sex = 1 for male, 0 for female).
2. Display with one decimal place.
3. For users under 18, body fat estimation is not displayed and an informational message appears.
4. Changing any input updates BMI and Body Fat when recalculated.

## Story 3 – Classify BMI
As a user, I want my BMI result to include a classification label so that I can understand how my result compares to standard health ranges.

**Acceptance Criteria**
1. Classification follows WHO standards:  
   - <16 → Severe Thinness
   - 16.1-17.0 → Moderate Thinness
   - 17.1-18.5 → Mild Thinness
   - 18.6–24.9 → Normal  
   - 25.1–29.9 → Overweight  
   - 30.1–34.9 → Obese Class I
   - 35.1-40.0 → Obese Class II
   - >40.0 → Obese Class III
2. Classification label is displayed with the BMI result.
3. When BMI cannot be calculated, no classification is shown.

## Story 4 – Visualize BMI with Gauge
As a user, I want to see a visual gauge representing my BMI range so that I can easily interpret whether my result is low, normal, or high.

**Acceptance Criteria**
1. A gauge displays the BMI scale divided into classification ranges.
2. The gauge indicator points to the user’s calculated BMI.
3. The color segment matches the BMI classification.
4. The **Clear** action resets the gauge to a neutral state.
5. Recalculation refreshes the gauge dynamically.
