import Request from './src/Requests.js'
import { View } from './src/View.js'

const App = {
  getFormSearch: () => document.querySelector('.search-meal'),
  getRandomButton: () => document.querySelector('.random'),

  init: async () => {
    View.renderLoading()

    const idMeal = window.location.search.split('=')[1]
    let meal = null

    if (idMeal) {
      meal = await Request.getMealById(idMeal)
    } else {
      meal = await Request.meal()
    }

    View.render(meal[0])

    App.getRandomButton().addEventListener('click', App.handleClickRandom)
    App.getFormSearch().addEventListener('submit', App.handleClick)
  },

  handleClickRandom() {
    if (window.location.href.includes('random.html')) {
      window.history.pushState(null, null, 'random.html')
      App.init()
    } else {
      window.location.href = 'random.html'
    }
  },

  handleClick(e) {
    e.preventDefault()
    let mealName = e.target[0].value.trim()

    if (!mealName) {
      return 0
    }

    const urlMealName = encodeURI(mealName)

    if (window.location.href.includes('random.html')) {
      window.location.href = `search.html?search=${urlMealName}`
    } else {
      window.history.pushState(null, null, `search.html?search=${urlMealName}`)
      App.searchInit()
    }
  },

  async searchInit() {
    const searchText = document.querySelector('.search-text')
    while (searchText.nextElementSibling) {
      searchText.nextElementSibling.remove()
    }

    const searchMeal = window.location.search.split('=')[1]
    const mealName = decodeURI(searchMeal)

    if (!mealName.trim() || mealName === 'undefined') {
      View.renderError('Error-404')
    } else {
      document.querySelector('.search-text span').innerText = `"${mealName}"`
      View.renderLoadingSearch()

      const resultListMeals = await Request.getListMeal(searchMeal)

      View.removeLoading()

      !resultListMeals
        ? View.renderError('Not-found')
        : View.renderList(resultListMeals)
    }

    App.getFormSearch().addEventListener('submit', App.handleClick)
    App.getRandomButton().addEventListener('click', App.handleClickRandom)
  },

  handleClickMeal(idMeal) {
    window.location.href = `random.html?id=${idMeal}`
  }
}

export { App }
