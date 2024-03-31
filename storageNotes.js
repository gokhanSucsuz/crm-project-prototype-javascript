const keyN = "notes";
function StorageNotes() {}

StorageNotes.prototype.addNotesToS = function (id, newNotes) {
	let notes = this.getNotesFromS();
	let leadNotes = notes.filter((note) => note.id == id);
	leadNotes.push(...notes, [id, newNotes]);
	localStorage.setItem(keyN, JSON.stringify(leadNotes));
};
StorageNotes.prototype.updateNotesFromS = function (notesUpdated) {
	localStorage.setItem(keyN, JSON.stringify(notesUpdated));
};

StorageNotes.prototype.getNotesFromS = function () {
	return (notes = localStorage.getItem(keyN)
		? JSON.parse(localStorage.getItem(keyN))
		: []);
};

StorageNotes.prototype.deleteNotesFromS = function (id) {
	let notes = this.getNotesFromS();
	const newNotes = notes.filter((note) => note[0] != id);
	localStorage.setItem(keyN, JSON.stringify(newNotes));
};

StorageNotes.prototype.deleteAllFromS = function () {
	localStorage.removeItem(keyN);
};
