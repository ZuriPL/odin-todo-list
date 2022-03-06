import elFactory from "../elFactory"
import '../../css/todo-form.css'

export default function() {
    const popupBg = elFactory('div', {class: 'todo-form-bg'})
    const popup = elFactory('div', {class: 'todo-add-popup'})

    popupBg.appendChild(popup)

    return { popup, popupBg }
}