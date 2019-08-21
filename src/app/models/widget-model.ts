export class Widget{
	Id: string;
	Tag: string;
	Colour: string;
	Text: string;
	Name: string;
	UserId: string;

	constructor (id: string, tag: string, colour: string, name: string, email: string, text?: string) {
		this.Id = id;
		this.Tag = tag;
		this.Colour = colour;
		this.Name = name;
		this.UserId = email;
		this.Text = text;
	}
}
