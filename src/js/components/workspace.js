import elFactory from "../elFactory"
import '../../css/workspace.css'
import todoPopupF from "./todo-popup"

export default function() {
    const workspace = elFactory('div', {id: 'workspace'})
    const addTodoButton = elFactory('button', {id: 'workspace-add-btn'}, `
        <svg style="width:48px; height: auto;" viewBox="0 0 24 24">
            <path fill="var(--accent-color)" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
    `)
    addTodoButton.addEventListener('click', e => {
        const { popup, popupBg } = todoPopupF()
        
        document.body.appendChild(popupBg)
    })

    workspace.appendChild(addTodoButton)

    return { workspace, addTodoButton }
}