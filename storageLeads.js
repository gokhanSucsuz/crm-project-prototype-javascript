const key = "leads";
function StorageLeads() {}

StorageLeads.prototype.addLeadToS = function (newLead) {
	let leadsList = this.getLeadsFromStorage();
	leadsList.push(newLead);
	localStorage.setItem(key, JSON.stringify(leadsList));
};
StorageLeads.prototype.getLeadsFromStorage = function () {
	let leads = localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key))
		: [];
	//console.log(leads);
	return leads;
};

StorageLeads.prototype.deleteLeadFromS = function (id) {
	let leads = this.getLeadsFromStorage();
	const newLeads = leads.filter((lead) => lead.id != id);
	localStorage.setItem(key, JSON.stringify(newLeads));
};

StorageLeads.prototype.clearAllLeadsFromS = function () {
	localStorage.clear();
};
