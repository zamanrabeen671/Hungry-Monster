const alearmessage = alertText => {
    document.getElementById("alert").innerText = alertText;
}
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    alearmessage("");
    document.getElementById("meal-details").style.display = 'none';

    const mealInput = document.getElementById('meal-input').value.trim();
    document.getElementById('meal-input').value = "";


    if (mealInput === "") {
        alearmessage('Please Enter a Meal Name!');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals) {
                    getMealData(data);
                }
                else {
                    alearmessage(`No meal found with this name \"${mealInput}\". Please try again.`)
                }

            })
    }
})

const getMealData = data => {
    const parentDiv = document.getElementById('meal-item');
    document.getElementById('meal-item').innerText = "";

    data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');

        const mealInfo = `
        <div onclick='getMealDetails("${meal.idMeal}")' class="meal-area">
            <img src="${meal.strMealThumb}" class="meal-image">
            <p class="meal-title">${meal.strMeal}<p>
        </div>
        `
        mealDiv.innerHTML = mealInfo;
        parentDiv.appendChild(mealDiv);
    });

}
const getMealDetails = Id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`)
        .then(res => res.json())
        .then(data => {
            displayMeal(data.meals[0]);
        })
}

function displayMeal(meal){
    document.getElementById('display-details').innerHTML = `
    <div class="text-center">
        <h3 class="details-title">${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" class="details-image">
        <div>
            <h4 id="ingredient-title">  Ingredients</h4>
            <ul id="ingredient-list">

            </ul>
        </div>
    </div>
    
    `
    for(let i=1;i<=7;i++){
        let itemName = 'strIngredient'+i;
        let itemNo = 'strMeasure'+i;
        if(meal[itemName] === ""|| meal[itemName]==null){
            break;
        }
        const li = document.createElement("li");
        li.innerHTML = `
        <li>${i}:  ${meal[itemNo]} ${meal[itemName]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }
    document.getElementById("meal-details").style.display = "block";
}
