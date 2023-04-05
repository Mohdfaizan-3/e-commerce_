// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const addBtn = document.getElementById("addBtn");

login.addEventListener('click', ()=>{
    window.location.href = "login.html"
})



signup.addEventListener('click', ()=>{
    window.location.href = "signup.html"
})



addBtn.addEventListener('click', ()=>{
    window.location.href = "login.html"
})