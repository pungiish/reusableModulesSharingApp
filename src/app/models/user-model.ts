import { Widget } from './widget-model';

export class User {
	Email: string;
	Name: string;
	Familyname: string;
	GoogleID: string;
	Widgets: Widget[];

	constructor (email: string, name: string, familyname: string, googleID: string) {
		this.Email = email;
		this.Name = name;
		this.Familyname = familyname;
		this.GoogleID = googleID;
	}
}
