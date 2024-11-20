let isMetric = true; // Tracks whether the current system is metric

function toggleUnits() {
    const heightLabel = document.querySelector('label[for="height"]');
    const weightLabel = document.querySelector('label[for="weight"]');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const toggleButton = document.getElementById('toggleUnits');

    // Toggle between metric and imperial units
    if (isMetric) {
        // Switch to imperial
        heightLabel.innerHTML = 'Height (feet):';
        weightLabel.innerHTML = 'Weight (lbs):';
        heightInput.placeholder = 'e.g., 5.5 for 5 feet 6 inches';
        weightInput.placeholder = 'e.g., 150';
        toggleButton.textContent = 'Switch to Metric';
    } else {
        // Switch to metric
        heightLabel.innerHTML = 'Height (cm):';
        weightLabel.innerHTML = 'Weight (kg):';
        heightInput.placeholder = 'e.g., 170';
        weightInput.placeholder = 'e.g., 70';
        toggleButton.textContent = 'Switch to Imperial';
    }

    // Clear input fields and reset the result
    heightInput.value = '';
    weightInput.value = '';
    document.getElementById('result').innerHTML = '';
    isMetric = !isMetric;
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (height > 0 && weight > 0) {
        let bmi, maxWeight, minWeight, weightLoss, category;

        if (isMetric) {
            // Metric calculation
            const heightMeters = height / 100; // Convert cm to meters
            bmi = (weight / (heightMeters ** 2)).toFixed(1);
            maxWeight = (25 * (heightMeters ** 2)).toFixed(1);
            minWeight = (18.5 * (heightMeters ** 2)).toFixed(1);
            weightLoss = (weight - maxWeight).toFixed(1);
        } else {
            // Imperial calculation
            const heightInches = height * 12; // Convert feet to inches
            bmi = ((weight / (heightInches ** 2)) * 703).toFixed(1);
            maxWeight = ((25 * (heightInches ** 2)) / 703).toFixed(1);
            minWeight = ((18.5 * (heightInches ** 2)) / 703).toFixed(1);
            weightLoss = (weight - maxWeight).toFixed(1);
        }

        // Determine BMI Category
        if (bmi < 16.5) {
            category = "Severely Underweight";
        } else if (bmi >= 16.5 && bmi < 18.5) {
            category = "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            category = "Normal";
        } else if (bmi >= 25 && bmi < 30) {
            category = "Overweight";
        } else if (bmi >= 30 && bmi < 35) {
            category = "Obese Class I";
        } else if (bmi >= 35 && bmi < 40) {
            category = "Obese Class II";
        } else {
            category = "Obese Class III";
        }

        // Generate Result
        const resultHTML = `
            <p>Your Height: <strong>${height} ${isMetric ? 'cm' : 'ft'}</strong></p>
            <p>Your Weight: <strong>${weight} ${isMetric ? 'kg' : 'lbs'}</strong></p>
            <p>Your BMI: <strong>${bmi}</strong> (${category})</p>
            <p>Your Maximum Ideal Body Weight: <strong>${maxWeight} ${isMetric ? 'kg' : 'lbs'}</strong> (BMI = 25)</p>
            <p>Your Minimum Ideal Body Weight: <strong>${minWeight} ${isMetric ? 'kg' : 'lbs'}</strong> (BMI = 18.5)</p>
            <p>Suggested Weight Loss Required to Achieve a Normal BMI: <strong>${weightLoss} ${isMetric ? 'kg' : 'lbs'}</strong></p>
        `;

        document.getElementById('result').innerHTML = resultHTML;
    } else {
        document.getElementById('result').innerHTML = "Please enter valid height and weight values.";
    }
}
