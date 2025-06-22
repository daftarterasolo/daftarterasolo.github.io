export async function getKelurahan() {
	let url = "https://script.google.com/macros/s/AKfycbxNbS3tE2nm7KCbhIFw71dkBpwZn0MJWPbM2b7mhot7a3Ir0WxB3wCFCAnYOE38Dvo/exec";
	let kelurahan;
	await fetch(url)
	.then(datas => datas.json())
	.then(datas => {
	    let str = '';
	    for (let k in datas.data) {
			str += `<option value='${datas.data[k][0]}'>${datas.data[k][0]}</option>`;
	    }

	    document.getElementById("kelurahan").innerHTML = str;

	    kelurahan = datas.data;
	});

	return kelurahan;
}

export async function listOfUttpMasy() {
	let url = "https://script.google.com/macros/s/AKfycby7EeCgoLpKAKNy9En83dAIg9cgovMEPrbwl9bNYI9M0-Br50gG53fBOpwi3p_3PQQ/exec";		
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp.filter(e => {return e[0] != "PUBBM" && e[0] != "TJE"}));		
}

export async function listOfUttpPabrik() {
	let url = "https://script.google.com/macros/s/AKfycbzH27ZTSKFF2Q2xXIRQEs7sd6uNzTfZpp-9BvO9a5JDDrhnf_YHzqc_TYoMtdDNOVI/exec";
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp.filter(e => {return e[0] != "N" && e[0] != "TP" && e[0] != "TE" && e[0] != "Meter Kayu" && e[0] != "PUBBM" || (e[0] === "TE" && e[1] === "-") || (e[0] === "TP" && e[1] === "-")}));		
}

export async function getPabrikTimb() {
	let url = "https://script.google.com/macros/s/AKfycbz7z-gCbm3-l3qQJB-41YHoGCxk_4kyWLMQ6N573RBJjvXW7wkNpnBNAwxMlqzAXQs/exec";

	let pabrik = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("pabrik").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		pabrik = data.uttp;
	});

	return pabrik;
}


export async function getMerkHistory() {
	let url = "https://script.google.com/macros/s/AKfycbyyukoK96KJiE4c6FzKPlCjqTY-i9u82iUF4QoVPAfKW3IGBJRh7udVRKIe6tiKZGE/exec";

	let merkHistory = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("merkHistory").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		merkHistory = data.uttp;
	});

	return merkHistory;
}

export async function getTipeHistory() {
	let url = "https://script.google.com/macros/s/AKfycbyyoqHXlrWHFV8lkxlNaOiEQ9uJ6cp2yuzPjgA2YTD7B5kJxP4lPRFIzhDJ-ueWnyI/exec";

	let tipeHistory = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("tipeHistory").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		tipeHistory = data.uttp;
	});

	return tipeHistory;
}

export async function getWtuWilayah() {
	let url = "https://script.google.com/macros/s/AKfycbzgXh7UnaSzYZrofseIFgIerih0Fpi6SfEsSd39-5fHtjoIVKSvOuRfRQRm1XqQNfg/exec";

	let wtuWilayah = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("wtuWilayah").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[2]}'>${elem[2]}</option>`,'');
		wtuWilayah = data.uttp;
	});

	return wtuWilayah;
}


export async function getSpbu() {
	let url = "https://script.google.com/macros/s/AKfycbxsy-EBzyq_wZeV7IWGY4DDQ12NE1FnB7wn9TWFG2lde1ytQHfkV4vfWVk-xbelLL0/exec";

	let spbu = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("spbu").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		spbu = data.uttp;
	});
	
	return spbu;
}

export async function getPerusahaanLoko() {
	let url = "https://script.google.com/macros/s/AKfycbzG7LVYx6Vk4IUMLlTA6IYNDaPIsMCPlcts4e5h343w_d9j1GkMVx9x1HdsSsH873g/exec";

	let spbu = [];
	await fetch(url).then(data => data.json()).then(data => {
		document.getElementById("perushLoko").innerHTML = data.uttp.reduce((acc,elem) => `${acc}<option value='${elem[1]}'>${elem[1]}</option>`,'');
		spbu = data.uttp;
	});
	
	return spbu;
}

export async function listOfUttpMasyRedApp() {
	let url = "https://script.google.com/macros/s/AKfycbzH27ZTSKFF2Q2xXIRQEs7sd6uNzTfZpp-9BvO9a5JDDrhnf_YHzqc_TYoMtdDNOVI/exec";
	return await fetch(url).then(datas => datas.json()).then(datas => datas.uttp.filter(e => {return e[0]}));		
}