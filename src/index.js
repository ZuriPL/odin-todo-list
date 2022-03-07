import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'
import workspaceF from './js/components/workspace'
import todoCardF from './js/components/todo-card'
import todoPopupF from './js/components/todo-popup'


const { sidebar, projectsSort, projectsSortTitle, todoDateSort, byToday, byWeek, allTodos } = sidebarF()
const topbar = topbarF()
const { workspace, addTodoButton } = workspaceF()

const displayController = (() => {
    const createPage = () => {
        document.body.innerHTML = ''
        
        document.body.appendChild(sidebar)
        document.body.appendChild(topbar)
        document.body.appendChild(workspace)
        
        displayController.renderTodos()
        displayController.renderProjectsButtons()
        setTimeout(_ => document.querySelector('body').classList.add('animations'), 250)

        allTodos.addEventListener('click', e => {
            logicController.viewCertainTodos(logicController.getAllTodos())
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
            console.log(e.detail.arguments.color)
            logicController.makeTodo(e.detail.arguments.name, e.detail.arguments.description, e.detail.arguments.dueDate, e.detail.arguments.color)
        })
    }

    const renderProjectsButtons = () => {
        projectsSort.innerHTML = '';
        projectsSort.appendChild(projectsSortTitle)
        logicController.projectsArray.forEach(project => {
            const projectButton = elFactory('button', {class: 'sidebar-selection'}, project.name)

            projectButton.addEventListener('click', e => {
                logicController.changeProject(logicController.projectsArray.indexOf(project))
                console.log(e)
                Array.from(projectsSort.children).forEach(btn => btn.classList.remove('active'))
                Array.from(todoDateSort.children).forEach(btn => btn.classList.remove('active'))
                projectButton.classList.add('active')
            })

            projectsSort.appendChild(projectButton)
        })
        projectsSort.children[logicController.projectsArray.indexOf(logicController.getCurrentProject()) + 1].classList.add('active')
    }

    const renderTodos = () => {
        workspace.innerHTML = ''
        workspace.appendChild(addTodoButton)
        logicController.getCurrentProject().todos.forEach(todo => {
            const { card, deleteButton } = todoCardF(todo)
            card.setAttribute('index', logicController.getCurrentProject().todos.indexOf(todo))
            workspace.appendChild(card)
            deleteButton.addEventListener('click', e => {
                e.stopPropagation()
                logicController.removeTodo(card.getAttribute('index'))
                displayController.renderTodos()
            })
        })
    }

    return {
        createPage,
        renderProjectsButtons,
        renderTodos,
    }
})()

class Todo {
    constructor(title, description, dueDate, color) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.color = color
    }
}

const logicController = (() => {
    let projectsArray = [
        {
            name: 'Tutorial Project',
            todos: [
                {
                    title: 'Welcome to Todo-List',
                    description: 'This project was made for The Odin Projects',
                    dueDate: 'none',
                    color: 'blue'
                },
                {
                    title: 'CLICK ME',
                    description: 'To see all of my details',
                    dueDate: 'none',
                    color: 'blue'
                },
                {
                    title: 'The sidebar on the left has your projects....',
                    description: `... and a few shortcuts for your convienence too`,
                    dueDate: 'none',
                    color: 'blue'
                },
                {
                    title: 'All of your todos are laid out in this section',
                    description: 'And they are saved after you close your browser window',
                    dueDate: 'none',
                    color: 'blue'
                },
            ]
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
        console.log(all)
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

    const removeTodo = (index) => {
        currentProject.todos.splice(index, 1)
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
        console.log('all todos')
        currentProject = { name: name, todos: todoArray }
        displayController.renderTodos()
        console.log(logicController.currentProject)
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

// logicController.changeProject(1)
// logicController.makeTodo('test', 'test', 'test', 'green')
// logicController.makeTodo('test', 'test', 'test', 'purple')
// logicController.changeProject(0)

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
    logicController.getAllTodos()
}

debugMenu.innerHTML = `
<button id="debug1">Print the projects array</button>
<button id="debug2">Add a todo to the current project</button>
<button id="debug3">Print current project</button>
<button id="debug4">add a project</button>
<button id="debug5">change to next project</button>
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