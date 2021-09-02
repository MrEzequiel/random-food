const Request = {
  meal: async () => {
    try {
      const { data } = await axios(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      )
      return data.meals
    } catch (e) {
      console.log(e)
    }
  }
}

export default Request
