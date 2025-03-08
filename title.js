document.addEventListener('DOMContentLoaded', () => {
  const title = document.title.split('')
  const duration = 15000 // 15 seconds
  const interval = 1000 // update every 100ms
  const steps = duration / interval
  let step = 0

  const initialize = () => {
    step = 0
    setTimeout(() => updateTitleTo(document.title === 'nonration.al' ? 'i.alannorton' : 'nonration.al'), interval * 2)
  }

  const swapLetters = (arr, i, j) => {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  const updateTitleTo = (targetTitle) => {
    const newTitle = targetTitle.split('')
    let done = false

    for (let i = 0; !done && i < title.length - 1; i++) {
      if (title[i] !== newTitle[i]) {
        for (let j = i + 1; !done && j < title.length; j++) {
          if (title[j] === newTitle[i]) {
            swapLetters(title, i, j)
            done = true
          }
        }
      }
    }

    document.title = title.join('')
    step++

    if (step < steps) {
      setTimeout(() => updateTitleTo(targetTitle), interval)
    } else {
      initialize()
    }
  }

  initialize()
})
