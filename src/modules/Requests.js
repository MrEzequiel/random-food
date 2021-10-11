import axios from 'axios'

const Request = {
  async meal() {
    try {
      const { data } = await axios(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      )
      return data.meals
    } catch (e) {
      console.log(e)
      return null
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
      return null
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
      return null
    }
  },
}

export default Request
