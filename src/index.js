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
import { kebabCase } from 'lodash'


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
            animation: 200,
            // might not work in edge cases
            onEnd: function(e) {
                logicController.currentProject.todos.splice(e.newDraggableIndex, 0, ...logicController.currentProject.todos.splice(e.oldDraggableIndex, 1))
            },
        })
        
        // let today = new Date()
        // today = today.toLocaleDateString().split('.')
        // if (today[0].toString().length == 1) {
        //     today[0] = '0' + today[0]
        // }
        // today = `${today[2]}-${today[1]}-${today[0]}`

        // logicController.makeTodo('Welcome to Todo-List', 'This project was made for The Odin Project', today, 'blue')
        // logicController.makeTodo('The sidebar on the left has your projects....', '...and a few shortcuts for your convienence too', today, 'blue')
        // logicController.makeTodo('All of your todos are laid out in this section', 'And they are saved after you close your browser window', today, 'blue')
        // logicController.makeTodo('Add a new todo using the button in the bottom-right corner', 'Have fun!', today, 'blue')

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

            projectButtonEdit.addEventListener('click', e => {
                e.stopPropagation()
            })

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
        projectsSort.children[logicController.projectsArray.indexOf(logicController.currentProject) + 1].classList.add('active')
    }

    const renderTodos = () => {
        workspace.innerHTML = ''
        workspace.appendChild(addTodoButton)
        logicController.currentProject.todos.forEach(todo => {
            const { card, specialButton } = todoCardF(todo)
            card.setAttribute('index', logicController.currentProject.todos.indexOf(todo))
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
        this.done = false
        this.project = logicController.currentProject
    }
}

const logicController = (() => {
    let projectsArray = [
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

    const setProjectsArray = (value) => {
        logicController.projectsArray = value
    }

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

    const pushTodoToProject = (obj, project = logicController.currentProject) => {
        project.todos.push(obj)
    }

    function makeTodo(title, description, dueDate, color) {
        const todo = new Todo(...arguments)
        logicController.pushTodoToProject(todo)
        displayController.renderTodos()
        return todo
    }

    const changeProject = (projectIndex) => {
        logicController.currentProject = logicController.projectsArray[projectIndex]
        displayController.renderTodos()
    }

    const viewCertainTodos = (todoArray, name = '') => {
        logicController.currentProject = { name: name, todos: todoArray }
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
        viewCertainTodos,
        setProjectsArray,
        pushTodoToProject
    }
})()

const storage = (() => {
    const loadData = () => {
        let data = JSON.parse(localStorage.getItem('todos_json'))

        if (data == null || data == {}) {
            localStorage.setItem('todos_json', `
                {"0":{"name":"Tutorial Project","todos":{"0":{"title":"Welcome to Todo-List","description":"This project was made for The Odin Projects","dueDate":"2022-03-10","color":"blue"},"1":{"title":"The sidebar on the left has your projects....","description":"...and a few shortcuts for your convienence too","dueDate":"2022-03-10","color":"blue"},"2":{"title":"All of your todos are laid out in this section","description":"And they are saved after you close your browser window","dueDate":"2022-03-10","color":"blue"}}}}
            `)
        }

        console.log('Data:')
        console.log(data)
        
        logicController.setProjectsArray([])
        
        for (let i = 0; i < Object.keys(data).length; i++) {
            let todos = []
            for (let j = 0; j < Object.keys(data[i].todos).length; j++) {
                const todo = new Todo(data[i].todos[j].title, data[i].todos[j].description, data[i].todos[j].dueDate, data[i].todos[j].color)
                todos.push(todo)
            }
            let project = {
                name: data[i].name,
                todos: todos
            }
            logicController.projectsArray.push(project)
            // logicController.makeTodo(data[i].todos)
        }
        logicController.changeProject(0)

        displayController.renderTodos()
        displayController.renderProjectsButtons()
    }

    const updateTodoData = () => {
        // localStorage.clear() // !!!
                
        let projectsArrayJson = {}
        for (let i = 0; i < logicController.projectsArray.length; i++) {
            let todosObj = {}

            for (let j = 0; j < logicController.projectsArray[i].todos.length; j++) {
                todosObj[j.toString()] = {
                    title: logicController.projectsArray[i].todos[j].title,
                    description: logicController.projectsArray[i].todos[j].description,
                    dueDate: logicController.projectsArray[i].todos[j].dueDate,
                    color: logicController.projectsArray[i].todos[j].color,
                }
            }

            projectsArrayJson[i.toString()] = {
                name: logicController.projectsArray[i].name,
                todos: todosObj
            }
        }

        localStorage.setItem('todos_json', JSON.stringify(projectsArrayJson))
    }

    const updateTheme = () => {

    } 

    return {
        loadData,
        updateTodoData
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
    console.log(logicController.currentProject)
}
function debugb() {
    // logicController.makeProject('example project')
    storage.updateTodoData()
}
function debugc() {
    storage.loadData()
}

debugMenu.innerHTML = `
<button id="debug1">Print the projects array</button>
<button id="debug2">Add a todo to the current project</button>
<button id="debug3">Print current project</button>
<button id="debug4">save data</button>
<button id="debug5">load data</button>
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