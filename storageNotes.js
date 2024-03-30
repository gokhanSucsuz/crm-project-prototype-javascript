const keyN = "notes";
function StorageNotes() {}

StorageNotes.prototype.addNotesToS = function (id, newNotes) {
	let notes = this.getNotesFromS();
	let leadNotes = notes.filter((note) => note.id == id);
	leadNotes.push(...notes, [id, newNotes]);
	localStorage.setItem(keyN, JSON.stringify(leadNotes));
};

StorageNotes.prototype.getNotesFromS = function () {
	return (notes = localStorage.getItem(keyN)
		? JSON.parse(localStorage.getItem(keyN))
		: []);
};

StorageNotes.prototype.deleteLeadFromS = function (id) {
	const newNotes = notes.filter((note) => note.id != id);
	localStorage.setItem(keyN, JSON.stringify(newNotes));
};
