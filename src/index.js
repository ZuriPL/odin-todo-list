import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'
import workspaceF from './js/components/workspace'
import todoCardF from './js/components/todo-card'
import editPopupF from './js/components/edit-popup'
import projectPopupF from './js/components/project-popup'
import Sortable from 'sortablejs'


const { sidebar, projectsSort, projectsSortTitleWrapper, todoDateSort, byToday, byWeek, allTodos } = sidebarF()
const topbar = topbarF()
const { workspace, addTodoButton } = workspaceF()

const displayController = (() => {
    const createPage = () => {
        document.body.innerHTML = ''
        
        document.body.appendChild(sidebar)
        document.body.appendChild(topbar)
        document.body.appendChild(workspace)

        let sortableTodos = Sortable.create(workspace, {
            handle: '.handle',
            animation: 200
        })
        // let sortableProjects = Sortable.create(projectsSort, {
        //     handle: '.handle',
        //     animation: 150
        // })
        
        let today = new Date()
        today = today.toLocaleDateString().split('.')
        if (today[0].toString().length == 1) {
            today[0] = '0' + today[0]
        }
        today = `${today[2]}-${today[1]}-${today[0]}`

        logicController.makeTodo('Welcome to Todo-List', 'This project was made for The Odin Project', today, 'blue')
        logicController.makeTodo('The sidebar on the left has your projects....', '...and a few shortcuts for your convienence too', today, 'blue')
        logicController.makeTodo('All of your todos are laid out in this section', 'And they are saved after you close your browser window', today, 'blue')
        logicController.makeTodo('Add a new todo using the button in the bottom-right corner', 'Have fun!', today, 'blue')

        displayController.renderTodos()
        displayController.renderProjectsButtons()
        setTimeout(_ => document.querySelector('body').classList.add('animations'), 250)

        allTodos.addEventListener('click', e => {
            displayController.renderTodos2(logicController.getAllTodos)
            Array.from(projectsSort.children).forEach(btn => btn.classList.remove('active'))
            Array.from(todoDateSort.children).forEach(btn => btn.classList.remove('active'))
            allTodos.classList.add('active')
        })

        byToday.addEventListener('click', e => {
            logicController.viewCertainTodos(logicController.getAllTodos())
            Array.from(projectsSort.children).forEach(btn => btn.classList.remove('active'))
            Array.from(todoDateSort.children).forEach(btn => btn.classList.remove('active'))
            byToday.classList.add('active')
        })

        byWeek.addEventListener('click', e => {
            logicController.viewCertainTodos(logicController.getAllTodos())
            Array.from(projectsSort.children).forEach(btn => btn.classList.remove('active'))
            Array.from(todoDateSort.children).forEach(btn => btn.classList.remove('active'))
            byWeek.classList.add('active')
        })

        workspace.addEventListener('newTodo', e => {
            logicController.makeTodo(e.detail.arguments.name, e.detail.arguments.description, e.detail.arguments.dueDate, e.detail.arguments.color)
        })

        sidebar.addEventListener('newProject', e => {
            logicController.makeProject(e.detail.name)
        })
    }

    const renderProjectsButtons = () => {
        projectsSort.innerHTML = '';
        projectsSort.appendChild(projectsSortTitleWrapper)
        logicController.projectsArray.forEach(project => {
            const projectButton = elFactory('button', {class: 'sidebar-project-selection'}, project.name)
            const projectButtonWrapper = elFactory('li', {class: 'sidebar-selection-wrapper'})
            const projectButtonEdit = elFactory('button', {class: 'sidebar-edit edit-btn'}, `
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
            `)
            const handle = elFactory('div', {class: 'handle'}, ` 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="dots-vertical 1">
                        <path id="Vector" d="M9 16C9.53043 16 10.0391 16.2107 10.4142 16.5858C10.7893 16.9609 11 17.4696 11 18C11 18.5304 10.7893 19.0391 10.4142 19.4142C10.0391 19.7893 9.53043 20 9 20C8.46957 20 7.96086 19.7893 7.58579 19.4142C7.21071 19.0391 7 18.5304 7 18C7 17.4696 7.21071 16.9609 7.58579 16.5858C7.96086 16.2107 8.46957 16 9 16ZM9 10C9.53043 10 10.0391 10.2107 10.4142 10.5858C10.7893 10.9609 11 11.4696 11 12C11 12.5304 10.7893 13.0391 10.4142 13.4142C10.0391 13.7893 9.53043 14 9 14C8.46957 14 7.96086 13.7893 7.58579 13.4142C7.21071 13.0391 7 12.5304 7 12C7 11.4696 7.21071 10.9609 7.58579 10.5858C7.96086 10.2107 8.46957 10 9 10V10ZM9 4C9.53043 4 10.0391 4.21071 10.4142 4.58579C10.7893 4.96086 11 5.46957 11 6C11 6.53043 10.7893 7.03914 10.4142 7.41421C10.0391 7.78929 9.53043 8 9 8C8.46957 8 7.96086 7.78929 7.58579 7.41421C7.21071 7.03914 7 6.53043 7 6C7 5.46957 7.21071 4.96086 7.58579 4.58579C7.96086 4.21071 8.46957 4 9 4Z" fill="black"/>
                        <path id="Vector_2" d="M15 16C15.5304 16 16.0391 16.2107 16.4142 16.5858C16.7893 16.9609 17 17.4696 17 18C17 18.5304 16.7893 19.0391 16.4142 19.4142C16.0391 19.7893 15.5304 20 15 20C14.4696 20 13.9609 19.7893 13.5858 19.4142C13.2107 19.0391 13 18.5304 13 18C13 17.4696 13.2107 16.9609 13.5858 16.5858C13.9609 16.2107 14.4696 16 15 16ZM15 10C15.5304 10 16.0391 10.2107 16.4142 10.5858C16.7893 10.9609 17 11.4696 17 12C17 12.5304 16.7893 13.0391 16.4142 13.4142C16.0391 13.7893 15.5304 14 15 14C14.4696 14 13.9609 13.7893 13.5858 13.4142C13.2107 13.0391 13 12.5304 13 12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10V10ZM15 4C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6C17 6.53043 16.7893 7.03914 16.4142 7.41421C16.0391 7.78929 15.5304 8 15 8C14.4696 8 13.9609 7.78929 13.5858 7.41421C13.2107 7.03914 13 6.53043 13 6C13 5.46957 13.2107 4.96086 13.5858 4.58579C13.9609 4.21071 14.4696 4 15 4Z" fill="black"/>
                    </g>
                </svg>
            `)

            projectButtonEdit.addEventListener('click', e => {
                e.stopPropagation()
            })

            projectButtonWrapper.appendChild(handle)
            projectButtonWrapper.appendChild(projectButton)
            projectButtonWrapper.appendChild(projectButtonEdit)


            projectButtonWrapper.addEventListener('click', e => {
                logicController.changeProject(logicController.projectsArray.indexOf(project))
                Array.from(projectsSort.children).forEach(btn => btn.classList.remove('active'))
                Array.from(todoDateSort.children).forEach(btn => btn.classList.remove('active'))
                projectButtonWrapper.classList.add('active')
            })

            projectButtonEdit.addEventListener('click', e => {
                const { projectPopup, projectPopupBg } = projectPopupF('Edit')
                projectButtonEdit.blur()
                
                projectPopup.addEventListener('newProject', e => {
                    project.name = e.detail.name
                    renderProjectsButtons()
                })
                projectPopup.addEventListener('delProject', e => {
                    logicController.projectsArray.splice(logicController.projectsArray.indexOf(project), 1)
                    renderProjectsButtons()
                    if (!logicController.projectsArray.includes(logicController.currentProject)) {
                        projectsSort.children[1].click()
                    }
                })
                
                document.body.appendChild(projectPopupBg)
            })

            projectsSort.appendChild(projectButtonWrapper)
        })
        projectsSort.children[logicController.projectsArray.indexOf(logicController.getCurrentProject()) + 1].classList.add('active')
    }

    const renderTodos = () => {
        workspace.innerHTML = ''
        workspace.appendChild(addTodoButton)
        logicController.getCurrentProject().todos.forEach(todo => {
            const { card, specialButton } = todoCardF(todo)
            card.setAttribute('index', logicController.getCurrentProject().todos.indexOf(todo))
            if (todo.done) {
                card.classList.add('done')
            }
            workspace.appendChild(card)
            specialButton.addEventListener('click', e => {
                if (todo.done) {
                    e.stopPropagation()
                    logicController.removeTodo(todo, card.getAttribute('index'))
                    displayController.renderTodos()
                } else {
                    console.log(todo)

                    const { editPopup, editPopupBg } = editPopupF()
                    specialButton.blur()
                    
                    editPopup.addEventListener('editTodo', e => {
                        console.log(e)
                        console.log(todo.project.todos.indexOf(todo))
                        todo.project.todos[todo.project.todos.indexOf(todo)] = new Todo(e.detail.arguments.name, e.detail.arguments.description, e.detail.arguments.dueDate, e.detail.arguments.color)
                        renderTodos()
                    })
            
                    document.body.appendChild(editPopupBg)
                }
            })
        })
    }
    const renderTodos2 = (projectFn) => {
        let project = projectFn()
        workspace.innerHTML = ''
        workspace.appendChild(addTodoButton)
        project.forEach(todo => {
            const { card, specialButton } = todoCardF(todo)
            card.setAttribute('index', todo.project.todos.indexOf(todo))
            if (todo.done) {
                card.classList.add('done')
            }
            workspace.appendChild(card)
            specialButton.addEventListener('click', e => {
                if (todo.done) {
                    e.stopPropagation()
                    logicController.removeTodo(todo, card.getAttribute('index'))
                    console.log(card)
                    displayController.renderTodos2(projectFn)
                } else {

                    const { editPopup, editPopupBg } = editPopupF()
                    specialButton.blur()
                    
                    editPopup.addEventListener('editTodo', e => {
                        console.log(e)
                        console.log(todo.project.todos.indexOf(todo))
                        todo.project.todos[todo.project.todos.indexOf(todo)] = new Todo(e.detail.arguments.name, e.detail.arguments.description, e.detail.arguments.dueDate, e.detail.arguments.color)
                        renderTodos2(projectFn)
                    })
            
                    document.body.appendChild(editPopupBg)
                }
            })
        })
    }

    return {
        createPage,
        renderProjectsButtons,
        renderTodos,
        renderTodos2,
    }
})()

