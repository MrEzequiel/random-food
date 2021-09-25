import App from './modules/App'
import Search from './modules/Search'

if (window.location.href.includes('random.html')) {
  App.init()
} else {
  Search.init()
}
