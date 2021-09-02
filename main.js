import Request from './src/Requests.js'
import { View } from './src/View.js'

const App = {
  init: async () => {
    View.renderLoading()
    const meal = await Request.meal()
    View.render(meal[0])

    document.querySelector('.random').addEventListener('click', () => {
      App.init()
    })
  }
}

App.init()

export { App }
