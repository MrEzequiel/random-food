const Request = {
  meal: async () => {
    const { data } = await axios(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    )
    return data.meals
  }
}

export default Request
