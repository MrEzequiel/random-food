const View = {
  render(meal) {
    const listIngredient = document.createElement('ul')
    listIngredient.classList.add('list-ingredients')

    const createListIngredient = (ingredient, index) => {
      if (
        ingredient[0].includes('strIngredient') &&
        ingredient[1] !== null &&
        ingredient[1].trim() !== ''
      ) {
        const itemIngredient = document.createElement('li')
        itemIngredient.innerHTML = `${ingredient[1]}`
        listIngredient.append(itemIngredient)
      }

      if (
        ingredient[0].includes('strMeasure') &&
        ingredient[1] !== null &&
        ingredient[1].trim() !== ''
      ) {
        let allIngredients = listIngredient.querySelectorAll('li')
        allIngredients[
          index - 29
        ].innerHTML += `: <span>${ingredient[1]}</span>`
      }
    }

    document.querySelector(
      '.image-meal'
    ).innerHTML = `<img src="${meal.strMealThumb}" alt="image meal">`

    document.querySelector('.local-meal').innerHTML = `
    <p>Category: <span>${meal.strCategory}</span></p>
    <p>Area: <span>${meal.strArea}</span></p>
    `
    const mealArray = Object.entries(meal)
    mealArray.forEach(createListIngredient)

    const elementIngredient = document.querySelector('.ingredients-meal')
    elementIngredient.innerHTML = `<h3>Ingredients:</h3>`
    elementIngredient.append(listIngredient)

    document.querySelector('.meal-title h1').innerHTML = `${meal.strMeal}`
    document.querySelector(
      '.instruction-meal p'
    ).innerHTML = `${meal.strInstructions}`

    if (meal.strYoutube !== null || meal.strYoutube.trim() !== '') {
      const mealContainer = document.querySelector('#meal-details')
      mealContainer.removeChild(mealContainer.lastElementChild)

      const linkYoutube = meal.strYoutube.slice(32)

      const videoMeal = document.createElement('div')
      videoMeal.classList.add('video-meal')
      videoMeal.innerHTML = `
      <iframe
            src="https://www.youtube.com/embed/${linkYoutube}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
      ></iframe>
      `

      mealContainer.append(videoMeal)
    } else {
      mealContainer.removeChild(mealContainer.lastElementChild)
    }
  }
}

export { View }
