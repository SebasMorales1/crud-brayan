import { fetchApi } from "./utils/fetchApi.js"

// Función que se ejecuta cuando se termina de cargar el contenido del DOM
// permite tener una capa adicional de seguridad

document.addEventListener('DOMContentLoaded', () => {
  const $form = document.getElementById('form')
  const url = 'http://127.0.0.1:3000/routes/'
  const $loading = document.getElementById('loading')
  const $btnSubmit = document.getElementById('btn-submit')
  const $todos = document.getElementById('todos')
  let editing = false
  let todoId = null
  
  function loading(isLoading) {
    if (isLoading){
      $loading.style.display = 'block'
      $btnSubmit.disabled = true
    }
    else {
      $loading.style.display = 'none'
      $btnSubmit.disabled = false
    }
  }

  async function deleteTodo(id) {
    await fetchApi(`${url}${id}`, { 
      method: 'DELETE',
      loading: (isLoading) => {
        loading(isLoading)
        renderTodos()
      }
    })
  }

  async function renderTodos() {
    const { docs } = await fetchApi(url, {loading})
    
    while ($todos.children.length > 0)
      $todos.lastChild.remove()

    docs.map(todo => {
      const li = document.createElement('li')
      const h3 = document.createElement('h3')
      const div = document.createElement('div')
      const divBtns = document.createElement('div')
      const p = document.createElement('p')
      const btnEdit = document.createElement('button')
      const btnDelete = document.createElement('button')

      h3.textContent = todo.name
      p.textContent = todo.description
      btnEdit.textContent = 'Edit'
      btnDelete.textContent = 'Delete'

      btnDelete.addEventListener('click', () => deleteTodo(todo._id))
      btnEdit.addEventListener('click', () => {
        $form.children.name.value = todo.name
        $form.children.description.value = todo.description

        editing = true
        $btnSubmit.textContent = "Edit Todo"
        $btnSubmit.classList.add('edit')
        todoId = todo._id
      })

      li.classList.add('todo')
      divBtns.classList.add('btns')

      div.appendChild(h3)
      div.appendChild(p)
      divBtns.appendChild(btnEdit)
      divBtns.appendChild(btnDelete)
      li.appendChild(div)
      li.appendChild(divBtns)

      $todos.appendChild(li)
    })
  }

  // controlamos el evento submit del formulario para crear un Todo
  $form.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    /* 
      event.target.[campo].value estas propiedades permiten acceder
      al valor del input que contenga la propiedad name que sea igual
      al campo.
    */

    const data = {
      name: event.target.name.value,
      description: event.target.description.value
    }

    if (!editing)
      await fetchApi(url, { 
        method: 'POST', 
        data, 
        loading: (isLoading) => {
          loading(isLoading)
          renderTodos()
        }
      })
    else {
      await fetchApi(`${url}${todoId}`, {
        method: 'PUT',
        data,
        loading: (isLoading) => {
          loading(isLoading)
          renderTodos()
        }
      })

      editing = false
      todoId = null
      
      $btnSubmit.textContent = "Create new Todo"
      $btnSubmit.classList.remove('edit')
    }
    
    event.target.name.value = ''
    event.target.description.value = ''
  })

  renderTodos()
})