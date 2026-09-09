const deleteBtn = document.querySelectorAll('.fa-trash');
const item = document.querySelectorAll('.item span:not(.fa-trash)')

Array.from(deleteBtn).forEach((element) => {
  element.addEventListener('click', deleteItem);
})

Array.from(item).forEach((element) => {
  if (element.classList.contains('completed')) {
    element.addEventListener('click', markUnComplete);
  } else {
    element.addEventListener('click', markComplete);
  }
});

async function deleteItem(){
  const itemText = this.parentNode.childNodes[1].innerText;
  try{
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  };
};

async function markComplete(){
  const itemText = this.innerText;
  try{
    const response = await fetch('markComplete', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })  
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  };
};

async function markUnComplete(){
  const itemText = this.innerText;
  try{
    const response = await fetch('markUnComplete', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })  
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.log(err);
  };
};