import App from './modules/App'
import Search from './modules/Search'
import Slide from './modules/Slide'

if (window.location.href.includes('random.html')) {
  App.init()
} else if (window.location.href.includes('search.html')) {
  Search.init()
} else {
  const slide = new Slide('.container', 3500, -350)

  if (window.innerWidth >= 720) {
    slide.init()
  }
}
