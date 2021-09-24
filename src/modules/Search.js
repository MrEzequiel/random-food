import { View } from './View.js'
import Request from './Requests.js'
import { App } from './App.js'

export const Search = {
  async init() {
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

    App.getFormSearch().addEventListener('submit', Search.handleClick)
    App.getRandomButton().addEventListener('click', App.handleClickRandom)
  },

  handleClickMeal(idMeal) {
    window.location.href = `random.html?id=${idMeal}`
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
      Search.init()
    }
  }
}
