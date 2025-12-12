console.log('heys');


const inputElement = document.querySelector('.js-input');
const addElement = document.querySelector('.js-add');
const listElement = document.querySelector('.js-unlist');
showData();
restoreData();
 
addElement.addEventListener( 'click' , () => {
  const text = inputElement.value;
  if( text.trim() === "") {
    alert("Invalid Note, Write something uhh...");
    return
  }
  displayText(text);
  inputElement.value = "";
});

function displayText( text ) {
  const li = document.createElement("li");
  li.className = "task-li";
  li.innerHTML = `
    <img class="checked-img js-check-btn" src="./images/unchecked.png" alt="checked">
    <p class="task-txt js-display-task">${text}</p>
    <img class="clear-img js-clear" src="./images/cancel.png" alt="clear">
  `;
  listElement.appendChild(li);
  clickFunctionality(li);
};

function clickFunctionality(li) {
  const checkElementImg = li.querySelector('.js-check-btn');
  const textElement = li.querySelector('.js-display-task');
  const deleteElement = li.querySelector('.js-clear');
  li.querySelector('.js-check-btn').addEventListener( 'click' , () => {
    if(checkElementImg.src.includes("unchecked")) {
      checkElementImg.src = "./images/checked.png"
      textElement.classList.add('done');
      saveToStorage();
    } else {
      checkElementImg.src = "./images/unchecked.png"
      textElement.classList.remove('done');
      saveToStorage();
    };
  });
  deleteElement.addEventListener('click' , () => {
    li.remove();
    saveToStorage();
  });
};

function saveToStorage() {
  localStorage.setItem( 'data' , listElement.innerHTML);
};

function showData() {
  const data = localStorage.getItem('data')
  if(data) {
    listElement.innerHTML = data;
  }
};

function restoreData() {
  document.querySelectorAll('.task-li').forEach( (list) => {
    clickFunctionality(list);
  });
};

window.addEventListener( "keydown" , (event) => {
  if( event.key == 'Enter') {
    addElement.click();
  }
})

