const View = {
  body: document.querySelector('body'),
  render(meal) {
    const mainContainer = document.createElement('main')

    const sectionInfoMeal = document.createElement('section')
    sectionInfoMeal.setAttribute('id', 'info-meal')

    const sectionMealDetails = document.createElement('section')
    sectionMealDetails.setAttribute('id', 'meal-details')

    const listIngredient = document.createElement('ul')
    listIngredient.classList.add('list-ingredients')

    function createImageMeal() {
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('image-meal')
      imageContainer.innerHTML = `<img src="${meal.strMealThumb}" alt="image meal">`

      sectionInfoMeal.append(imageContainer)
    }

    function createLocalMeal() {
      const localInfoContainer = document.createElement('div')
      localInfoContainer.classList.add('local-meal')
      localInfoContainer.innerHTML = `
      <p>Category: <span>${meal.strCategory}</span></p>
      <p>Area: <span>${meal.strArea}</span></p>
      `

      sectionInfoMeal.append(localInfoContainer)
    }

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

    function createIngredient() {
      const ingredientContainer = document.createElement('div')
      ingredientContainer.classList.add('ingredients-meal')

      ingredientContainer.innerHTML = `<h3>Ingredients:</h3>`
      ingredientContainer.append(listIngredient)

      sectionInfoMeal.append(ingredientContainer)
    }

    function createMealTitle() {
      const mealTitleContainer = document.createElement('div')
      mealTitleContainer.classList.add('meal-title')

      mealTitleContainer.innerHTML = `<h1>${meal.strMeal}</h1>`

      const mealInstructionsContainer = document.createElement('div')
      mealInstructionsContainer.classList.add('instruction-meal')

      mealInstructionsContainer.innerHTML = `<p>${meal.strInstructions}</p>`
      mealTitleContainer.append(mealInstructionsContainer)

      sectionMealDetails.append(mealTitleContainer)
    }

    function createLinkMeal() {
      const mealLinkContainer = document.createElement('div')
      mealLinkContainer.classList.add('meal-link')

      mealLinkContainer.innerHTML = `
      <span class="material-icons">attach_file</span>
      <a href="${meal.strSource}" target="_blank">${meal.strMeal}</a>
      `

      sectionMealDetails.append(mealLinkContainer)
    }

    function createVideoMeal() {
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

      sectionMealDetails.append(videoMeal)
    }

    // CREATE INFO MEAL
    createImageMeal()
    createLocalMeal()

    const mealArray = Object.entries(meal)
    mealArray.forEach(createListIngredient)

    createIngredient()

    //CREATE MEAL TITLES
    createMealTitle()
    createLinkMeal()

    if (meal.strYoutube !== null || meal.strYoutube !== '') {
      createVideoMeal()
    }

    mainContainer.append(sectionInfoMeal)
    mainContainer.append(sectionMealDetails)

    this.removerLoading()
    this.body.append(mainContainer)
  },
  renderLoading() {
    if (this.body.querySelector('main') !== null) {
      this.body.removeChild(this.body.querySelector('main'))
    }

    this.body.innerHTML += `<img src="./assets/meal-loading.svg" class="loading">`
  },
  removerLoading() {
    this.body.removeChild(this.body.querySelector('.loading'))
  }
}

export { View }
