const namep = document.querySelector("#name");
const surName = document.querySelector("#surname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const cancelBtn = document.querySelector("#cancelBtn");
const updateBtn = document.querySelector("#updateBtn");
const addNewLead = document.querySelector("#addNewLead");
const addNewNote = document.querySelector("#addNewNote");
const formControlElements = document.querySelector("#formControlElements");
const tbody = document.querySelector("tbody");
let tbodyTrs = document.querySelectorAll(".record");

const modalTitle = document.querySelector(".modal-title");
const modalBodyUl = document.querySelector(".modal-body ul");
const closeModal = document.querySelector(".closeModal");
const txtSearch = document.querySelector("#txtSearch");
const form = document.querySelector("form");
const updateDeleteBtn = document.querySelectorAll(".updateDeleteBtn");
let detailBtns = document.querySelectorAll(".detailBtn");
let editBtns = document.querySelectorAll(".editBtn");
let deleteBtns = document.querySelectorAll(".deleteBtn");
const leadID = document.querySelector("#leadID");

let storageLeads = new StorageLeads();
let storageNotes = new StorageNotes();

// let leadFromFetchAPI = fetch("https://fakestoreapi.com/users/1")
// 	.then((res) => res.json())
// 	.then((lead) => console.log(lead.id));

const ui = new UI();

const eventListeners = () => {
	load();
	addNewLead.addEventListener("click", addLeadFunc);
	addNewNote.addEventListener("click", addNoteFunc);
};
eventListeners();

function load() {
	tbody.innerHTML = "";
	ui.loadLeads(storageLeads);
	detailBtns = document.querySelectorAll(".detailBtn");
	editBtns = document.querySelectorAll(".editBtn");
	deleteBtns = document.querySelectorAll(".deleteBtn");
}

function addLeadFunc(e) {
	e.preventDefault();
	if (
		namep.value.trim() === "" ||
		surName.value.trim() === "" ||
		phone.value.trim() === "" ||
		email.value.trim() === ""
	) {
		ui.showMessage("Please check your data!!!", "danger");
	} else {
		const id = crypto.randomUUID();
		const newLead = new Leads(
			id,
			namep.value.trim(),
			surName.value.trim(),
			phone.value.trim(),
			email.value.trim()
		);
		ui.addLeadToUI(newLead);
		console.log(storageLeads);
		storageLeads.addLeadToS(newLead);
		let notes = document.querySelectorAll(".note");
		const newLeadNotes = [];
		notes.forEach((note) => {
			note.value.trim().length != 0 && newLeadNotes.push(note.value.trim());
		});
		storageNotes.addNotesToS(id, newLeadNotes);
		notes = notes.forEach((note, index) => {
			if (index > 0) note.parentElement.remove();
		});
		ui.showMessage("New record successfully added!", "success");
	}
	// tbodyTrs = document.querySelectorAll(".record");
	form.reset();
	load();
}

function addNoteFunc(e) {
	e.preventDefault();
	e.preventDefault();
	ui.addNewNote();
}

function leadDetail(index2) {
	ui.leadDetailModal(index2, storageLeads, storageNotes);
}
function deleteLeadFunc(index) {
	let leads = storageLeads.getLeadsFromStorage();
	let notes = storageNotes.getNotesFromS();
	console.log(notes[index][0], leads[index].id);
	storageLeads.deleteLeadFromS(leads[index].id);
	storageNotes.deleteNotesFromS(notes[index][0]);
	ui.deleteLeadFromUI(leads[0].id);
	ui.deleteNotesFromUI(leads[0].id);
	load();
}
