document.getElementById("signin-btn").addEventListener('click', ()=>{
  const name = document.getElementById('name');
  const nameInput = name.value;
  console.log(nameInput);


  const pass = document.getElementById('pass');
  const passInput = pass.value;
  console.log(passInput);

  if (nameInput == 'admin' && passInput == 'admin123') {
    alert('login succesfully');
    window.location.assign(index.html);

  } else {
    alert('invalid info')
  }
})