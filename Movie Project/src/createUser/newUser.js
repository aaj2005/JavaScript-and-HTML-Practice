'use strict'
document.getElementById('add').addEventListener('click',function(){document.getElementById("overlay").style.display="flex"})

async function getAccName(){
	
	const accResponse=await fetch('/getAccName',{method : 'GET', headers:{'Content-Type':'text/plain'}});
	let accName =await accResponse.text()
	document.getElementById('nameOfAccount').innerHTML = "Welcome "+accName
	document.getElementById('accountname').value=accName
	getUsers()
}
getAccName()

async function getUsers(){
	const userResponse=await fetch('/getUsers',{method : 'POST', headers:{'Content-Type':'text/plain'},body:document.getElementById('accountname').value});
	let usersList =await userResponse.text()
	usersList=usersList.split(',')
	for(let user in usersList){
		console.log(usersList)
		if (usersList != ""){
			let div1=document.getElementById('div1')
			let button=document.createElement('button')
			button.setAttribute("id",usersList[user])
			button.setAttribute("onclick", 'searchMenu("'+usersList[user]+'")')
			div1.appendChild(button)
			document.getElementById(usersList[user]).innerHTML=usersList[user]
		}
	}
}
async function searchMenu(id){
	let request = new XMLHttpRequest()
	request.open("POST", "/searchMenu", true)
	request.setRequestHeader("Content-type", "text/plain")
	request.send(id)
	window.location.replace("/searchMenu.html")

}
document.addEventListener("keydown",function(){
	if(event.key=="Escape"&& document.getElementById("overlay").style.display == "flex"){
		document.getElementById("overlay").style.display = "none";
	}
})

async function logout(){
	let logout=await fetch('/logout',{method : 'GET', headers:{'Content-Type':'application/json'}});
	window.location.replace("/login.html")
}