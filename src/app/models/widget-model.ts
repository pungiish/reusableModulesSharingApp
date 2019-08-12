export class Widget{
	Id: string
	Color: string;
	Name: string;
	UserId: string;

	constructor (id: string, colour: string, name: string, email: string) {
		this.Id = id;
		this.Color = colour;
		this.Name = name;
		this.UserId = email;
	}
}
