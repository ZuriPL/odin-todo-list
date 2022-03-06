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
    
    const todoDateSort = elFactory('div', {class: 'sidebar-group'})
    const todoDateSortTitle = elFactory('h2', {class: 'sidebar-group-title'})
    todoDateSortTitle.textContent = 'Priority'
    todoDateSort.appendChild(todoDateSortTitle)
    
    const byToday = elFactory('button', {class: 'sidebar-selection'}, 'Today')
    todoDateSort.appendChild(byToday)
    const byWeek = elFactory('button', {class: 'sidebar-selection'}, 'This week')
    todoDateSort.appendChild(byWeek)
    const allTodos = elFactory('button', {class: 'sidebar-selection'}, 'All Todos')
    todoDateSort.appendChild(allTodos)

    selectionWrapper.appendChild(todoDateSort)

    const projectsSort = elFactory('div', {class: 'sidebar-group'})
    const projectsSortTitle = elFactory('h2', {class: 'sidebar-group-title'})
    projectsSortTitle.textContent = 'Projects'
    projectsSort.appendChild(projectsSortTitle)

    selectionWrapper.appendChild(projectsSort)

    return { sidebar, projectsSort, todoDateSort, projectsSortTitle, byToday, byWeek, allTodos }
}