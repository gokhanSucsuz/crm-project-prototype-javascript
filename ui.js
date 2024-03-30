function UI() {}

UI.prototype.loadLeads = (storageLeads) => {
	//console.log(storageLeads);
	const tbody = document.querySelector("tbody");
	const error = document.querySelector(".error");
	leads = storageLeads.getLeadsFromStorage();
	if (leads.length < 1) {
		const h5 = document.createElement("h5");
		h5.classList = "fw-bold text-danger text-center";
		h5.innerHTML = "There is not any leads!";
		error.appendChild(h5);
		error.classList.remove("d-none");
	} else {
		error.classList.add("d-none");
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
			<button onclick="leadEdit(${index})" class="editBtn btn btn-sm btn-info w-100">Edit</button>
			<button onclick="leadDelete(${index})" class="deleteBtn btn btn-sm btn-danger w-100">Delete</button>
			</div>`;
			tr.appendChild(td);
			tbody.appendChild(tr);
		});
	}
};
UI.prototype.leadDetailModal = function (index2, storageLeads, storageNotes) {
	let notes = storageNotes.getNotesFromS();
	let leads = storageLeads.getLeadsFromStorage();
	leads
		.filter((item, index) => index == index2)
		.forEach((lead) => {
			modalTitle.innerHTML = `ID= ${lead.id} <br/> Name= ${lead.namep} <br/>Surname= ${lead.lastName}`;

			notes
				.filter((note) => note[0] == lead.id)
				.forEach((note, index) => {
					console.log(notes[index2][index]);
					const li = document.createElement("li");
					li.classList = "list-group-item";
					li.innerHTML =
						`<span class="fw-bolder">Note ${index2 + 1}:</span> ` + note;
					modalBodyUl.appendChild(li);
				});
			// if (lead.length > 4) {
			// 	for (let i = 5; i < lead.length; i++) {
			// 		const li = document.createElement("li");
			// 		li.classList = "list-group-item";
			// 		li.innerHTML =
			// 			`<span class="fw-bolder">Note ${i - 4}:</span> ` + lead[i];
			// 		modalBodyUl.appendChild(li);
			// 	}
			// } else {
			// 	const li = document.createElement("li");
			// 	li.classList = "list-group-item";
			// 	li.innerHTML = `<span class="fw-bolder text-danger">There is not any note...</span> `;
			// 	modalBodyUl.appendChild(li);
			// }
		});
};
UI.prototype.loadNotes = () => {};
UI.prototype.addNewNote = function () {
	const div = document.createElement("div");
	div.classList = "col-md-12 form-floating mb-3";
	const text = document.createElement("textarea");
	text.setAttribute("maxlength", "512");
	text.setAttribute("placeholder", "Leave a note here");
	text.style.height = "100px";
	text.classList = "form-control note";
	div.appendChild(text);
	const label = document.createElement("label");
	label.setAttribute("for", "note");
	label.classList = "mx-2";
	const note = document.querySelectorAll(".note");
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
			<button onclick="leadDelete(${
				record.length
			})" class="deleteBtn btn btn-sm btn-danger w-100">Delete</button>
			</div>
            </td>
            </tr>
    `;
};

UI.prototype.addNotesToUI = (notes) => {};
UI.prototype.deleteLeadFromUI = (id) => {};
UI.prototype.deleteNotesFromUI = (id) => {};
UI.prototype.deleteAllFromUI = () => {};
UI.prototype.clearForm = () => {};
UI.prototype.showMessage = (message, state) => {
	const cardBody = document.querySelector(".card-body");

	const div = document.createElement("div");
	div.className = `alert alert-${state}`;
	div.textContent = message;

	cardBody.appendChild(div);

	setTimeout(function () {
		div.remove();
	}, 2000);
};
UI.prototype.showNotesUI = (id) => {};
UI.prototype.hideNotesUI = (id) => {};
