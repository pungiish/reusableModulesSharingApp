export class User {
	name: string;
	familyname: string;
	googleID: string;

	constructor (name: string, familyname: string, googleID: string) {
		this.name = name;
		this.familyname = familyname;
		this.googleID = googleID;
	}
}
