// Use strict
"use strict";

document.querySelector('#submit').addEventListener('click', showRecipes)

function showRecipes() {
    // Get input
    let meal = document.querySelector('#input').value

    // Delete existing carousel
    if (document.querySelector('.carousel-item') !== null) {
        let carousel = document.querySelectorAll('.carousel-item')
        Array.from(carousel).forEach(a => a.remove())
    }

    // Fetch and show result to DOM
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal)}`)
        .then(res => res.json())
        .then(data => showInDom(data))
        .catch(err => console.log(`Error: ${err}`))
}

function showInDom(data) {
    for (let j = 0; j < data.meals.length; j++) {

        // Store fetched data in variables
        let mealName = data.meals[j].strMeal
        let mealImg = data.meals[j].strMealThumb
        let mealIns = data.meals[j].strInstructions.split('\r\n')
        mealIns = mealIns.filter(a => a)
        mealIns = mealIns.filter(a => !(/^\d{1,2}\.$/).test(a))
        let mealIng = []
        for (let i = 1; i <= 20; i++) {
            let measure = `strMeasure${i}`
            let ingredients = `strIngredient${i}`
            mealIng.push((data.meals[j][measure] + ' ' + data.meals[j][ingredients]).trim())
        }
        mealIng = mealIng.filter(a => a)

        // Create new elements
        let divItem = document.createElement('div')
        let divRow = document.createElement('div')
        let divCol1 = document.createElement('div')
        let divCol2 = document.createElement('div')
        let divCol1Row1 = document.createElement('div')
        let divCol1Row2 = document.createElement('div')
        let name = document.createElement('h2')
        let img = document.createElement('img')
        let ing = document.createElement('h2')
        let ins = document.createElement('h2')
        let ingList = document.createElement('ul')
        let insList = document.createElement('ol')

        // Assign elements
        name.innerHTML = mealName
        img.src = mealImg
        ing.innerHTML = 'Ingredients'
        ins.innerHTML = 'Instructions'
        mealIns.forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = element
            insList.appendChild(li)
        });
        mealIng.forEach(element => {
            let li = document.createElement('li')
            li.innerHTML = element
            ingList.appendChild(li)
        });

        // Add class
        divItem.classList.add('carousel-item')
        if (j === 0) {
            divItem.classList.add('active')
        }
        divRow.classList.add('row', 'p-2')
        divCol1.classList.add('col-3')
        divCol2.classList.add('col')
        divCol1Row1.classList.add('row')
        divCol1Row2.classList.add('row')
        img.classList.add('img-fluid', 'img-thumbnail', 'mealImg', 'm-3')
        ingList.classList.add('ingList', 'px-5')

        // Contstuct carousel item
        divCol1Row1.appendChild(name)
        divCol1Row1.appendChild(img)
        divCol1Row2.appendChild(ing)
        divCol1Row2.appendChild(ingList)
        divCol1.appendChild(divCol1Row1)
        divCol1.appendChild(divCol1Row2)
        divCol2.appendChild(ins)
        divCol2.appendChild(insList)
        divRow.appendChild(divCol1)
        divRow.appendChild(divCol2)
        divItem.appendChild(divRow)

        // Show in DOM
        document.querySelector('#carouselStart').appendChild(divItem) 

    }
}