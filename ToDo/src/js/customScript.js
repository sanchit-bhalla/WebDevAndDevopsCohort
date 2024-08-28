console.log("JS LOADED")
document.addEventListener('DOMContentLoaded', function() {
  const INPUT = document.querySelector("#todo-input");
  const ADD_BTN = document.querySelector("#add-btn");
  const TODOS_SECTION = document.querySelector("#todos");
  ADD_BTN.onclick = function (e) {
    const todoText = INPUT?.value?.trim();
    if (!todoText) {
      alert("Please enter valid TODO!");
      return;
    }
  
    // create new TODO
    const newTodo = document.createElement("div");
    newTodo.setAttribute(
      "class",
      "todo mt-3 p-3 flex justify-between items-center space-x-3 rounded-lg bg-gray-700"
    );
    newTodo.innerHTML = `<input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-blue-500"
          />
          <input
            type="text"
            value='${todoText}'
            class="w-auto flex-grow bg-transparent text-white text-sm_ focus:outline-none focus:ring-2 focus:ring-blue-500" disabled
          />
          <button
            class="py-1 px-3 font-bold rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
            btn-edit
          >
            Edit
          </button>
          <button
            class="hidden py-1 px-3 font-bold rounded-lg bg-green-500 hover:bg-green-600 transition"
            btn-save
          >
            Save
          </button>
          <button
            class="py-1 px-3 font-bold rounded-lg bg-red-500 hover:bg-red-600 transition"
            btn-delete
          >
            Delete
          </button>`;
  
    TODOS_SECTION.append(newTodo);
  };
  
  // Use event delegation to DELETE and EDIT instead of adding eventListener on each todo
  TODOS_SECTION.addEventListener("click", function (event) {
    if (event.target.hasAttribute("btn-edit")) {
      const targetTodo = event.target.parentElement;
      const inputbox = targetTodo.querySelector('input[type="text"]');
      const [editButton, saveButton] = targetTodo.querySelectorAll("button");
  
      inputbox.disabled = false;
      inputbox.classList.add("ring-2", "ring-blue-500");
      inputbox.focus();
      // Move pointer to end when input is focused
      inputbox.setSelectionRange(inputbox.value.length, inputbox.value.length);
  
      // hide edit button and show save button
      editButton.classList.add("hidden");
      saveButton.classList.remove("hidden");
    } 
    else if (event.target.hasAttribute("btn-delete")) {
      const targetTodo = event.target.parentElement;
      TODOS_SECTION.removeChild(targetTodo);
  
    } 
    else if (event.target.hasAttribute("btn-save")) {
      const targetTodo = event.target.parentElement;
      const inputbox = targetTodo.querySelector('input[type="text"]');
      const [editButton, saveButton] = targetTodo.querySelectorAll("button");
  
      // Show alert if value to save is empty
      if(!inputbox.value?.trim()){
          alert('Please enter some text to save')
          return
      }
  
      inputbox.disabled = true;
      inputbox.classList.remove("ring-2", "ring-blue-500");
  
      // hide save button and show edit button
      saveButton.classList.add("hidden");
      editButton.classList.remove("hidden");
    } else if (event.target.type === "checkbox") {
        const targetTodo = event.target.parentElement;
        const inputbox = targetTodo.querySelector('input[type="text"]');
      if(event.target.checked){
        // cut text
        inputbox.classList.add('line-through', 'text-gray-300')
      }else{
        inputbox.classList.remove('line-through', 'text-gray-300')
      }
    } else {
      return;
    }
  });
});
