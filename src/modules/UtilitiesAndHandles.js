const Utilities = {
  getFormSearch: () => document.querySelector('.search-meal'),
  getRandomButton: () => document.querySelector('.random'),

  handleClick(e) {
    const mealName = e.target[0].value.trim()
    if (!mealName) {
      return false
    }
    return encodeURI(mealName)
  },

  handleClickRandom() {
    if (window.location.href.includes('random.html')) {
      return true
    }
    return false
  }
}

export default Utilities
