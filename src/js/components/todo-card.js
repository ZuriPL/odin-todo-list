import elFactory from "../elFactory"
import '../../css/todo.css'

export default function(todoObj) {
    const card = elFactory('div', {class: 'todo-card'})
    const title = todoObj.title
    const description = todoObj.description
    const dueDate = todoObj.dueDate
    const color = todoObj.color

    const titleEl = elFactory('p', {class: 'todo-title'}, title)
    const descriptionEl = elFactory('p', {class: 'todo-description'}, description)
    const dueDateEl = elFactory('p', {class: 'todo-dueDate'}, dueDate)
    const colorEl = elFactory('div', {class: 'todo-color'})

    card.appendChild(titleEl)
    card.appendChild(descriptionEl)
    card.appendChild(dueDateEl)
    card.appendChild(colorEl)
    
    return card
}