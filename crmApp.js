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
const txtSearch = document.querySelector("#txtSearch");
const form = document.querySelector("form");
const updateDeleteBtn = document.querySelectorAll(".updateDeleteBtn");
let leadID = document.querySelector("#leadID");
let storageLeads = new StorageLeads();
let storageNotes = new StorageNotes();

const ui = new UI();
const eventListeners = () => {
	load();
	leadID.addEventListener("change", load);
	addNewLead.addEventListener("click", addLeadFunc);
	addNewNote.addEventListener("click", addNoteFunc);
	cancelBtn.addEventListener("click", cancelFormFunc);
	txtSearch.addEventListener("keyup", filterElement);
};
eventListeners();
function load() {
	form.reset();
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
		storageLeads.addLeadToS(newLead);
		let notes = document.querySelectorAll(".leadNote");
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
	storageLeads.deleteLeadFromS(leads[index].id);
	storageNotes.deleteNotesFromS(notes[index][0]);
	load();
	ui.showMessage("Record is permanantly deleted!", "warning");
}
function leadEditFunc(index) {
	form.reset();
	let leads = storageLeads.getLeadsFromStorage();
	let notes = storageNotes.getNotesFromS();
	let id = leads[index].id;

	ui.editLeadToUI(leads, id, notes, index);
	updateBtn.addEventListener("click", () => {
		ui.updateLeadToUI(leads, id, notes);
		ui.showMessage("Update is successfully done!", "success");
		cancelBtn.classList.add("d-none");
		addNewLead.classList.remove("d-none");
		addNewNote.removeAttribute("disabled");
		updateBtn.classList.add("d-none");
		updateBtn.remove;
		const leadNotes = document.querySelectorAll(".leadNote");
		const labels = document.querySelectorAll(".note");
		leadNotes.forEach((leadNote, index) => {
			index >= 1 && leadNote.remove();
		});
		labels.forEach((label, index) => {
			index >= 1 && label.remove();
		});
		leadID = leads[index].id;
		load();
		location.reload();
	});
}
function cancelFormFunc() {
	ui.clearForm();
}
const filterFunc = (filterValue) => {
	ui.filter(filterValue);
};
function filterElement() {
	ui.filterElement();
}
