import elFactory from "../elFactory"
import '../../css/sidebar.css'

export default function() {
    const sidebar = elFactory('div', {id: 'sidebar'})
    const title = elFactory('h1', {id: 'site-name'})
    title.innerHTML = "TABLE<span>.DO</span>"
    sidebar.appendChild(title)
    const selectionWrapper = elFactory('div', {id: 'selection-wrapper'})
    sidebar.appendChild(selectionWrapper)
    
    return sidebar
}