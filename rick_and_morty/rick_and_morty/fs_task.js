window.addEventListener('DOMContentLoaded', () => {

  const searchInput = document.querySelector('.search-input')
  const allLinks = document.querySelectorAll('a')
  const resultList = document.querySelector('.search-result')
  const resultCounter = document.querySelector('.result-counter')

  class Search {

    constructor() {
      this.filteredLinks = []
      this.counter = 0
    }

    findWord(event) {
      const target = event.target
      const filteredArr = Array.from(allLinks).filter(link => {
        if (link.textContent.trim().toLowerCase().includes(target.value.trim().toLowerCase())) {
          return link
        }
      })
      if (target.value.trim().length > 0) {
        filteredArr.forEach(link => {
          let element = `<li><a href="${link.href}">${link.textContent}</a></li>`
          if (element.trim().toLowerCase().includes(target.value.trim())) {
            element = element.replace(target.value.trim(), `<span class="text-highlighted">${target.value.trim()}</span>`)
          }
          this.filteredLinks.push(element)
        })
      } else {
        resultList.textContent = ''
      }
      this.counter = this.filteredLinks.length
      resultList.innerHTML = this.filteredLinks.join('')
      if (this.counter > 0) {
        resultCounter.textContent = `Найдено ${this.counter} совпадений`
      } else {
        resultCounter.textContent = 'Ничего не найдено'
      }
      this.filteredLinks = []
    }
  }

  const search = new Search()


  searchInput.addEventListener('input', event => {
    search.findWord(event)
  })
})
