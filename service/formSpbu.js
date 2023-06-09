import { createFormPabrik } from './formPabrik.js';
import { createFormMasy } from './formMasy.js';
import { getSpbu } from '../util/utilFunc.js';

export class createFormSpbu extends createFormPabrik {
	#spbuData = [];

	//new method
	#setCSSSpbu() {
		document.querySelectorAll(".title").forEach(e => {
			e.style.backgroundColor = "#432616";
			e.style.fontWeight = "bolder";
			e.style.textShadow = "none";
		});
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "6px solid #432616");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "6px solid #432616");
		document.querySelector(".backBtnDiv").style.top = "10px";
	}

	//method load nama-nama spbu utk dijalankan pd method generateForm()
	async #loadSpbu() {
		document.getElementById("spbu") != null ? this.#spbuData = await getSpbu() : '';
	}

	//override method methodRunWhenSubmit() pd parent class utk menghandle tombol submit ketika ditekan..
	static methodToRunWhenSubmit() {
		this.showUncompleteMsg(this.isJmlEmpty("jml_nozzle"));
		super.methodToRunWhenSubmit();
	}

	//Override setLoadingBarColor() from parent class
	setLoadingBarColor() {
		document.querySelectorAll(".lds-facebook div").forEach(el => el.style.background = "#432616");
	}

	//override method generateForm() from parent class
	async generateForm() {
		await super.generateForm();
		this.#setCSSSpbu();
		await this.#loadSpbu();
	}

	//override determineDataSrc() from parent class
	determineDataSrc() {
		return this.#spbuData;
	}

	//overide method setCssSubmitBtn() pd parent class
	static setCssSubmitBtn() {
		super.setCssSubmitBtn();
		document.getElementById("sbmt").style.borderColor = "rgb(67, 38, 22)";
	}
}