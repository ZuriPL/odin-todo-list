import elFactory from "../elFactory"
import '../../css/sidebar.css'

export default function() {
    const sidebar = elFactory('div', {id: 'sidebar'})
    const titleWrapper = elFactory('div', {id: 'site-name'})
    const title = elFactory('h1')
    title.innerHTML = "Todo-<span>List</span>"
    titleWrapper.appendChild(title)
    sidebar.appendChild(titleWrapper)
    const selectionWrapper = elFactory('div', {id: 'selection-wrapper'})
    sidebar.appendChild(selectionWrapper)
    
    return sidebar
}