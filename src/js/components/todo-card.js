import elFactory from "../elFactory"
import '../../css/todo.css'

export default function(todoObj) {
    const card = elFactory('div', {class: 'todo-card'})
    const title = todoObj.title
    const description = todoObj.description
    const dueDate = todoObj.dueDate
    const color = todoObj.color

    const checkbox = elFactory('input', {type: 'checkbox', class: ['todo-check', color]})


    const infoWrapper = elFactory('div', {class: 'infoWrapper'})
    const detailsWrapper = elFactory('div', {class: 'detailsWrapper'})
    const descWrapper = elFactory('div', {class: 'descWrapper'})

    const titleEl = elFactory('p', {class: 'todo-title'}, title)
    const descriptionEl = elFactory('p', {class: 'todo-description'}, description)
    const dueDateEl = elFactory('p', {class: 'todo-dueDate'}, dueDate)
    const colorEl = elFactory('div', {class: ['todo-color', todoObj.color]})
    const colorWrap = elFactory('div', {class: 'todo-color-wrapper'})

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

    const deleteButton = elFactory('button', {class: 'todo-delete-button'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    `)
    card.appendChild(deleteButton)

    card.addEventListener('click', e => {
        console.log(card)
    })

    
    
    return { card, deleteButton }
}