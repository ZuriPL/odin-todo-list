import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'
import workspaceF from './js/components/workspace'
import todoCardF from './js/components/todo-card'


const { sidebar, projectsSort, projectsSortTitle } = sidebarF()
const topbar = topbarF()
const { workspace, addTodoButton } = workspaceF()

const displayController = (() => {
    const createPage = () => {
        document.body.innerHTML = ''
        
        document.body.appendChild(sidebar)
        document.body.appendChild(topbar)
        document.body.appendChild(workspace)
        
        renderTodos()
        renderProjectsButtons()
        setTimeout(_ => document.querySelector('body').classList.add('animations'), 250)
    }

    const renderProjectsButtons = () => {
        projectsSort.innerHTML = '';
        projectsSort.appendChild(projectsSortTitle)
        logicController.projectsArray.forEach(project => {
            const projectButton = elFactory('button', {class: 'sidebar-selection'}, project.name)
            projectsSort.appendChild(projectButton)
        })
    }

    const renderTodos = () => {
        workspace.innerHTML = ''
        workspace.appendChild(addTodoButton)
        // logicController.getCurrentProject().todos.forEach(todo => {
        //     const todoEl = elFactory('div', {class: 'todo-card'}, todo.title)
        //     workspace.appendChild(todoEl)
        // })
        logicController.getCurrentProject().todos.forEach(todo => {
            const todoEl = todoCardF(todo)
            workspace.appendChild(todoEl)
        })
    }

    return {
        createPage,
        renderProjectsButtons,
        renderTodos
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
        },
        
    ]
    
    let currentProject = projectsArray[1]

    const getCurrentProject = () => {
        return currentProject
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
        makeProject
    }
})()


displayController.createPage()





// DEBUG


const debugMenu = elFactory('div', {id: 'debug'})
function debugx() {
    console.log(logicController.projectsArray)
}
function debugy() {
    logicController.makeTodo('test', 'test', 'test', 'test')
}
function debuga() {
    console.log(logicController.getCurrentProject())
}
function debugb() {
    logicController.makeProject('example project')
}

debugMenu.innerHTML = `
<button id="debug1">Print the projects array</button>
<button id="debug2">Add a todo to the current project</button>
<button id="debug3">Print current project</button>
<button id="debug4">add a project</button>
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