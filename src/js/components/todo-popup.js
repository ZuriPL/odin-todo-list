import elFactory from "../elFactory"
import '../../css/todo-form.css'

export default function() {
    const popupBg = elFactory('div', {class: 'todo-form-bg'})
    const popup = elFactory('div', {class: 'todo-add-popup'})

    const newTodoForm = elFactory('form', {action: 'post'})
    const newTodoFormTitle = elFactory('h2', {id: 'form-title'}, 'Add a todo')
    const closeButton = elFactory('button', {id: 'form-close', type: 'button'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    `)

    const newTodoNameInput = elFactory('input', {id: 'name-input', type: 'text'})
    const newTodoDescInput = elFactory('input', {id: 'desc-input', type: 'text'})
    const newTodoDateInput = elFactory('input', {id: 'date-input', type: 'date'})
    const newTodoNameLabel = elFactory('label', {class: 'form-label', for: 'name-input'}, 'Name')
    const newTodoDescLabel = elFactory('label', {class: 'form-label', for: 'desc-input'}, 'Description')
    const newTodoDateLabel = elFactory('label', {class: 'form-label', for: 'date-input'}, 'Description')
    
    const colorWrapper = elFactory('div', {class: 'color-wrapper'})
    const todoColorRed = elFactory('input', {type: 'radio', class: 'form-color-btn red', name: 'color-input'})
    const todoColorBlue = elFactory('input', {type: 'radio', class: 'form-color-btn blue', name: 'color-input'})
    const todoColorGreen = elFactory('input', {type: 'radio', class: 'form-color-btn green', name: 'color-input'})
    const todoColorOrange = elFactory('input', {type: 'radio', class: 'form-color-btn orange', name: 'color-input'})
    const todoColorPurple = elFactory('input', {type: 'radio', class: 'form-color-btn purple', name: 'color-input'})
    const todoColorYellow = elFactory('input', {type: 'radio', class: 'form-color-btn yellow', name: 'color-input'})

    const submitFormBtn = elFactory('button', {type: 'button', id: 'form-submit-btn'}, 'Add')

    colorWrapper.appendChild(todoColorRed)
    colorWrapper.appendChild(todoColorBlue)
    colorWrapper.appendChild(todoColorGreen)
    colorWrapper.appendChild(todoColorOrange)
    colorWrapper.appendChild(todoColorPurple)
    colorWrapper.appendChild(todoColorYellow)

    newTodoForm.appendChild(closeButton)
    newTodoForm.appendChild(newTodoFormTitle)
    newTodoForm.appendChild(newTodoNameLabel)
    newTodoForm.appendChild(newTodoNameInput)
    newTodoForm.appendChild(newTodoDescLabel)
    newTodoForm.appendChild(newTodoDescInput)
    newTodoForm.appendChild(newTodoDateLabel)
    newTodoForm.appendChild(newTodoDateInput)
    newTodoForm.appendChild(colorWrapper)
    newTodoForm.appendChild(submitFormBtn)

    popup.appendChild(newTodoForm)
    popupBg.appendChild(popup)

    popup.addEventListener('click', e => {
        e.stopPropagation()
    })

    popupBg.addEventListener('click', e => {
        e.stopPropagation()
        popupBg.remove()
    })

    closeButton.addEventListener('click', e => {
        e.preventDefault()
        popupBg.remove()
    })

    return { popup, popupBg }
}