import { Widget } from './widget-model';



export class User {
	Name: string;
	Familyname: string;
	GoogleID: string;
	Email: string;
	Widgets: Widget[];

	constructor (email: string, name: string, familyname: string, googleID: string, widgets: Widget[]) {
		this.Email = email;
		this.Name = name;
		this.Familyname = familyname;
		this.GoogleID = googleID;
		this.Widgets = widgets;
	}
}
