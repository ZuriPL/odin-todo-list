import elFactory from "../elFactory"
import '../../css/topbar.css'
import { toPlainObject } from "lodash"

export default function() {
    const topbar = elFactory('div', {id: 'topbar'})
    
    const hamburgerMenu = elFactory('button', {class: 'hamburger'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
    `)

    function handleSidebarClose(e) {
        if (e.path.includes(document.querySelector('#sidebar'))) return
        e.stopPropagation();
        e.preventDefault();
        document.body.removeEventListener('click', handleSidebarClose, true)
        document.querySelector('#sidebar').classList.remove('open')
    }

    hamburgerMenu.addEventListener('click', e => {
        document.querySelector('#sidebar').classList.add('open')
        setTimeout(() => document.body.addEventListener('click', handleSidebarClose, true), 0)
    })

    const search = elFactory('input', {id: 'searchbar', type: 'search', placeholder: 'Search for a todo in your project'})
    const searchWrap = elFactory('div', {id: 'search-wrapper'})
    const searchIcon = elFactory('label', {for: 'searchbar'})
    searchIcon.innerHTML = `
        <svg style="width: 24px; height: auto;" viewBox="0 0 24 24">
            <path fill="var(--accent-color)" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
    `
    searchWrap.appendChild(searchIcon)
    searchWrap.appendChild(search)

    topbar.appendChild(hamburgerMenu)
    topbar.appendChild(searchWrap)

    const themeToggleButton = elFactory('button', {id: 'theme-switch', style: 'height: 24px;'})
    const lightIcon = `
    <svg style="height: 24px; width: 24px;" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.996 12.882c0.022-0.233-0.038-0.476-0.188-0.681-0.325-0.446-0.951-0.544-1.397-0.219-0.95 0.693-2.059 1.086-3.188 1.162-0.696 0.047-1.399-0.027-2.077-0.226-0.656-0.192-1.29-0.501-1.874-0.932-0.655-0.484-1.181-1.074-1.575-1.729-0.409-0.68-0.676-1.432-0.792-2.206s-0.082-1.571 0.11-2.342c0.184-0.741 0.514-1.46 0.999-2.115 0.142-0.191 0.216-0.435 0.191-0.691-0.053-0.55-0.542-0.952-1.092-0.898-1.117 0.109-2.186 0.399-3.172 0.843-1.005 0.452-1.925 1.065-2.723 1.808-0.883 0.82-1.618 1.801-2.159 2.901-0.523 1.064-0.863 2.238-0.978 3.485-0.125 1.347 0.024 2.658 0.402 3.878 0.392 1.266 1.031 2.431 1.863 3.433s1.86 1.843 3.033 2.461c1.13 0.595 2.392 0.982 3.739 1.106s2.659-0.025 3.878-0.403c1.266-0.392 2.431-1.031 3.433-1.863s1.843-1.86 2.461-3.033c0.595-1.13 0.982-2.392 1.106-3.739zM19.567 14.674c-0.126 0.351-0.276 0.689-0.447 1.014-0.493 0.937-1.166 1.76-1.969 2.427s-1.735 1.178-2.747 1.491c-0.973 0.302-2.021 0.421-3.102 0.321s-2.089-0.41-2.99-0.884c-0.937-0.493-1.76-1.166-2.427-1.969s-1.178-1.735-1.491-2.747c-0.302-0.973-0.421-2.021-0.321-3.102 0.092-1 0.365-1.938 0.782-2.786 0.43-0.878 1.018-1.661 1.725-2.319 0.64-0.595 1.377-1.086 2.183-1.449 0.179-0.081 0.362-0.155 0.548-0.223-0.092 0.257-0.171 0.516-0.236 0.778-0.256 1.029-0.302 2.091-0.147 3.121s0.51 2.032 1.056 2.941c0.527 0.875 1.23 1.663 2.1 2.306 0.775 0.573 1.622 0.986 2.5 1.243 0.907 0.266 1.846 0.364 2.772 0.302 0.752-0.050 1.496-0.207 2.21-0.465z"></path>
    </svg>
    `
    const darkIcon = `
    <svg style="height: 24px; width: 24px;" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 12c0-0.811-0.161-1.587-0.455-2.295-0.304-0.735-0.75-1.395-1.303-1.948-0.552-0.552-1.213-0.998-1.948-1.303-0.707-0.293-1.483-0.454-2.294-0.454s-1.587 0.161-2.295 0.455c-0.735 0.304-1.395 0.75-1.948 1.302s-0.998 1.213-1.302 1.948c-0.294 0.708-0.455 1.484-0.455 2.295s0.161 1.587 0.455 2.295c0.304 0.735 0.75 1.395 1.303 1.948 0.552 0.552 1.213 0.998 1.948 1.303 0.707 0.293 1.483 0.454 2.294 0.454s1.587-0.161 2.295-0.455c0.735-0.304 1.395-0.75 1.948-1.303s0.998-1.213 1.303-1.948c0.293-0.707 0.454-1.483 0.454-2.294zM16 12c0 0.544-0.108 1.060-0.303 1.529-0.202 0.489-0.5 0.929-0.869 1.299s-0.81 0.667-1.299 0.869c-0.469 0.195-0.985 0.303-1.529 0.303s-1.060-0.108-1.529-0.303c-0.489-0.202-0.929-0.5-1.299-0.869s-0.667-0.81-0.869-1.299c-0.195-0.469-0.303-0.985-0.303-1.529s0.108-1.060 0.303-1.529c0.202-0.489 0.5-0.929 0.869-1.299s0.81-0.667 1.299-0.869c0.469-0.195 0.985-0.303 1.529-0.303s1.060 0.108 1.529 0.303c0.489 0.202 0.929 0.5 1.299 0.869s0.667 0.81 0.869 1.299c0.195 0.469 0.303 0.985 0.303 1.529zM11 1v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 21v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1zM3.513 4.927l1.42 1.42c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-1.42-1.42c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM17.653 19.067l1.42 1.42c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-1.42-1.42c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM1 13h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM21 13h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM4.927 20.487l1.42-1.42c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-1.42 1.42c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0zM19.067 6.347l1.42-1.42c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-1.42 1.42c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
    </svg>
    `
    topbar.appendChild(themeToggleButton)


    let isLight = localStorage.getItem('theme_preference') == 'dark' ? true : false
    function switchTheme() {
        isLight = !isLight
        if (isLight) {
            document.querySelector(':root').style = '--text: #000; --bg-1: var(--light-100); --bg-2: var(--light-200); --bg-3: var(--light-300); --bg-alpha: var(--light-alpha); --text-secondary: var(--light-secondary);'
            document.querySelector('body').classList.remove('dark')
            themeToggleButton.innerHTML = darkIcon
            localStorage.setItem('theme_preference', 'light')
        } else {
            document.querySelector(':root').style = '--text: #fff; --bg-1: var(--dark-100); --bg-2: var(--dark-200); --bg-3: var(--dark-300); --bg-alpha: var(--dark-alpha); --text-secondary: var(--dark-secondary);'
            document.querySelector('body').classList.add('dark')
            themeToggleButton.innerHTML = lightIcon
            localStorage.setItem('theme_preference', 'dark')
        }
    }
    switchTheme()

    themeToggleButton.addEventListener('click', switchTheme)
    
    return topbar
}