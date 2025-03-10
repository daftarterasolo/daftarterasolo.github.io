class submitProcessor {
	constructor() {
		if (this.constructor === "submitProcessor") {
			throw new Error("Object cannot be made..");
		} 
	}

	detectIfSubmitClicked() {
		throw new Error("Abstract Method has no implementation...");
	}
}


export class masySubmitProcessor extends submitProcessor {
	#obj;
	#api;
	constructor(obj) {
		super(constructor);
		this.#obj = obj;
		//this.#detectIfSubmitClicked();
		this.detectIfSubmitClicked();
		//this.#api = "https://script.google.com/macros/s/AKfycbyy2jsLFItoH2iSsbee3o4IjH_d-X_gm8zJClJNmZ76nXcF532iqDtVb9FFP5SBLqmxBA/exec";

		//this.#api = "https://script.google.com/macros/s/AKfycbysLaGr6E7Csyg62OqWf_gU9JBJsy0hEOszUTdISCvfYE-dPtZ7-qyEnUeXJCIkfe2eig/exec";
		this.#api = "https://script.google.com/macros/s/AKfycbxCRpIT-PAtmRHksjns4-xHEraWMc9fC8MT9dYHMEYsv9zr1jCqfmYQIB7sZYxsii-MyA/exec";
	}

	#checkIfDataToSendIsEmpty() {
		if (Object.keys(this.#obj.get_dataToSend).length === 0) {
			throw new Error("Anda belum memilih uttp di shopping chart....Silahkan klik tanda '+' untuk memilih uttp.");
		}
	}

	#checkIfdataFormIsEmpty() {
		let dat = this.#obj.get_dataForm; 
		if (dat['nama'] === "" || dat['alamat'] === "" || dat['kel'] === "") {
			throw new Error("Anda belum mengisi data identitas dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}

		if (dat['wa'] === "") {
			document.getElementById('wa').value = "62";
		}

	}

	#resetFormIdentitas() {
		document.getElementById('sub1').children[1].reset();
	}

