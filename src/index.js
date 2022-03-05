import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'


const sidebar = sidebarF()
const topbar = topbarF()

const displayController = (() => {
    const createPage = () => {
        document.body.innerHTML = ''

        document.body.appendChild(sidebar)
        document.body.appendChild(topbar)

        setTimeout(_ => document.querySelector('body').classList.add('animations'), 250)
    }

    const createSidebarButtons = () => [

    ]

    return {
        createPage
    }
})()

class Todo {
    constructor(name, description, dueDate, color) {
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.color = color
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
        },

    ]

    let currentProject = projectsArray[0]

    const getCurrentProject = () => {
        return currentProject
    }

    const pushTodoToProject = (obj, project = getCurrentProject()) => {
        project.todos.push(obj)
    }

    return {
        projectsArray,
        currentProject,
        pushTodoToProject,
        getCurrentProject
    }
})()


displayController.createPage()


function makeTodo(name, description, dueDate, color) {
    const todo = new Todo(...arguments)
    logicController.pushTodoToProject(todo)
    return todo
}

console.log(makeTodo('mother', 'dog', '12', 'black'))
console.log(logicController.projectsArray)