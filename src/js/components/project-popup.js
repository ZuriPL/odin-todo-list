import elFactory from "../elFactory"
import '../../css/project-form.css'

export default function() {
    const projectPopupBg = elFactory('div', {class: 'project-form-bg'})
    const projectPopup = elFactory('div', {class: 'project-add-popup'})

    const newProjectForm = elFactory('form', {action: 'post'})
    const newProjectFormTitle = elFactory('h2', {id: 'form-title'}, 'Add a project')
    const closeButton = elFactory('button', {id: 'form-close', type: 'button'}, `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    `)

    const newProjectNameInput = elFactory('input', {id: 'name-input', type: 'text', required: ''})
    const newProjectNameLabel = elFactory('label', {class: 'form-label', for: 'name-input'}, 'Name')


    const submitFormBtn = elFactory('button', {type: 'submit', id: 'form-submit-btn'}, 'Add')

    newProjectForm.appendChild(closeButton)
    newProjectForm.appendChild(newProjectFormTitle)
    newProjectForm.appendChild(newProjectNameLabel)
    newProjectForm.appendChild(newProjectNameInput)
    newProjectForm.appendChild(submitFormBtn)

    projectPopup.appendChild(newProjectForm)
    projectPopupBg.appendChild(projectPopup)

    projectPopup.addEventListener('click', e => {
        e.stopPropagation()
    })

    function removeBg(e) {
        if (e instanceof KeyboardEvent && e.key != 'Escape') return
        let isEvent = (e instanceof KeyboardEvent || e instanceof PointerEvent)
        if (e instanceof Event && !isEvent) return
        e.stopPropagation()
        projectPopupBg.remove()
        document.body.removeEventListener('keydown', removeBg)
    }

    projectPopupBg.addEventListener('click', removeBg)
    closeButton.addEventListener('click', removeBg)
    document.body.addEventListener('keydown', removeBg)
    
    newProjectForm.addEventListener('submit', e => {
        e.preventDefault()
        const newProjectEvent = new CustomEvent('newProject', { detail: {
            name: newProjectNameInput.value
        }
        })
        projectPopup.dispatchEvent(newProjectEvent)
        projectPopupBg.remove()
    })

    return { projectPopup, projectPopupBg }
}