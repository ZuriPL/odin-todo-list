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

    const projectsSort = elFactory('ul', {class: 'sidebar-group'})
    const projectsSortTitle = elFactory('h2', {class: 'sidebar-group-title'}, 'Projects')
    const projectsSortTitleWrapper = elFactory('div', {class: 'sidebar-group-title-wrapper'})
    const handle = elFactory('div', {class: 'handle'}, ` 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="dots-vertical 1">
                <path id="Vector" d="M9 16C9.53043 16 10.0391 16.2107 10.4142 16.5858C10.7893 16.9609 11 17.4696 11 18C11 18.5304 10.7893 19.0391 10.4142 19.4142C10.0391 19.7893 9.53043 20 9 20C8.46957 20 7.96086 19.7893 7.58579 19.4142C7.21071 19.0391 7 18.5304 7 18C7 17.4696 7.21071 16.9609 7.58579 16.5858C7.96086 16.2107 8.46957 16 9 16ZM9 10C9.53043 10 10.0391 10.2107 10.4142 10.5858C10.7893 10.9609 11 11.4696 11 12C11 12.5304 10.7893 13.0391 10.4142 13.4142C10.0391 13.7893 9.53043 14 9 14C8.46957 14 7.96086 13.7893 7.58579 13.4142C7.21071 13.0391 7 12.5304 7 12C7 11.4696 7.21071 10.9609 7.58579 10.5858C7.96086 10.2107 8.46957 10 9 10V10ZM9 4C9.53043 4 10.0391 4.21071 10.4142 4.58579C10.7893 4.96086 11 5.46957 11 6C11 6.53043 10.7893 7.03914 10.4142 7.41421C10.0391 7.78929 9.53043 8 9 8C8.46957 8 7.96086 7.78929 7.58579 7.41421C7.21071 7.03914 7 6.53043 7 6C7 5.46957 7.21071 4.96086 7.58579 4.58579C7.96086 4.21071 8.46957 4 9 4Z" fill="black"/>
                <path id="Vector_2" d="M15 16C15.5304 16 16.0391 16.2107 16.4142 16.5858C16.7893 16.9609 17 17.4696 17 18C17 18.5304 16.7893 19.0391 16.4142 19.4142C16.0391 19.7893 15.5304 20 15 20C14.4696 20 13.9609 19.7893 13.5858 19.4142C13.2107 19.0391 13 18.5304 13 18C13 17.4696 13.2107 16.9609 13.5858 16.5858C13.9609 16.2107 14.4696 16 15 16ZM15 10C15.5304 10 16.0391 10.2107 16.4142 10.5858C16.7893 10.9609 17 11.4696 17 12C17 12.5304 16.7893 13.0391 16.4142 13.4142C16.0391 13.7893 15.5304 14 15 14C14.4696 14 13.9609 13.7893 13.5858 13.4142C13.2107 13.0391 13 12.5304 13 12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10V10ZM15 4C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6C17 6.53043 16.7893 7.03914 16.4142 7.41421C16.0391 7.78929 15.5304 8 15 8C14.4696 8 13.9609 7.78929 13.5858 7.41421C13.2107 7.03914 13 6.53043 13 6C13 5.46957 13.2107 4.96086 13.5858 4.58579C13.9609 4.21071 14.4696 4 15 4Z" fill="black"/>
            </g>
        </svg>
    `)
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