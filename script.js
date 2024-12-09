//uı vars
const form=document.querySelector("form");
console.log(form)
const input=document.querySelector("#txtTaskName");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");
let  items;
//load items

loadItems();

//call event listeners
eventListeners();

function eventListeners(){
    //submit event
    form.addEventListener("submit",addNewItem);
    //delete an item
    taskList.addEventListener("click",deleteItem);
    //delete all items
    btnDeleteAll.addEventListener("click",deleteAllItems);
}
function loadItems(){
  items=getItemsFromLS();

  items.forEach(function(item){
    createItem(item);
  })
}
//GET ITEMS FROM LOCAL STORAGE
function getItemsFromLS(){
  if(localStorage.getItem("items")==null){
    items=[];
  }else{
    items=JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//set item to local storage
function setItemToLS(text){
  items=getItemsFromLS();
  items.push(text);
  localStorage.setItem("items",JSON.stringify(items));

}
//delete item to deletefromls
function deleteItemFromLS(text){
  items=getItemsFromLS();
  items.forEach(function(item,index){
    if(item===text){
      items.splice(index,1)
    }
  
  });
  localStorage.setItem("items",JSON.stringify(items));

}

function createItem(text){
   //create li
   const li=document.createElement("li");
   li.className="list-group-item list-group-item-secondary";
   li.appendChild(document.createTextNode(text));
   //create a
   const a=document.createElement("a");
    a.className="delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML='<i class="fas fa-times"></i>';
     li.appendChild(a);

     //add li to ul
     taskList.appendChild(li);
}
 
// add new item
function addNewItem(e){
   if(input.value===""){
    alert("add new item");
   }
  //create item
  createItem(input.value)

  //SAVE TO LS
  setItemToLS(input.value);
     //clear input
     input.value="";
    e.preventDefault();
}
//delete an item
function deleteItem(e){
  if(confirm("are you sure?")){
    if(e.target.className==="fas fa-times"){
        // console.log(e.target.className)
         e.target.parentElement.parentElement.remove();
    
        //delete item from LS
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
     
}

 e.preventDefault();//scroll bar aşagı yukarı oynamasın

}

//delete all items
function deleteAllItems(e) {
    // taskList.innerHTML = ""; // Alternatif bir yöntem
    // taskList.children yerine taskList.childNodes kullanılabilir
   if(confirm("are you sure?")){

    Array.from(taskList.children).forEach(function(item) {
        item.remove();
      });
      localStorage.clear();
   }
   
    e.preventDefault();
  }
  
