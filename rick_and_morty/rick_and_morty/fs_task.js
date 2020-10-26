class Search {
  constructor(allLinks, resultList, resultCounter) {
    this.filteredLinks = []
    this.counter = 0
    this.allLinks = allLinks
    this.resultList = resultList
    this.resultCounter = resultCounter
  }

  findWord(event) {
    const string = event.target.value
    const filteredArr = Array.from(this.allLinks).filter(link => {
      if (link.textContent.trim().toLowerCase().includes(string.trim().toLowerCase())) {
        return link
      }
    })
    if (string.trim().length > 0) {
      filteredArr.forEach(link => {
        let element = link.textContent
        const reg = new RegExp(string.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'), 'gi');
        const result = element.replace(reg, str => `<span class="text-highlighted">${str}</span>`)
        element = `<li><a href="${link.href}">${result}</a></li>`

        this.filteredLinks.push(element)
      })
    } else {
      this.resultList.textContent = ''
    }
    this.counter = this.filteredLinks.length
    this.resultList.innerHTML = this.filteredLinks.join('')
    if (this.counter > 0) {
      this.resultCounter.textContent = `Найдено ${this.counter} совпадений`
    } else {
      this.resultCounter.textContent = 'Ничего не найдено'
    }
    this.filteredLinks = []
  }
}

function loadContent() {
  const searchInput = document.querySelector('.search-input')
  const allLinks = document.querySelectorAll('a')
  const resultList = document.querySelector('.search-result')
  const resultCounter = document.querySelector('.result-counter')

  const search = new Search(allLinks, resultList, resultCounter)

  searchInput.addEventListener('input', event => {
    search.findWord(event)
  })
}

window.addEventListener('DOMContentLoaded', loadContent)


