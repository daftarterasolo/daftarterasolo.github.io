import { createFormMasy } from './formMasy.js';
import { getPabrikTimb, listOfUttpPabrik } from '../util/utilFunc.js';

export class createFormPabrik extends createFormMasy {
	#pabrikData = [];    //field yg digunakan pada method #loadPabrikTimb

	constructor(formKontainer, str) {
		super(formKontainer);
		this.str = str;
	}

	//================ method-method utk dijalankan pada method generateForm() =========================
	#setCSSPabrik() {
		document.querySelectorAll(".title").forEach(e => {
			e.style.backgroundColor = "#20b2aa";
			e.style.fontWeight = "bolder";
			e.style.textShadow = "1px 1px #000000";
		});
		document.querySelectorAll(".subContent").forEach(e => e.style.borderTop = "3px solid #20b2aa");
		document.querySelectorAll(".subContent").forEach(e => e.style.borderBottom = "3px solid #20b2aa");
	}

	async #loadPabrikTimb() {
		document.getElementById("pabrik") != null ? this.#pabrikData = await getPabrikTimb() : '';
	}
	//======================== end of methods ==========================================================

	//Override setLoadingBarColor() from parent class
	setLoadingBarColor() {
		document.querySelectorAll(".lds-facebook div").forEach(el => el.style.background = "#0098BA");
	}

	//Override generateForm() from parent class
	async generateForm() {
		super.generateForm();
		this.#setCSSPabrik();
		await this.#loadPabrikTimb();
	}

	//method ygg dijalankan pd pickUttpHandler()
	#setCssFormJml() {
		document.querySelector(".jmlhDiv").style.backgroundColor = "#0D98BA";
		document.querySelector("#setJml").style.backgroundColor = "#072a6c";
		document.querySelector("#jml").style.borderColor = "#FFFFFF";
		document.querySelector("#serial").style.borderColor = "#FFFFFF";
		document.querySelector("#serialAkhir").style.borderColor = "#FFFFFF";
	}

	//override method generateShopChartTbl() pd parent class utk dijalankan pada method pickUttpHandler
	static generateShopChartTbl(arr) {
		let str = `<table id="tabelPabrik"><thead><tr><td>No.</td><td>UTTP</td><td>Kap</td><td>Serial</td><td>Jml</td></tr></thead>`;
		arr.forEach((e,i) => str += `<tr><td>${i+1}</td><td>${e[0]}</td><td>${e[1]} / ${e[2]}</td><td>${e[6]} - ${parseInt(e[6]) + parseInt(e[5]) - 1}</td><td>${e[5]}</td></tr>`);
		str += `</table>`;		
		document.querySelector(".shopChart").innerHTML = str;
	}

	//override pickUttpHandler() from parent class
	pickUttpHandler() {
		super.pickUttpHandler();
		this.#setCssFormJml();
	}

	//method for handling when user input serial number yg dijalankan pd generateListUttp()
	#inputSerialHandler() {
		document.getElementById("serial").addEventListener("keyup", e => {
			this.constructor.showUncompleteMsg(this.constructor.isJmlEmpty("jml"), e.target);

			document.getElementById("serialAkhir").value = parseInt(e.target.value) + parseInt(document.getElementById("jml").value) - 1;
		});

	}

	//override generateListUttp() from parent class
	async generateListUttp() {
		if (document.querySelectorAll(".daftarUttp").length === 0) { // cek jika elemen .daftarUttp sdh ada atau belum
			let str = `<div class="judl"><a class="closeHref" href=# style="color : #7FFF00;">Close</a></div>`;
			this.list = await listOfUttpPabrik();
			for (let k in this.list) {
				str += this.strUttp.reduce((result,str,i) => `${result}${str}${eval(this.argsUttp[i]) || ''}`,'');
			}	
			this.lsKontainer.innerHTML = str;
			this.pickUttpHandler();
			this.setJmlPickedUttp();
			this.#inputSerialHandler();
		}
	}

	//Override setCssUttp() from parent class
	setCssUttp() {
		document.querySelectorAll(".listFieldset").forEach(e => {
			e.style.fontSize = "12px";
			e.style.borderTopColor = "green";
		});
		document.querySelectorAll(".listLegend").forEach(e => e.style.backgroundColor = "green");
	}

	//method utk dijalankan pd method #autoCompleteForm()
	#clearFormPendaftaran() {
		document.getElementById("alamat").value = "";
		document.getElementById("kel").value = "";
		document.getElementById("wa").value = "";			
	}

	//method untuk dijalankan pada method #generateEventHandler()
	#autoCompleteForm(katakunci, srcData) {
		this.#clearFormPendaftaran();
		//let filteredData = this.#pabrikData.filter(e => e[1] === katakunci);
		let filteredData = srcData.filter(e => e[1] === katakunci);
		if (filteredData[0] != undefined) {
			document.getElementById("alamat").value = filteredData[0][2];
			document.getElementById("kel").value = filteredData[0][4];
			document.getElementById("wa").value = filteredData[0][3];			
		}
	}

	determineDataSrc() {
		return this.#pabrikData;
	}

	//method utk dijalankan pd method generateBtnHandler()
	#generateEventHandler() {	
		document.getElementById("nama").addEventListener('input', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase(), this.determineDataSrc()) : '';
		});

		document.getElementById("nama").addEventListener('keyup', e => {
			e.target.value.length > 1 ? this.#autoCompleteForm(e.target.value.toUpperCase(), this.determineDataSrc()) : '';
		});

	}

	//overide method setCssSubmitBtn() pd parent class
	static setCssSubmitBtn() {
		document.getElementById("sbmt").style.backgroundColor = "#D3D3D3";
		document.getElementById("sbmt").style.color = "#000000";
		document.getElementById("sbmt").style.borderColor = "#1E3F66";
	}

	//override method submitBtnHandler from parent class
	/*static submitBtnHandler() {
		super.submitBtnHandler();
		document.getElementById("sbmt").style.backgroundColor = "#D3D3D3";
		document.getElementById("sbmt").style.color = "#000000";
		document.getElementById("sbmt").style.borderColor = "#1E3F66";
	}*/

	//override generateBtnHandler() from parent class
	generateBtnHandler() {
		super.generateBtnHandler();
		this.#generateEventHandler();
	}
}