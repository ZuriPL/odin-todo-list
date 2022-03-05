import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'


const sidebar = sidebarF()
const { topbar, themeToggleButton, lightIcon, darkIcon } = topbarF()


let isLight = false
function switchTheme() {
    isLight = !isLight
    if (isLight) {
        document.querySelector(':root').style = '--text: black; --bg-1: var(--light-100); --bg-3: var(--light-300);'
        themeToggleButton.innerHTML = darkIcon
    } else {
        document.querySelector(':root').style = '--text: white; --bg-1: var(--dark-100); --bg-3: var(--dark-300);'
        themeToggleButton.innerHTML = lightIcon
    }
}
switchTheme()

document.body.appendChild(sidebar)
document.body.appendChild(topbar)

document.querySelector('#theme-switch').addEventListener('click', _ => {
    switchTheme()
})

setTimeout(_ => document.querySelector('body').classList.add('animations'), 250)
