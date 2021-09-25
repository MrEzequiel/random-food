import Utilities from './UtilitiesAndHandles'
import Request from './Requests'
import View from './View'

const App = {
  async init() {
    View.renderLoading()

    const idMeal = window.location.search.split('=')[1]
    let meal = null

    if (idMeal) {
      meal = await Request.getMealById(idMeal)
    } else {
      meal = await Request.meal()
    }

    View.render(meal[0])

    Utilities.getRandomButton().addEventListener('click', () => {
      if (Utilities.handleClickRandom) {
        window.history.pushState(null, null, 'random.html')
        App.init()
      }
    })

    Utilities.getFormSearch().addEventListener('submit', e => {
      e.preventDefault()
      const mealName = Utilities.handleClick(e)
      if (mealName) {
        window.location.href = `search.html?search=${mealName}`
      }
    })
  }
}

export default App
