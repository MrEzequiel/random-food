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

    const mealArray = Object.entries(meal)

    function createImageMeal() {
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('image-meal')
      imageContainer.innerHTML = `
        <img src="${meal.strMealThumb}" alt="image meal" class="meal">
        <img src="./assets/meal-icon.svg" class="icon-meal">
      `

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

    const createListIngredient = () => {
      const listIngredients = mealArray
        .filter(
          (ingredient) =>
            ingredient[0].includes('strIngredient') &&
            ingredient[1] !== null &&
            ingredient[1].trim() !== ''
        )
        .map((ingredient) => ingredient[1])

      const listMeasure = mealArray
        .filter(
          (measure) =>
            measure[0].includes('strMeasure') &&
            measure[1] !== null &&
            measure[1].trim() !== ''
        )
        .map((measure) => measure[1])

      //  ATENÇÃO MARRECO
      const recipeList = listIngredients.reduce((acc, item, index) => {
        if (listMeasure[index]) {
          acc += `<li>${item}: <span>${listMeasure[index]}</span></li>`
        } else {
          acc += `<li>${item}</li>`
        }
        return acc
      }, '')

      return recipeList
    }

    function createIngredient(list) {
      const ingredientContainer = document.createElement('div')
      ingredientContainer.classList.add('ingredients-meal')

      ingredientContainer.innerHTML = `<h3>Ingredients:</h3>`
      listIngredient.innerHTML = list
      ingredientContainer.append(listIngredient)

      sectionInfoMeal.append(ingredientContainer)
    }

    function createMealTitle() {
      const mealTitleContainer = document.createElement('div')
      mealTitleContainer.classList.add('meal-title')

      mealTitleContainer.innerHTML = `
      <p class="id-meal">meal id: ${meal.idMeal}</p>
      <h1>${meal.strMeal}</h1>
      `

      const mealInstructionsContainer = document.createElement('div')
      mealInstructionsContainer.classList.add('instruction-meal')

      const regExp = /\n/g
      // ATENÇÃO MARRECO
      const mealInstructions = meal.strInstructions.replace(
        RegExp(regExp),
        '<br>'
      )

      mealInstructionsContainer.innerHTML = `<p>${mealInstructions}</p>`
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

    const listIngredientLItens = createListIngredient()

    createIngredient(listIngredientLItens)

    //  CREATE MEAL TITLES
    createMealTitle()
    createLinkMeal()

    if (meal.strYoutube || meal.strYoutube !== '') {
      createVideoMeal()
    }

    mainContainer.append(sectionInfoMeal)
    mainContainer.append(sectionMealDetails)

    this.removeLoading()

    const header = document.querySelector('header')
    header.insertAdjacentElement('afterEnd', mainContainer)

    sectionInfoMeal.classList.add('animation-other')
    sectionMealDetails.classList.add('animation')
  },

  renderList(meals) {
    const containerElement = document.createElement('section')
    containerElement.classList.add('meal-list')

    const createMealList = (meal) => {
      const mealContainer = document.createElement('div')
      mealContainer.classList.add('meal-list-container')
      mealContainer.setAttribute('data-meal', meal.idMeal)

      mealContainer.innerHTML = `
      <div class="info-meal">
        <div class="title-list-meal">
          <p>meal-id: ${meal.idMeal}</p>
          <h3>${meal.strMeal}</h3>
        </div>

        <div class="list-image-meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal} image"/>
        </div>
      </div>
      `

      const objMeal = Object.entries(meal)

      let ingredientString = objMeal.reduce((acc, item) => {
        if (item[0].includes('strIngredient') && item[1] && item[1].trim()) {
          if (acc) {
            acc += `, ${item[1]}`
          } else {
            acc += `${item[1]}`
          }
        }
        return acc.trim()
      }, '')

      ingredientString = ingredientString.padEnd(
        ingredientString.length + 3,
        '...'
      )

      mealContainer.innerHTML += `
      <div class="more-info">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Ingredients:</strong> ${ingredientString}</p>
      </div>
      `

      containerElement.append(mealContainer)
    }

    meals.forEach((meal) => createMealList(meal))
    document.querySelector('main').append(containerElement)
  },

  renderLoading() {
    if (this.body.querySelector('main') !== null) {
      this.body.removeChild(this.body.querySelector('main'))
    }

    this.body.innerHTML += `<img src="./assets/meal-loading.svg" class="loading">`
  },

  renderLoadingSearch() {
    this.body.innerHTML += `<img src="./assets/meal-loading.svg" class="loading">`
  },

  removeLoading() {
    const loading = document.querySelector('.loading')

    document.body.removeChild(loading)
  },

  renderError(type) {
    const mainContainer = document.querySelector('main')

    const renders = {
      Error404() {
        mainContainer.innerHTML += `
        <h2 class="title-error">Error 404</h2>
        <div class="error-404">
          <img src="./assets/meal-icon.svg" />
          <img src="./assets/not-found-icon.svg" />
        </div>
        `
      },
      NotFound() {
        mainContainer.innerHTML += `
        <h3 class="title-error">Meal not found</h3>
        <div class="error-404">
          <img src="./assets/meal-icon.svg" />
          <img src="./assets/search-icon.svg" class="search-icon"/>
        </div>
        `
      },
    }

    renders[type]()
  },
}

export default View
