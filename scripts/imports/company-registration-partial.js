import GetFormData from "./get_form_data";
export default class Registration{
	constructor(){
		this.addEventListeners();
		this.submitForm = this.submitForm.bind(this);
	}
	addEventListeners(){
		const form = document.querySelector("form.company-registration-form");
		if (!form) return;
		form.addEventListener('submit',this.submitForm);
	}
	submitForm(evt){
		let getFormData = new GetFormData();
		evt.preventDefault();
		console.log(getFormData.get_form_data(evt.target));
	}
}
