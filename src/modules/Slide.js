export default class Slide {
  constructor(container, time, width) {
    this.container = document.querySelector(container)
    this.time = time
    this.width = width
  }

  slide() {
    let count = 0
    setInterval(() => {
      if (this.slides.length - 1 === count) {
        count = 0
      } else {
        count += 1
      }

      this.container.style.transform = `translate3d(${this.slides[count].transform}px,0,0)`
    }, this.time)
  }

  slideConfig() {
    this.slides = [...this.container.children].map((slide, index) => ({
      slide,
      position: index,
      transform: index * this.width,
    }))
  }

  init() {
    this.slideConfig()
    this.slide()
    return this
  }
}