class Todo {
    constructor(title, description, dueDate, color) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.color = color
        this.done = false
        this.project = logicController.getCurrentProject()
    }
}

const logicController = (() => {
    let projectsArray = [
        {
            name: 'Tutorial Project',
            todos: []
        },
        {
            name: 'Project 1',
            todos: []
        },
        {
            name: 'Project 2',
            todos: []
        },
        {
            name: 'Project xD',
            todos: []
        }
    ]

    let getAllTodos = () => {
        let all = []
        logicController.projectsArray.forEach(project => {
            all = all.concat(project.todos) 
        })
        return all
    }
    
    let currentProject = projectsArray[0]

    const getCurrentProject = () => {
        return currentProject
    }

    const setCurrentProject = (obj) => {
        console.log(obj)
        currentProject = obj
    }

    const removeTodo = (obj, index) => {
        obj.project.todos.splice(index, 1)
    }

    const pushTodoToProject = (obj, project = currentProject) => {
        project.todos.push(obj)
    }

    function makeTodo(title, description, dueDate, color) {
        const todo = new Todo(...arguments)
        pushTodoToProject(todo)
        displayController.renderTodos()
        return todo
    }

    const changeProject = (projectIndex) => {
        currentProject = projectsArray[projectIndex]
        displayController.renderTodos()
    }

    const viewCertainTodos = (todoArray, name = '') => {
        currentProject = { name: name, todos: todoArray }
        displayController.renderTodos()
    }

    function makeProject(name) {
        logicController.projectsArray.push({
            name: name,
            todos: []
        })
        displayController.renderProjectsButtons()
    }
    
    return {
        projectsArray,
        currentProject,
        makeTodo,
        getCurrentProject,
        makeProject,
        removeTodo,
        changeProject,
        getAllTodos,
        setCurrentProject,
        viewCertainTodos
    }
})()


displayController.createPage()





// DEBUG

const debugMenu = elFactory('div', {id: 'debug'})
function debugx() {
    console.log(logicController.projectsArray)
}
function debugy() {
    logicController.makeTodo('name', 'desc', 'date', 'red')
}
function debuga() {
    console.log(logicController.getCurrentProject())
}
function debugb() {
    logicController.makeProject('example project')
}
function debugc() {
    const { editPopup, editPopupBg } = editPopupF()
    document.body.appendChild(editPopupBg)
}

debugMenu.innerHTML = `
<button id="debug1">Print the projects array</button>
<button id="debug2">Add a todo to the current project</button>
<button id="debug3">Print current project</button>
<button id="debug4">add a project</button>
<button id="debug5">print all todos</button>
`

document.body.appendChild(debugMenu)


document.querySelector('#debug1').addEventListener('click', e => {
    debugx()
})
document.querySelector('#debug2').addEventListener('click', e => {
    debugy()
})
document.querySelector('#debug3').addEventListener('click', e => {
    debuga()
})
document.querySelector('#debug4').addEventListener('click', e => {
    debugb()
})
document.querySelector('#debug5').addEventListener('click', e => {
    debugc()
})