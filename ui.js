function UI() {}
UI.prototype.loadLeads = () => {
	const tbody = document.querySelector("tbody");
	leads = storageLeads.getLeadsFromStorage();
	if (leads.length < 1) {
		ui.showMessage("There is not any leads!", "danger");
	} else {
		// error.classList.add("d-none");
		leads.forEach((lead, index) => {
			const tr = document.createElement("tr");
			tr.classList = "record";
			const th = document.createElement("th");
			th.setAttribute("scope", "row");
			th.textContent = index + 1;
			tr.appendChild(th);
			const name = document.createElement("td");
			name.textContent = lead.namep;
			tr.appendChild(name);
			const surName = document.createElement("td");
			surName.textContent = lead.lastName;
			tr.appendChild(surName);
			const phone = document.createElement("td");
			phone.textContent = lead.phone;
			tr.appendChild(phone);
			const email = document.createElement("td");
			email.textContent = lead.email;
			tr.appendChild(email);
			const td = document.createElement("td");
			td.innerHTML += `
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap btns">
			<button onclick="leadDetail(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="detailBtn btn btn-sm btn-primary w-100">Detail</button>
			<button onclick="leadEditFunc(${index})" class="editBtn btn btn-sm btn-info w-100">Edit</button>
			<button onclick="deleteLeadFunc(${index})" class="deleteBtn btn btn-sm btn-danger w-100">Delete</button>
			</div>`;
			tr.appendChild(td);
			tbody.appendChild(tr);
		});
	}
};
UI.prototype.leadDetailModal = function (index2, storageLeads, storageNotes) {
	modalBodyUl.innerHTML = "";
	let notes = storageNotes.getNotesFromS();
	let leads = storageLeads.getLeadsFromStorage();
	leads
		.filter((item, index) => index == index2)
		.forEach((lead) => {
			modalTitle.innerHTML = `ID= ${lead.id} <br/> Name= ${lead.namep} <br/>Surname= ${lead.lastName}`;

			notes
				.filter((note) => note[0] == lead.id)
				.forEach((note) => {
					note[1].forEach((note, index) => {
						const li = document.createElement("li");
						li.classList = "list-group-item";
						li.innerHTML =
							`<span class="fw-bolder">Note ${index + 1}:</span> ` + note;
						modalBodyUl.appendChild(li);
					});
				});
		});
};
UI.prototype.addNewNote = function () {
	const div = document.createElement("div");
	div.classList = "col-md-12 form-floating mb-3";
	const text = document.createElement("textarea");
	text.setAttribute("maxlength", "512");
	text.setAttribute("placeholder", "Leave a note here");
	text.style.height = "100px";
	text.classList = "form-control note leadNote";
	div.appendChild(text);
	const label = document.createElement("label");
	label.setAttribute("for", "note");
	label.classList = "mx-2 note";
	const note = document.querySelectorAll(".leadNote");
	label.textContent = `Note ${note.length + 1}`;
	div.appendChild(label);
	formControlElements.appendChild(div);
};
UI.prototype.addLeadToUI = (newLead) => {
	let record = document.querySelectorAll(".record");
	let leadList = document.querySelector("tbody");
	leadList.innerHTML += `
    <tr>
        <td class="fw-bold">${record.length + 1}</td>
        <td>${newLead.namep}</td>
        <td>${newLead.lastName}</td>
        <td>${newLead.phone}</td>
        <td>${newLead.email}</td>
        <td>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap btns">
			<button onclick="leadDetail(${
				record.length
			})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="detailBtn btn btn-sm btn-primary w-100">Detail</button>
			<button onclick="leadEdit(${
				record.length
			})" class="editBtn btn btn-sm btn-info w-100">Edit</button>
			<button onclick="deleteLeadFunc(${
				record.length
			})" class="deleteBtn btn btn-sm btn-danger w-100">Delete</button>
			</div>
            </td>
            </tr>
    `;
};
UI.prototype.editLeadToUI = function (leads, id, notes, index) {
	this.editOk();
	leads
		.filter((lead, index) => lead.id == id)
		.map((lead) => {
			leadID.value = lead.id;
			namep.value = lead.namep;
			surName.value = lead.lastName;
			phone.value = lead.phone;
			email.value = lead.email;

			let notesUI = document.querySelectorAll(".note");
			notesUI.forEach((note) => note.remove());
			notes
				.filter((note) => note[0] == lead.id)
				.forEach((note) => {
					note[1].forEach((note, index) => {
						let noteDiv = document.createElement("div");
						noteDiv.classList = "col-md-12 form-floating mb-3";
						let textarea = document.createElement("textarea");
						textarea.classList = "form-control note leadNote";
						textarea.setAttribute("maxlength", "512");
						textarea.style.height = "100px";
						textarea.value = note;
						let label = document.createElement("label");
						label.classList = "mx-2 note";
						label.setAttribute("for", "note");
						label.innerHTML = `Note ${index + 1}`;
						noteDiv.appendChild(textarea);
						noteDiv.appendChild(label);
						formControlElements.appendChild(noteDiv);
					});
				});
		});
};
UI.prototype.updateLeadToUI = (leads, id, notes) => {
	leads.map((lead) => {
		if (lead.id === id) {
			lead.namep = namep.value.trim();
			lead.lastName = surName.value.trim();
			lead.phone = phone.value.trim();
			lead.email = email.value.trim();
		}
	});
	storageLeads.updateLeadsFromStorage(leads);
	let leadNotes = document.querySelectorAll(".leadNote");
	notes
		.filter((note) => note[0] == id)
		.map((note) => {
			leadNotes.forEach((leadNote, index) => {
				note[1][index] = leadNote.value.trim();
			});
		});
	storageNotes.deleteAllFromS();
	storageNotes.updateNotesFromS(notes);
};
UI.prototype.clearForm = function () {
	cancelBtn.classList.add("d-none");
	addNewNote.removeAttribute("disabled");
	addNewLead.classList.remove("d-none");
	updateBtn.classList.add("d-none");
	detailBtns.forEach((detail) => {
		detail.removeAttribute("disabled");
	});
	editBtns.forEach((detail) => {
		detail.removeAttribute("disabled");
	});
	deleteBtns.forEach((detail) => {
		detail.setAttribute("disabled", false);
	});
	let notes = document.querySelectorAll(".leadNote");
	notes.forEach((note, index) => {
		if (index > 0) note.parentElement.remove();
	});
	form.reset();
	load();
};
UI.prototype.showMessage = function (message, state) {
	const cardBody = document.querySelector(".card-body");
	const div = document.createElement("div");
	div.className = `alert alert-${state}`;
	div.textContent = message;

	cardBody.appendChild(div);

	setTimeout(function () {
		div.remove();
	}, 2000);
};
UI.prototype.editOk = function () {
	cancelBtn.classList.remove("d-none");
	addNewNote.setAttribute("disabled", "true");
	addNewLead.classList.add("d-none");
	updateBtn.classList.remove("d-none");
	detailBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});
	editBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});
	deleteBtns.forEach((detail) => {
		detail.setAttribute("disabled", true);
	});
};
UI.prototype.filter = function (filterValue) {
	Array.from(tbody.children)
		.filter((todo) => !todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.add("filtered"));

	Array.from(tbody.children)
		.filter((todo) => todo.textContent.toLowerCase().includes(filterValue))
		.forEach((todo) => todo.classList.remove("filtered"));
};
UI.prototype.filterElement = function () {
	const filterValue = txtSearch.value.trim().toLowerCase();
	filterFunc(filterValue);
	console.log(filterValue);
};
