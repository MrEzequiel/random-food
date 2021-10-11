import Request from './Requests'
import View from './View'
import Utilities from './UtilitiesAndHandles'

const Search = {
  async init() {
    const searchText = document.querySelector('.search-text')
    while (searchText.nextElementSibling) {
      searchText.nextElementSibling.remove()
    }

    const searchMeal = window.location.search.split('=')[1]
    const mealName = decodeURI(searchMeal)

    if (!mealName.trim() || mealName === 'undefined') {
      View.renderError('Error404')
    } else {
      document.querySelector('.search-text span').innerText = `"${mealName}"`
      View.renderLoadingSearch()

      const resultListMeals = await Request.getListMeal(searchMeal)

      View.removeLoading()

      if (!resultListMeals) {
        View.renderError('NotFound')
      } else {
        View.renderList(resultListMeals)

        const mealContainers = document.querySelectorAll('.meal-list-container')
        mealContainers.forEach((mealContainer) => {
          mealContainer.addEventListener('click', () => {
            Search.handleClickMeal(mealContainer.dataset.meal)
          })
        })
      }
    }

    Utilities.getFormSearch().addEventListener('submit', (e) => {
      e.preventDefault()
      const mealNameSearch = Utilities.handleClick(e)
      if (mealNameSearch) {
        window.history.pushState(
          null,
          null,
          `search.html?search=${mealNameSearch}`
        )
        Search.init()
      }
    })

    Utilities.getRandomButton().addEventListener('click', () => {
      if (Utilities.handleClickRandom) {
        window.location.href = 'random.html'
      }
    })
  },

  handleClickMeal(idMeal) {
    window.location.href = `random.html?id=${idMeal}`
  },
}

export default Search
