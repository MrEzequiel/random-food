import Request from './Requests.js'
import { View } from './View.js'
import { Search } from './Search.js'

export const App = {
  getFormSearch: () => document.querySelector('.search-meal'),
  getRandomButton: () => document.querySelector('.random'),

  async init() {
    View.renderLoading()

    const idMeal = window.location.search.split('=')[1]
    let meal = null

    idMeal
      ? (meal = await Request.getMealById(idMeal))
      : (meal = await Request.meal())

    View.render(meal[0])

    App.getRandomButton().addEventListener('click', App.handleClickRandom)
    App.getFormSearch().addEventListener('submit', Search.handleClick)
  },

  handleClickRandom() {
    if (window.location.href.includes('random.html')) {
      window.history.pushState(null, null, 'random.html')
      App.init()
    } else {
      window.location.href = 'random.html'
    }
  }
}
