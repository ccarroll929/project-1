document.addEventListener('DOMContentLoaded', function () {
    const calorieData = []; // Array to store daily calorie entries

    function generateCalorieCalendar(data) {
        // ... (Same as before, you can keep this function as is)
    }

    function createInputField(date) {
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.min = 0;
        inputField.value = 0;
        inputField.addEventListener('change', function () {
            // Update or add the calorie entry for the specific date
            const existingEntryIndex = calorieData.findIndex(entry => entry.date === date);
            if (existingEntryIndex !== -1) {
                calorieData[existingEntryIndex].intake = parseInt(inputField.value, 10);
            } else {
                calorieData.push({ date, intake: parseInt(inputField.value, 10) });
            }
        });

        return inputField;
    }

    function calculateTotal() {
        // Calculate the total calories for the month
        const totalCalories = calorieData.reduce((total, entry) => total + entry.intake, 0);

        // Display the total on the monthly graph
        const monthlyGraphPlaceholder = document.getElementById('monthlyGraphPlaceholder');
        monthlyGraphPlaceholder.innerHTML = `<p>Total Calories for the Month: ${totalCalories}</p>`;

        // You can further update this part based on your graph implementation
    }

    function initializeCalendar() {
        const currentDateDisplay = document.getElementById('currentDateDisplay');
        const calorieTable = document.getElementById('calorieTable');
        const calorieBody = document.getElementById('calorieBody');

        // Clear existing content
        calorieBody.innerHTML = '';

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const startingDay = firstDayOfMonth.getDay();
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDayOfMonth.getDate();

        currentDateDisplay.textContent = `Current Date: ${today.toLocaleDateString()}`;

        let dayCount = 1;
        for (let row = 0; row < 6; row++) {
            const rowElement = document.createElement('tr');

            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('td');

                if (row === 0 && col < startingDay) {
                    cell.textContent = '';
                } else if (dayCount > totalDays) {
                    cell.textContent = '';
                } else {
                    cell.textContent = dayCount;

                    // Create and append input field for calories
                    const inputField = createInputField(`${currentYear}-${currentMonth + 1}-${dayCount}`);
                    cell.appendChild(inputField);

                    dayCount++;
                }

                rowElement.appendChild(cell);
            }

            calorieBody.appendChild(rowElement);
        }
    }

    // Call the function to generate the initial calorie intake calendar
    generateCalorieCalendar(calorieData);

    // Call the function to initialize the calendar with input fields
    initializeCalendar();

    // Expose calculateTotal function to the global scope
    window.calculateTotal = calculateTotal;
});

const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JMTUQiLCJzdWIiOiJCV0o5N1kiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNzA1MDI4MzU0LCJpYXQiOjE3MDQ5OTk1NTR9.PdQxtrTbqu6PtIeGk3eBfZ6I8yTrkShHEJspC0gF14Q"

    fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + access_token}
    })
        .then(response => response.json())
        .then(json => console.log(json)); 
// let heart_rate = activities-heart;value;restingHeartRate; 

//  let heartrateEl = document.getElementById('fitbit-data-0')
//  heartrateEl.innerHTML = ' Heart rate: ' + heart_rate;

