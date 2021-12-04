const themeInput = document.querySelector(".themeSwitch, input")
const date = document.querySelector(".date")
const clear = document.querySelector(".clear")
const list = document.getElementById("list")
const input = document.getElementById("input")
const plus = document.getElementById("plus")
// definisemo varijeble
const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineTrought = "lineTrought"

let LIST, id
let data = localStorage.getItem("TODO")
// if data is empty
if(data){
 LIST = JSON.parse(data),
 id = LIST.length
 loadList(LIST)
}else{
 id = 0
 LIST = []
}
// load list 
function loadList(array){
 array.forEach((item)=>{
  addToDo(item.name,item.id,item.done,item.trash)
 })
}
// addToDo

function addToDo (toDo, id, done, trash){
 if(trash){
  return
 }
 const DONE = done ? check : uncheck
 const LINE = done ? lineTrought : ""
 const item = `<li class="item">
       <i class="far ${DONE} complete" job="complete" id=${id}></i>
       <p class="text" ${LINE}>${toDo}</p>
       <i class="fas fa-trash-alt delete" job="delete" id=${id}></i>
     </li>`

 const positon = "beforeend"
 list.insertAdjacentHTML(positon,item)
}

// add enter key

document.addEventListener("keyup", (event)=>{
 if(event.key == "Enter"){
  const toDo = input.value
  if(toDo){
   addToDo(toDo, id, false, false)
    LIST.push({
     name: toDo,
     id: id,
     done: false,
     trash: false
    })
    id++
    localStorage.setItem("TODO", JSON.stringify(LIST))
   }
   input.value = ""
  }

 }
)
// add click

plus.addEventListener("click", ()=>{
 if(input.value !== ""){
  const toDo = input.value
  if(toDo){
   addToDo(toDo, id, false, false)
    LIST.push({
     name: toDo,
     id: id,
     done: false,
     trash: false
    })
    id++
     localStorage.setItem("TODO", JSON.stringify(LIST))
   }
   input.value = ""
  }

 }
)
// complete toDo

function completeToDo (element){
 element.classList.toggle(check)
 element.classList.toggle(uncheck)
 element.parentNode.querySelector(".text").classList.toggle(lineTrought)

 LIST[element.id].done =  LIST[element.id].done ? false : true
}

// remove toDo

function removeToDo(element){
 element.parentNode.parentNode.removeChild(element.parentNode)
 LIST[element.id].trash = true
}

// list add event 

list.addEventListener("click", (e)=>{
 const element = e.target
 const elementJob = element.attributes.job.value
 if(elementJob == "complete"){
  completeToDo(element)
 }else if (elementJob == "delete"){
  removeToDo(element)
 }
 localStorage.setItem("TODO", JSON.stringify(LIST))
})
// clear local
clear.addEventListener("click", ()=>{
 localStorage.clear()
 location.reload()
})

// sweth theme
themeInput.addEventListener("change", (e)=>{
 if(e.target.checked){
  document.body.setAttribute("data-theme", "dark")
 }else{
  document.body.setAttribute("data-theme", "light")
 }
})

// date
const options = {weekday: "long", month: "short", day: "numeric"}
const time = new Date()
date.innerHTML = time.toLocaleDateString("sr-RS", options)