/* h/t @DotOnion - https://codepen.io/alvarotrigo/pen/eYEqPZa */

const words = ['nonration.al', 'i.alannorton']
const morphTime = 15
const cooldownTime = 1

let textIndex = words.length - 1
let time = new Date()
let morph = 0
let cooldown = cooldownTime

const doMorph = () => {
  morph -= cooldown
  cooldown = 0

  let fraction = morph / morphTime

  if (fraction > 1) {
    cooldown = cooldownTime
    fraction = 1
  }

  setMorph(fraction)
}

const getEls = () => ({
  curr: document.getElementById('curr'),
  prev: document.getElementById('prev'),
})

const setMorph = (fraction) => {
  const els = getEls()

  els.prev.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
  els.prev.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

  fraction = 1 - fraction
  els.curr.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
  els.curr.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

  els.curr.textContent = words[textIndex % words.length]
  els.prev.textContent = words[(textIndex + 1) % words.length]
}

const doCooldown = () => {
  const els = getEls()

  morph = 0

  els.prev.style.filter = ''
  els.prev.style.opacity = '100%'

  els.curr.style.filter = ''
  els.curr.style.opacity = '0%'
}

const animate = () => {
  requestAnimationFrame(animate)

  let newTime = new Date()
  let shouldIncrementIndex = cooldown > 0
  let dt = (newTime - time) / 1000
  time = newTime

  cooldown -= dt

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++
    }

    doMorph()
  } else {
    doCooldown()
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const els = getEls()

  els.curr.textContent = words[1]
  els.prev.textContent = words[0]

  animate()
})
