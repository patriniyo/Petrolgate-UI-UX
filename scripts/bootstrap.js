import Modal from "./imports/modal";
import Modaltest from "./imports/modal-test";
import SideNav from "./imports/side-nav";

(function(){
	new SideNav();
	new Modaltest();
	document.registerElement("rs-modal", Modal);
})();