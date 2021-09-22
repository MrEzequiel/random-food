const Request = {
  async meal() {
    try {
      const { data } = await axios(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      )
      return data.meals
    } catch (e) {
      console.log(e)
    }
  },

  async getListMeal(mealName) {
    try {
      const { data } = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
      )
      return data.meals
    } catch (e) {
      console.log(e)
    }
  },

  async getMealById(id) {
    try {
      const { data } = await axios(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      return data.meals
    } catch (e) {
      console.log(e)
    }
  }
}

export default Request
