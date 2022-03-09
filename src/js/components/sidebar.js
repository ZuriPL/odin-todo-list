import elFactory from "../elFactory"
import '../../css/sidebar.css'
import projectPopupF from "./project-popup"

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
    const todoDateSortTitle = elFactory('h2', {class: 'sidebar-group-title'}, 'Priority')
    todoDateSort.appendChild(todoDateSortTitle)
    
    const byToday = elFactory('button', {class: 'sidebar-selection'}, 'Today')
    todoDateSort.appendChild(byToday)
    const byWeek = elFactory('button', {class: 'sidebar-selection'}, 'This week')
    todoDateSort.appendChild(byWeek)
    const allTodos = elFactory('button', {class: 'sidebar-selection'}, 'All Todos')
    todoDateSort.appendChild(allTodos)

    selectionWrapper.appendChild(todoDateSort)

    const projectsSort = elFactory('div', {class: 'sidebar-group'})
    const projectsSortTitle = elFactory('h2', {class: 'sidebar-group-title'}, 'Projects')
    const projectsSortTitleWrapper = elFactory('div', {class: 'sidebar-group-title-wrapper'})
    const newProjectButton = elFactory('button', {class: 'sidebar-new-project-btn'}, `
        <svg style="width:48px; height: auto;" viewBox="0 0 24 24">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
    `)
    projectsSortTitleWrapper.appendChild(projectsSortTitle)
    projectsSortTitleWrapper.appendChild(newProjectButton)
    projectsSort.appendChild(projectsSortTitleWrapper)

    selectionWrapper.appendChild(projectsSort)

    newProjectButton.addEventListener('click', e => {
        const { projectPopup, projectPopupBg } = projectPopupF('Add')
        newProjectButton.blur()
        
        
        projectPopup.addEventListener('newProject', e => {
            const newProjectEvent = new CustomEvent('newProject', { detail: e.detail})

            sidebar.dispatchEvent(newProjectEvent)
        })

        document.body.appendChild(projectPopupBg)
    })

    return { sidebar, projectsSort, todoDateSort, projectsSortTitleWrapper, byToday, byWeek, allTodos }
}