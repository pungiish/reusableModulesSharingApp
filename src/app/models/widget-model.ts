export class Widget{
	Id: string
	Colour: string;
	Text: string;
	Name: string;
	UserId: string;

	constructor (id: string, colour: string, name: string, email: string, text?: string) {
		this.Id = id;
		this.Colour = colour;
		this.Name = name;
		this.UserId = email;
		this.Text = text;
	}
}
