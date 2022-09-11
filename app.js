//elementleri seçme
const card = document.getElementById("card");
const input = document.getElementById("input");
const list = document.getElementById("list-group");
const del = document.getElementById("del");
const clear = document.getElementById("clear");

eventListeners();
//eventListers'lar
function eventListeners(){
    card.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    del.addEventListener("click",deleteTodo);
    clear.addEventListener("click",clearAllTodos);

}
//arayüze todo ekleme
function addTodoToUI(newTodo){

    const listItem = document.createElement("li");
    listItem.className = "py-2 flex justify-between break-all";
    const link = document.createElement("a");
    link.className = "text-cyan-500 hover:text-cyan-700 text-xl float-right ml-2";
    link.innerHTML = "<i class='fa-regular fa-rectangle-xmark'></i>";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    
    list.appendChild(listItem);
    input.value = "";//todo yazıldıktan sonra input içerisini boşaltma    
}
//inputtaki değeri alma
function addTodo(e){

    const newTodo = input.value.trim();//trim() ile inputa girilen değerin başındaki ve sonundaki boşlukları silme
    if (newTodo === ""){
        window.alert("Leave blank!")
    } 
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }

    e.preventDefault();
}
//girilen todoyu storage e gönderme
function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;

}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//listedeki bütün todoları silme
function clearAllTodos(e){
    list.innerHTML = "";
    localStorage.removeItem("todos");
}
//sayfa yenilenince storage de bulunan todoları arayüze çağırma
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
//todo ları silme
function deleteTodo(e){
    if (e.target.className === "fa-regular fa-rectangle-xmark"){
        e.target.parentElement.parentElement.remove();//li yi silmek için parentElement ile li ye geliyoruz
        deleteTodoStorage(e.target.parentElement.parentElement.textContent);
    }
    
}
//arayüzden silinen todoları storageden silme
function deleteTodoStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}
