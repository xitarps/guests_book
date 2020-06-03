window.onload = ()=>{
  let guests = [create_guest(1,'Xita'),create_guest(2,'Jão'),create_guest(3,'Bru')];
  createList(guests);
  let btn_save = document.querySelector('#btn_cadastrar');
  btn_save_listener(btn_save);
}

function create_guest(id,name){
  return { 
    id,
    name
  };
}

function createList(arr){
  let ul = document.querySelector('#guests_ul_list')

  arr.forEach((temp_guest)=>{
    append_li_to(ul,temp_guest);
  });
}

function addGuest(){
  let input_field = document.querySelector('#input_name_field').value;
  if(input_field.length<1)return alert('Ops... nome em branco não pode'); 

  let ul = document.querySelector('#guests_ul_list');
  let temp_guest = {
    id: (Number(ul.lastChild.id.split('_')[0])+1),
    name: input_field
  };

  append_li_to(ul,temp_guest);
}

function append_li_to(ul,temp_guest){
  let li = document.createElement('li');
  li.id = `${temp_guest.id}_${temp_guest.name}`;
  li.innerHTML = temp_guest.name + ' ';
  let a = document.createElement('a');
  a.href = `#${temp_guest.id}`;
  a.innerHTML = 'Remover';
  li.appendChild(a);
  ul.appendChild(li);
}

function btn_save_listener(btn){
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    addGuest();
  });
}