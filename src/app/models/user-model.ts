export class User {
	Name: string;
	Familyname: string;
	GoogleID: string;

	constructor (name: string, familyname: string, googleID: string) {
		this.Name = name;
		this.Familyname = familyname;
		this.GoogleID = googleID;
	}
}
