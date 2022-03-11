import elFactory from "../elFactory"
import '../../css/todo.css'

export default function(todoObj) {
    const card = elFactory('li', {class: 'todo-card', tabindex: 0})
    const title = todoObj.title
    const description = todoObj.description
    const dueDate = todoObj.dueDate
    const color = todoObj.color

    const checkbox = elFactory('input', {type: 'checkbox', class: ['todo-check', color], tabindex: 0})
    

    checkbox.addEventListener('change', e => {
        todoObj.done = checkbox.checked
        card.classList.toggle('done')
        if (todoObj.done) {
            specialButton.innerHTML = `
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            `
        } else {
            specialButton.innerHTML = `
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
            `
        }
    })

    const infoWrapper = elFactory('div', {class: 'infoWrapper'})
    const detailsWrapper = elFactory('div', {class: 'detailsWrapper'})
    const descWrapper = elFactory('div', {class: 'descWrapper'})

    const titleEl = elFactory('p', {class: 'todo-title'}, title)
    const descriptionEl = elFactory('p', {class: 'todo-description', title: description}, description)
    const dueDateEl = elFactory('p', {class: 'todo-dueDate'}, dueDate)
    const colorEl = elFactory('div', {class: ['todo-color', todoObj.color]})
    const colorWrap = elFactory('div', {class: 'todo-color-wrapper'})
    const handle = elFactory('div', {class: 'handle'}, ` 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="dots-vertical 1">
                <path id="Vector" d="M9 16C9.53043 16 10.0391 16.2107 10.4142 16.5858C10.7893 16.9609 11 17.4696 11 18C11 18.5304 10.7893 19.0391 10.4142 19.4142C10.0391 19.7893 9.53043 20 9 20C8.46957 20 7.96086 19.7893 7.58579 19.4142C7.21071 19.0391 7 18.5304 7 18C7 17.4696 7.21071 16.9609 7.58579 16.5858C7.96086 16.2107 8.46957 16 9 16ZM9 10C9.53043 10 10.0391 10.2107 10.4142 10.5858C10.7893 10.9609 11 11.4696 11 12C11 12.5304 10.7893 13.0391 10.4142 13.4142C10.0391 13.7893 9.53043 14 9 14C8.46957 14 7.96086 13.7893 7.58579 13.4142C7.21071 13.0391 7 12.5304 7 12C7 11.4696 7.21071 10.9609 7.58579 10.5858C7.96086 10.2107 8.46957 10 9 10V10ZM9 4C9.53043 4 10.0391 4.21071 10.4142 4.58579C10.7893 4.96086 11 5.46957 11 6C11 6.53043 10.7893 7.03914 10.4142 7.41421C10.0391 7.78929 9.53043 8 9 8C8.46957 8 7.96086 7.78929 7.58579 7.41421C7.21071 7.03914 7 6.53043 7 6C7 5.46957 7.21071 4.96086 7.58579 4.58579C7.96086 4.21071 8.46957 4 9 4Z" fill="black"/>
                <path id="Vector_2" d="M15 16C15.5304 16 16.0391 16.2107 16.4142 16.5858C16.7893 16.9609 17 17.4696 17 18C17 18.5304 16.7893 19.0391 16.4142 19.4142C16.0391 19.7893 15.5304 20 15 20C14.4696 20 13.9609 19.7893 13.5858 19.4142C13.2107 19.0391 13 18.5304 13 18C13 17.4696 13.2107 16.9609 13.5858 16.5858C13.9609 16.2107 14.4696 16 15 16ZM15 10C15.5304 10 16.0391 10.2107 16.4142 10.5858C16.7893 10.9609 17 11.4696 17 12C17 12.5304 16.7893 13.0391 16.4142 13.4142C16.0391 13.7893 15.5304 14 15 14C14.4696 14 13.9609 13.7893 13.5858 13.4142C13.2107 13.0391 13 12.5304 13 12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10V10ZM15 4C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6C17 6.53043 16.7893 7.03914 16.4142 7.41421C16.0391 7.78929 15.5304 8 15 8C14.4696 8 13.9609 7.78929 13.5858 7.41421C13.2107 7.03914 13 6.53043 13 6C13 5.46957 13.2107 4.96086 13.5858 4.58579C13.9609 4.21071 14.4696 4 15 4Z" fill="black"/>
            </g>
        </svg>
    `)

    card.appendChild(handle)
    card.appendChild(checkbox)
    colorWrap.appendChild(colorEl)
    descWrapper.appendChild(descriptionEl)

    infoWrapper.appendChild(titleEl)
    infoWrapper.appendChild(detailsWrapper)
    detailsWrapper.appendChild(colorWrap)
    detailsWrapper.appendChild(elFactory('p', {class: 'desc-separator'}, '|'))
    detailsWrapper.appendChild(descWrapper)
    detailsWrapper.appendChild(elFactory('p', {class: 'desc-separator'}, '|'))
    detailsWrapper.appendChild(dueDateEl)

    card.appendChild(infoWrapper)

    const specialButton = elFactory('button', {class: 'todo-button'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>
    `)

    if (todoObj.done) {
        checkbox.checked = true
        specialButton.innerHTML = `
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
        `
    }

    card.appendChild(specialButton)

    
    
    return { card, specialButton }
}