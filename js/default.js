let guests = loadGuestList() ;

window.onload = ()=>{
  
  generateList(guests);
  let btn_save = document.querySelector('#btn_cadastrar');
  btn_save_listener(btn_save);
}

function create_guest(id,name){
  return { 
    id,
    name
  };
}

function generateList(arr){
  let ul = document.querySelector('#guests_ul_list')
  ul.innerHTML = ''
  arr.forEach((temp_guest)=>{
    append_li_to(ul,temp_guest);
  });
}

function addGuest(){
  let input_field = document.querySelector('#input_name_field').value;
  if(input_field.length<1)return alert('Ops... nome em branco não pode'); 

  let ul = document.querySelector('#guests_ul_list');
  let temp_guest = {
    id: (ul.lastChild!=null)?(Number(ul.lastChild.id.split('_')[0])+1) : 0,
    name: input_field
  };

  append_li_to(ul,temp_guest);
  guests.push(temp_guest)
  saveGuestsList(guests)
  console.log(guests)
}

function append_li_to(ul,temp_guest){
  let li = document.createElement('li');
  li.id = `${temp_guest.id}_${temp_guest.name}`;
  li.innerHTML = temp_guest.name + ' ';
  let a = document.createElement('a');
  a.href = `#${temp_guest.id}`;
  a.addEventListener('click', (e)=>{
    e.preventDefault()
    deletarGuest(li.id)
  })
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

function deletarGuest(id){
  let tmp_id = id.split('_')[0]
  
  guests = guests.filter(function(item){
    console.log(item);
    if(item.id != tmp_id)return item
  })
  saveGuestsList(guests)
  generateList(guests);
}

function saveGuestsList(list){
  localStorage.setItem('guests_list', JSON.stringify(list))
}
function loadGuestList(){
  return JSON.parse(localStorage.getItem('guests_list')) || [];
}