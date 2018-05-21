export default class ClientRegistration{
		constructor(){
			this.addEventListeners();

		}
		addEventListeners(){
			let tabs = document.getElementsByClassName("tab");
			for (var i = 0; i < tabs.length; i++) {
				tabs[i].addEventListener("click",this.switchContent.bind(this));
			}
			const personalForm = document.querySelector("#client_personal_form");
			if (!personalForm) return;
			personalForm.addEventListener('submit',this.submitForm.bind(this));
			const companyForm = document.querySelector("#client_company_form");
			if (!companyForm) return;
			companyForm.addEventListener('submit',this.submitForm.bind(this));
		}
		submitForm(evt){
			evt.preventDefault();
		    let getFormData = new GetFormData();
		    this.sendData(getFormData.get_form_data(evt.target));
		    let data = getFormData.get_form_data(evt.target);
		    let jsonData = JSON.stringify(data);
		    console.log(typeof jsonData);
		    console.log(jsonData);
		    this.sendData(jsonData);
		}
		/*send data to the server with request API*/
		sendData(data){
			let request = new Requests("POST", "json",this.response.bind(this), this.respondedWithError.bind(this)/*,this.showPreloader.bind(this)*/);
		    request.send("http://d978757.ngrok.io/register/client",data);
		}
		/* handle the response*/
		response(e){
			console.log(JSON.parse(e.target.responseText)); 
		    const response = JSON.parse(e.target.responseText);
		    if(response.success){
		    	this.hidePreloader();
			    this.displayConfirmation();
			}else{
				this.displayError(response.ErrorMessage);
			}
		}
		respondedWithError(evt){
			console.log(evt.target.responseText);
		}
		/* confirmation */
		displayConfirmation(){
			let modal = document.getElementById("client_success_message");
			modal._show();
		}
		/* dispalaying an error */
		displayError(ErrorMessage){
			let messageParagraph = document.querySelector(".confirmation_message");
			messageParagraph.innerHTML = ErrorMessage;
			let modal = document.getElementById("client_success_message");
			modal._show();
			console.log(messageParagraph);
		}
		finishProcess(){
			location.reload();
		}
		showPreloader(){
			let preloader = document.querySelector(".preloader");
			console.log(preloader);
			preloader.classList.add("show-preloader");
		}
		hidePreloader(){
			let preloader = document.querySelector(".preloader");
			preloader.classList.remove("show-preloader");
		}
		switchContent(e){
			let clickedButton = e.target.getAttribute("id");
			e.target.classList.add("clickedTab");
			let tabs = document.getElementsByClassName("tab");
			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i].getAttribute("id")!== clickedButton) {
					tabs[i].classList.remove("clickedTab");
				}
			}
			let currentDiv = document.getElementsByClassName(clickedButton)[0];
			let otherDivs = currentDiv.parentNode.children;
			if (currentDiv.style.display == "none") {
				currentDiv.style.display = "block";
				for (var i = 0; i < otherDivs.length; i++) {
					if (otherDivs[i] !== currentDiv) {
						otherDivs[i].style.display = "none";
					}
				}
			}else{
				for (var i = 0; i < otherDivs.length; i++) {
					if (otherDivs[i] !== currentDiv) {
						otherDivs[i].style.display = "none";
					}
				}
				currentDiv.style.display = "block";
			}
		}

	}