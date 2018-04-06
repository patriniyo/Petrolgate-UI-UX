/*!
 * Build: 2018-04-06T12:01:53.662Z
 */
class Modal extends HTMLElement{
    createdCallback(){
        this.windowClick = this.windowClick.bind(this);
        this.allowWindowClick = this.allowWindowClick.bind(this);
        this._hide = this._hide.bind(this);
        this.KEYS = {
            ESC: 27
        };
    }
    attachedCallback(){
        this._setTitle();
        this._displayPrint();
        this.tabIndex = '1';
    }
    _show(){
        this._addEventListeners();
        this.previousActiviveEl = document.activeElement;
        this.setAttribute('visible', true);
        this.inert(true);
        this.focus();
    }
    inert(bool){
        let bodyEls = document.body.children;
        console.log(bodyEls);
        for (let i = 0; i < bodyEls.length; i++) {
            if (bodyEls[i] !== this)
                console.log(bodyEls[i]);
            bodyEls[i].inert = bool;
        }
    }
    _hide(){
        this.setAttribute('visible', false);
        this.previousActiviveEl.focus();
        this._removeEventListeners();
        this.inert(false);
    }
    _addEventListeners(){
        this.closeButton = this.querySelector('.modal-header-close');
        this.closeButton.addEventListener('click', this._hide);
        this.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('click',this.allowWindowClick);
    }
    _removeEventListeners(){
        this.closeButton.removeEventListener('click', this._hide);
        this.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('click',this.allowWindowClick);
    }
    _onKeyDown(evt){
        if(evt.keyCode == this.KEYS.ESC) this._hide();
    }
    windowClick(event){
        if (event.target == this) {
            this._hide();
        }
    }
    allowWindowClick(){
        if (this.hasAttribute('windowClick')) {
            this.windowClick(event);
        }
    }
    _insertBefore(insertIn,element,beforeThis){
         if(!element && !beforeThis) return;
        insertIn.insertBefore(element,beforeThis);
    }
    _setTitle(){
        let modalHeaderEl = this.createModalHeader();
        let modalContentsEl = this.querySelector('rs-modal-contents');
        this._insertBefore(modalContentsEl,modalHeaderEl,modalContentsEl.firstElementChild);
    }
    _addPrint(){
        let modalBody = this.querySelector('rs-modal-body');
        let printButton = this.createPrintButton();
        let modalContentsEl = this.querySelector('rs-modal-contents');
        console.log(modalContentsEl);
        this._insertBefore(modalContentsEl,printButton,modalBody);
    }
    _displayPrint(){
        if (this.hasAttribute('print')) {
            this._addPrint();
        }
    }
    createPrintButton(){
        let button = document.createElement("button");
        button.classList.add('button');
        button.classList.add('button--print');
        let iconEl = document.createElement("i");
        iconEl.classList.add('material-icons');
        iconEl.innerHTML = "print";
        button.appendChild(iconEl);
        return button;
    }
    createModalHeader(){
        let titleEl = document.createElement('h1');
        titleEl.classList.add('modal-header-title');
        titleEl.textContent = this.getAttribute('title');
        let closeButtonEl = document.createElement('button');
        closeButtonEl.classList.add('modal-header-close');
        closeButtonEl.innerHTML = "&times;";
        let modalHeaderEl = document.createElement('rs-modal-header');
        modalHeaderEl.appendChild(titleEl);
        modalHeaderEl.appendChild(closeButtonEl);
        return modalHeaderEl;
    }
}

class Modaltest {
	constructor(){
		this.addEventListeners();
	}
	addEventListeners(){
		const button = document.querySelector('#button');
		button.addEventListener('click', this.selectModal);
	}
	selectModal(){
		let activeModal = document.getElementById("modal1");
		activeModal._show();
	}
}

class SideNav{
	constructor(){
		this.windowOnClick = this.windowOnClick.bind(this);
		this.addEventListeners();
		this.KEYS = {
            ESC: 27
        };
	}
	_onKeyDown(evt){
        if(evt.keyCode == this.KEYS.ESC) this.toggleNavigation();
    }
	togglePopup(){
		var profilePopUp = document.querySelector(".profile-popup");
		var arrowUp = document.querySelector(".arrow-up");
    	profilePopUp.classList.toggle("show-profile");
    	arrowUp.classList.toggle("show-profile");
    }
    toggleNavigation() {
    	var navMenu = document.querySelector(".nav-container");
    	var navContainer = document.querySelector(".side-nav-container");
        navContainer.classList.toggle("show-navigation-container");
        navMenu.classList.toggle("show-navigation");
    }
    windowOnClick(event) {
    	var navContainer = document.querySelector(".side-nav-container");
        if (event.target === navContainer) {
            this.toggleNavigation();
        }
    }
    addEventListeners(){
    	var navContainer = document.querySelector(".side-nav-container");
    	var toggleButton = document.querySelectorAll(".page-header__show-button");
    	for (var i = 0; i < toggleButton.length; i++) {
    		toggleButton[i].addEventListener("click", this.toggleNavigation);
    	}
    	var profile = document.querySelector(".profile");
    	window.addEventListener("click", this.windowOnClick);
    	profile.addEventListener("click", this.togglePopup);
    	navContainer.addEventListener('keydown', this._onKeyDown);
    }
}

(function(){
	new SideNav();
	new Modaltest();
	document.registerElement("rs-modal", Modal);
})();
