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

StorageNotes.prototype.deleteNotesFromS = function (id) {
	let notes = this.getNotesFromS();
	console.log(notes);
	const newNotes = notes.filter((note) => note[0] != id);
	console.log(newNotes[0]);
	localStorage.setItem(keyN, JSON.stringify(newNotes));
};
