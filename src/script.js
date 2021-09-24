import { App } from './modules/App.js'
import { Search } from './modules/Search.js'

if (window.location.href.includes('random.html')) {
  App.init()
} else {
  Search.init()
}
