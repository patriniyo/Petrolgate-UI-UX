
import Requests from "./requests";
export default class Login {
	constructor(){
		this.addEventListeners = this.addEventListeners.bind(this);
		this.collectData = this.collectData.bind(this);
		this.sendData = this.sendData.bind(this);
		this.response = this.response.bind(this);
		this.addEventListeners();
		this.formData = [];
		this.customizer();
	}
    /* take data from form*/
	collectData(){
		let password = document.getElementById("login-container-form-password").value;
		let username = document.getElementById("login-container-form-username").value;
		this.formData.push(password);
		this.formData.push(username);
		this.formatData();
	}
	/* format the data*/
	formatData(){
			let credentials = {"credentials":[
                {"username": this.formData[0],
                 "password": this.formData[1]
			    }
				]};
				return credentials;
		}
    /*send data to the server with request API*/
	sendData(e){
		this.collectData();
		let data = this.formatData();
		let request = new Requests("POST", this.response);
		request.send("http://9a23feb1.ngrok.io/login",data);
		e.preventDefault();
	}
	/* handle the response not yet finished testing remaining*/
	response(e){
		// const data = JSON.parse(this.responseText).data;
		console.log(this.responseText);
		this.displayError("hello");
	}
	/* handle the error*/
	displayError(message){
		let username = document.getElementById("login-container-form-username");
		let password = document.getElementById("login-container-form-password");
		let error = document.getElementById("login-error--message");
		username.classList.add("login-container-form-element--error");
		password.classList.add("login-container-form-element--error");
		error.style.display = "block";
		error.innerHTML = message;
		username.value = "";
		password.value = "";
	}
	/* customize the login page because it has no header as other pages*/
	customizer(){
		let mainContainer = document.querySelector(".main-container");
		let pageHeader = document.querySelector(".page-header");
		let profile = document.querySelector(".profile-popup");
		mainContainer.classList.add("main-container--no-header");
		pageHeader.style.display = "none";
		profile.style.display = "none";
	} 
	/* adding listener to the form */
	addEventListeners(){
	let form = document.getElementById("login-container-form");
	form.addEventListener("submit",this.sendData);
	}
}