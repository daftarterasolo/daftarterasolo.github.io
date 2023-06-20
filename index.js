import { createFormMasy } from './service/formMasy.js';
import { createFormPabrik } from './service/formPabrik.js';

(function main() {

	let menuMsy = document.querySelector(".menu").children[1];

	menuMsy.addEventListener("click", async () => {
		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" placeholder="Masukkan nama">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
					</div>
					<div class="uttpDiv hidden">
					</div>`;
		
		const formMasy = new createFormMasy(document.querySelector(".main"), str);
		await formMasy.generateForm();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][3]']
		//formMasy.stringUttp`<div id=${args[0]} class='${args[1]}'' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formMasy.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]}</legend></fieldset></div>`;
		formMasy.generateBtnHandler();

	});

	let menuPbrk = document.querySelector(".menu").children[0];

	menuPbrk.addEventListener("click", async () => {

		let str = `<div class="mainContent">      
						<div class="subContent" id="sub1">
							<div class="title">Silahkan isi data Anda</div>
							<form>
								<input type="text" class="form_data" name="nama" id="nama" list="pabrik" placeholder="Masukkan nama Pabrik">
								<textarea  class="form_data" name="alamat" id="alamat" rows="4" cols="10" placeholder="Masukkan alamat Pabrik/Perusahaan"></textarea>  
								<input type="text" class="form_data" name="kel" id="kel" list="kelurahan" placeholder="Masukkan kelurahan">  
								<input type="number" class="form_data" name="wa" id="wa" placeholder="Nomor HP/Whatsapp">
								<input type="button" name="next" id="next" value="Next..">
							</form>
						</div>
						<div class="subContent" id="sub2">
							<div class="title">Silahkan Pilih Timbangan/UTTP</div>  
							<div class="addDiv">+<p id="klik">Klik disini</p></div>
							<div class="backBtnDiv">
								<form><input type="button" name="back" id="back" value="Back.."></form>
							</div>                  
						</div>
						<datalist id="kelurahan"></datalist>
						<datalist id="pabrik"></datalist>
					</div>
					<div class="uttpDiv hidden">
					</div>`;

		const formPabrik = new createFormPabrik(document.querySelector(".main"), str);
		await formPabrik.generateForm();
		formPabrik.generateBtnHandler();
		const args = ['k', 'this.list[k][0]', 'this.list[k][4]', 'this.list[k][0]', 'this.list[k][1]', 'this.list[k][2]']
		//formPabrik.stringUttp`<div id=${args[0]} class='${args[1]}/${args[4]}/${args[5]}' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;
		formPabrik.stringUttp`<div id=${args[0]} class='daftarUttp' style="background-image : url(${args[2]});"><fieldset class="listFieldset"><legend class="listLegend">${args[3]} ${args[4]}</legend></fieldset></div>`;
	});

	let menuSpbu = document.querySelector(".menu").children[2];
	menuSpbu.addEventListener("click", () => alert("test"));

	let menuLoko = document.querySelector(".menu").children[3];
	
	menuLoko.addEventListener("click", () => alert("test"));

})();