	#deleteTableShopChart() {
		document.getElementById('sub2').children[1].children[0].remove();	
	}

	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Daftar Ulang Anda : ${respon}\nSilahkan memperlihatkan Nomor Daftar Ulang Anda Kepada Petugas Pendaftar untuk dikonfirmasi.`);
	}

	//#afterEntryDataSuccess(msg) 
	#afterEntryDataSuccess() {
		this.#obj.set_dataToSend = {};
		this.#obj.set_shopChartTemp = [];
		this.#resetFormIdentitas();	
		this.#deleteTableShopChart();
		//alert(msg);
	}

	#ifEntryDataFail(msg) {
		alert(msg);
	}

	async #entryTheData() {
		
		let dataComplete = {
			'dataForm' : this.#obj.get_dataForm,
			'dataToSend' : this.#obj.get_dataToSend 
		}

		console.log(dataComplete);

		//console.log('Melakukan entry data ... ');
		document.querySelector('.loadingBar').style.display = "block";
		try {
			await fetch(this.#api, {
				method : "POST",
				body : JSON.stringify(dataComplete)
			})
			.then(e => e.json())
			.then(e => {
				document.querySelector('.loadingBar').style.display = "none";
				setTimeout(() => {},1000);
				//e.result === 'success' ? this.#afterEntryDataSuccess(e.msg) : this.#ifEntryDataFail(e.msg);
				switch(e.result) {
					case 'success':
						this.#afterEntryDataSuccess();
						this.showConfirmation(e.msg, e.data);
						break;
					default:
						this.#ifEntryDataFail(e.msg);
				}
			});
		}
		catch(err) {
			document.querySelector('.loadingBar').style.display = "none";
			this.#ifEntryDataFail(`Entri Data Gagal. Error  :::  ${err}`);
		}
		
	}

	//#detectIfSubmitClicked() {
	detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				//this.#checkIfDataToSendIsEmpty();
				this.get_checkIfDataToSendIsEmpty;
				this.#checkIfdataFormIsEmpty();
				this.#entryTheData();
			}
			catch(e) {
				alert(e);
			}
		});
	}

	get get_getDataForm() {
		return this.#obj.get_dataForm;
	}

	get get_entryTheData() {
		return this.#entryTheData();
	}

	get get_checkIfDataToSendIsEmpty() {
		return this.#checkIfDataToSendIsEmpty();
	}

	set set_api(url) {
		this.#api = url;
	}
}

export class pabrikSubmitProcessor extends masySubmitProcessor {
	setApi() {
		//this.set_api = "https://script.google.com/macros/s/AKfycbw_qgL6gQ461xKUFwXw44Si-iEzpGjszAvqOh7ofHDG53dVbzbq3qVmtMMz--Pg9qh6Tw/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbxXWhcmQnczWgpzVbkjrhlsbOaV6Gwo3_7GdUBh9zX1Hjb_J7Rui-oZVYMT97MxNA3cgw/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbyYm3-phhARbczPrhb3-waLOoFd4UdX6Jfea-RVWAhdNyhQTNAyszsboVZbKC55TSWrWw/exec";
		this.set_api = "https://script.google.com/macros/s/AKfycbwdRP6avsB2L8Lds4VgbULxH3U0WmWDfoCwKF5tsdZOjtTUqoJPdY1jB2wNkrTRPAP0_w/exec";
	}

	//override method showConfirmation in parent class
	showConfirmation(msg, respon) {
		alert(`${msg}\nNomor Order Anda : ${respon}`);
	}

	#checkIfdataFormPabrikIsEmpty() {
		let dat = this.get_getDataForm; 
		if (dat['nama'] === "" || dat['kel'] === "") {
			throw new Error("Anda belum mengisi data identitas [Nama Pabrik & Kelurahan] dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}
	}

	detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				this.#checkIfdataFormPabrikIsEmpty();
				this.get_checkIfDataToSendIsEmpty;
				this.get_entryTheData;
			}
			catch(e) {
				alert(e);
			}
		});
	}


}

export class lokoSubmitProcessor extends masySubmitProcessor {
	setApi() {
		//this.set_api = "https://script.google.com/macros/s/AKfycbyYm3-phhARbczPrhb3-waLOoFd4UdX6Jfea-RVWAhdNyhQTNAyszsboVZbKC55TSWrWw/exec";
		//this.set_api = "https://script.google.com/macros/s/AKfycbwR6haE-f74V5IxghkK_M9J_47YBSMSbXph9yChQ8XNWyUjqgn9ejeskUIXBhhGOn5V2g/exec";
		this.set_api = "https://script.google.com/macros/s/AKfycbw_wTCCbmqV0-zcKeqFFOLhYQKaOtylHikS--iUZfdmG744d902tXIfYx26zQigpCpnGg/exec";
	}
	
	#checkIfdataFormLokoIsEmpty() {
		let dat = this.get_getDataForm; 
		if (dat['nama'] === "" || dat['kel'] === "") {
			throw new Error("Anda belum mengisi data identitas [Nama Perusahaan Loko & Kelurahan] dengan lengkap....Silahkan klik tanda tombol 'Back' untuk melengkapi data identitas.");
		}
	}

	detectIfSubmitClicked() {
		document.getElementById('sbmt').addEventListener('click', e => {
			try {
				this.#checkIfdataFormLokoIsEmpty();
				this.get_checkIfDataToSendIsEmpty;
				this.get_entryTheData;
			}
			catch(e) {
				alert(e);
			}
		});
	}

}

export class spbuSubmitProcessor extends masySubmitProcessor {
	
	#checkIfJmlEmpty() {
		if (document.getElementById('jml_nozzle').value === '') {
			throw Error('Jumlah PUBBM belum diisi, silahkan isi terlebih dahulu.');
		} 
	}
	
	//Override getter method in parent class
	get get_checkIfDataToSendIsEmpty() {
		return this.#checkIfJmlEmpty();
	}
}



