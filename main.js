import Request from './src/Requests.js'
import { View } from './src/View.js'

const App = {
  init: async () => {
    const meal = await Request.meal()
    console.log(meal[0])
    View.render(meal[0])
  }
}

document.querySelector('.random button').addEventListener('click', () => {
  App.init()
})

App.init()
