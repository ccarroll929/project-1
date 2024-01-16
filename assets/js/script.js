// Added a calorie calculator
let dailyBtn = document.getElementById("open-daily");
let dailyClose = document.getElementById("daily-close");
let mealInputEl = document.getElementById("item-name");
console.log(dailyClose);
// Stores entered items to local storage, set to an empty array
let items = JSON.parse(localStorage.getItem('items'))?JSON.parse(localStorage.getItem('items')): []
// Event listeners for buttons to add and delete meals from the list
document.getElementById("add-meal").addEventListener("click", addMeal);
document.getElementById("delete-all").addEventListener("click", deleteAllMeals);
let itemList = document.getElementById("item-list");
function addMeal(event){
    let calorieReturn = document.getElementById('item-name').value;
  $.ajax({
    method: 'GET', url: 'https://api.calorieninjas.com/v1/nutrition?query=' + calorieReturn,
    async: false,
    headers: {'X-Api-Key': 'qbo/h6wWQsSwBkJM+iPrUw==fmXwpQujp8zdjibt'},
    contentType: 'application/json',
    success: function(result) {
      console.log(result.items[0].calories);
      $("#item-calories").val(result.items[0].calories);
    },
    error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  }});
    event.preventDefault();
    mealName = document.getElementById("item-name").value;
    mealCalories = document.getElementById("item-calories").value;
    let item = {
      "itemName": mealName,
      "itemCalories": mealCalories
    }
    StorageCtrl.storeItem(item);
    displayItems();
  }
  function updateMeal(){
    taskButtonHandler.addEventListener("click",updateMeal)
    console.log("update")
    }
    function deleteAllMeals(){
        let list = document.getElementById("item-list");
        while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      items = []
      localStorage.setItem('items', JSON.stringify(items));
        }
        // Displays list of user meal inputs 
      function displayItems(){
        items = [];
        if (localStorage.getItem('items')){items = JSON.parse(localStorage.getItem('items'));}
        let calories = 0;
      itemList.innerHTML = ""
        items.forEach((item)=>{
          let li = document.createElement("li");
          li.innerText = "Meal: " +  item.itemName + "; Calories: " + item.itemCalories;
    
          $('#item-calories').value = '';
          let deletebtn = document.createElement("button");
          deletebtn.value = item.itemName
          deletebtn.innerText = "delete"
          li.appendChild(deletebtn);
          itemList.appendChild(li);
          deletebtn.addEventListener("click",function(event){
            event.preventDefault()
            console.log(event.target.value)
            let removedItems = items.filter(item => {
              console.log(item)
              if (event.target.value !== item.itemName){
                return item
              }
            })
            console.log(removedItems)
            items = removedItems
            localStorage.setItem('items', JSON.stringify(items));
            displayItems()
          })
          calories = calories + parseInt(item.itemCalories);
        })
        console.log(typeof(calories));
        totalCaloriesSpan = document.getElementById("total-calories");
        totalCaloriesSpan.innerText = calories;
      }

      document.addEventListener("DOMContentLoaded", function() {
        //
        displayItems();
      });
      const StorageCtrl = (function () {
        function storeItem(item) {
            let items;
            // Check if any data in local storage
            if (localStorage.getItem('items') === null) {
              items = [];
              items.push(item);
              localStorage.setItem('items', JSON.stringify(items));
            } else {
              items = JSON.parse(localStorage.getItem('items'));
              items.push(item);
              localStorage.setItem('items', JSON.stringify(items));
            }
          }
          // Retrieve items from local storage
          function getItemsFromStorage() {
            let items;
            if (localStorage.getItem('items') === null) {
              items = []
            } else {
              items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
          }
          //Deleting data from local storage
          function deleteItemFromStorage() {
            let item = ItemCtrl.findToDelete();
            console.log(item);
            let items = getItemsFromStorage();
            items.forEach(x => {
              if (x.id == item.id) {
                items.splice(x.id, 1);
              }
            })
            localStorage.setItem('items', JSON.stringify(items));
          }
          //Updating the new user data inputs in local storage
          function updateItemFromStorage() {
            let items = ItemCtrl.data.items;
            localStorage.setItem('items', JSON.stringify(items));
          }
          //Clearing out all data from local storage if user clicks "delete all" button
          function deleteAllFromStorage() {
            localStorage.removeItem('items');
            ItemCtrl.nullifyTotalCallories();
          }
          // Returning all of the items listed above to track in local storage.
          return {
            storeItem,
            getItemsFromStorage,
            deleteItemFromStorage,
            updateItemFromStorage,
            deleteAllFromStorage
          }
        })();


        // Calendar 
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

    function calculateAverage() {
        // Calculate the total calories for the month
        const totalCalories = calorieData.reduce((total, entry) => total + entry.intake, 0);

        // Calculate the number of days with entries
        const numberOfDays = calorieData.length;

        // Calculate the daily average
        const dailyAverage = numberOfDays > 0 ? totalCalories / numberOfDays : 0;

        // Display the daily average on the monthly graph
        const monthlyGraphPlaceholder = document.getElementById('monthlyGraphPlaceholder');
        monthlyGraphPlaceholder.innerHTML = `<p>Daily Average Calories for the Month: ${dailyAverage.toFixed(2)}</p>`;

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
    // generateCalorieCalendar(calorieData);

    // Call the function to initialize the calendar with input fields
    // initializeCalendar();

    // Expose calculateAverage function to the global scope
    window.calculateAverage = calculateAverage;
    const calculateTotalButton = document.querySelector('button');
    calculateTotalButton.addEventListener('click', calculateAverage);

});

// API = "Calorie Ninjas" This serves for calorie tracking.

var query = " "

$.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': 'l+o7KdZtcRQhu+LatJADQQ==kodmdUBGdqyc6As9'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

// API = "API Ninjas" This serves for exercise tracking.

var muscle = " "

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
    headers: { 'X-Api-Key': '0E+DJYOfVQaerLhB/eypXw==jIWxZimWbKidQsmH'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});