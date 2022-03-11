import elFactory from "../elFactory"
import '../../css/todo-form.css'

export default function(ogTodo) {
    console.log(ogTodo)
    const editPopupBg = elFactory('div', {class: 'todo-form-bg'})
    const editPopup = elFactory('div', {class: 'todo-add-popup'})

    const newTodoForm = elFactory('form', {action: 'post'})
    const newTodoFormTitle = elFactory('h2', {id: 'form-title'}, 'Edit a todo')
    const closeButton = elFactory('button', {id: 'form-close', type: 'button'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    `)

    const newTodoNameInput = elFactory('input', {id: 'name-input', type: 'text', required: '', value: ogTodo.title})
    const newTodoDescInput = elFactory('input', {id: 'desc-input', type: 'text', required: '', value: ogTodo.description})
    const newTodoDateInput = elFactory('input', {id: 'date-input', type: 'date', required: '', value: ogTodo.dueDate})
    const newTodoNameLabel = elFactory('label', {class: 'form-label', for: 'name-input'}, 'Name:')
    const newTodoDescLabel = elFactory('label', {class: 'form-label', for: 'desc-input'}, 'Description:')
    const newTodoDateLabel = elFactory('label', {class: 'form-label', for: 'date-input'}, 'Due Date:')
    const newTodoColorLabel = elFactory('label', {class: 'form-label', for: 'color-input'}, 'Priority:')
    
    const colorWrapper = elFactory('div', {class: 'color-wrapper'})
    const todoColorRed = elFactory('input', {type: 'radio', class: 'form-color-btn red', name: 'color-input'})
    const todoColorBlue = elFactory('input', {type: 'radio', class: 'form-color-btn blue', name: 'color-input', checked: ''})
    const todoColorGreen = elFactory('input', {type: 'radio', class: 'form-color-btn green', name: 'color-input'})
    const todoColorOrange = elFactory('input', {type: 'radio', class: 'form-color-btn orange', name: 'color-input'})
    const todoColorPurple = elFactory('input', {type: 'radio', class: 'form-color-btn purple', name: 'color-input'})

    switch (ogTodo.color) {
        case 'red':
            todoColorRed.setAttribute('checked', '')
            break
        case 'orange':
            todoColorOrange.setAttribute('checked', '')
            break
        case 'purple':
            todoColorPurple.setAttribute('checked', '')
            break
        case 'green':
            todoColorGreen.setAttribute('checked', '')
            break
    }

    const submitFormBtn = elFactory('button', {type: 'submit', id: 'form-submit-btn'}, 'Edit')

    colorWrapper.appendChild(todoColorBlue)
    colorWrapper.appendChild(todoColorGreen)
    colorWrapper.appendChild(todoColorOrange)
    colorWrapper.appendChild(todoColorRed)
    colorWrapper.appendChild(todoColorPurple)

    newTodoForm.appendChild(closeButton)
    newTodoForm.appendChild(newTodoFormTitle)
    newTodoForm.appendChild(newTodoNameLabel)
    newTodoForm.appendChild(newTodoNameInput)
    newTodoForm.appendChild(newTodoDescLabel)
    newTodoForm.appendChild(newTodoDescInput)
    newTodoForm.appendChild(newTodoDateLabel)
    newTodoForm.appendChild(newTodoDateInput)
    newTodoForm.appendChild(newTodoColorLabel)
    newTodoForm.appendChild(colorWrapper)
    newTodoForm.appendChild(submitFormBtn)

    editPopup.appendChild(newTodoForm)
    editPopupBg.appendChild(editPopup)

    editPopup.addEventListener('click', e => {
        e.stopPropagation()
    })

    function removeBg(e) {
        if (e instanceof KeyboardEvent && e.key != 'Escape') return
        let isEvent = (e instanceof KeyboardEvent || e instanceof PointerEvent)
        if (e instanceof Event && !isEvent) return
        e.stopPropagation()
        editPopupBg.remove()
        document.body.removeEventListener('keydown', removeBg)
    }

    editPopupBg.addEventListener('click', removeBg)
    closeButton.addEventListener('click', removeBg)
    document.body.addEventListener('keydown', removeBg)
    
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault()
        const newTodoEvent = new CustomEvent('editTodo', { detail: {
            arguments: {
                name: newTodoNameInput.value,
                description: newTodoDescInput.value,
                dueDate: newTodoDateInput.value,
                color: document.querySelector('input[type="radio"]:checked.form-color-btn').getAttribute('class').split(' ')[1]
            }
        }
        })
        editPopup.dispatchEvent(newTodoEvent)
        editPopupBg.remove()
    })

    return { editPopup, editPopupBg }
}