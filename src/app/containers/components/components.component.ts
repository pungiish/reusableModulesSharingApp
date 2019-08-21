import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { Widget } from 'src/app/models/widget-model';
import { WidgetService } from 'src/app/services/widget-service.service';
import { User } from 'src/app/models/user-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-components',
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
	name = new FormControl('');
	colours: string[] = ["Red", "Green", "Blue"];
	userWidgets: Widget[] = [];
	widgetNames: string[] = ["Box", "Circle"]
	widgetOptions: any[] = [
		{ name: "box", colour: this.colours },
		{ name: "circle", colour: this.colours, text: "" }
	]
	selectedColour = "Red";
	selectedText: string;
	selectedOption: { name: string, colour: string[], text?: string };
	selectedWidget: Widget;
	response: string = "widget already exists!";
	url: string = "";
	show: boolean = false;
	autohide: boolean = true;

	constructor (private modalService: NgbModal, private authService: AuthService, private data: DataService, private widgetService: WidgetService) {

	}

	ngOnInit () {

		this.authService.profile.subscribe(x => this.data.user = new User(x.email, x.name, x.family_name, x.sub, null));
		this.data.create(this.data.user)
		.subscribe(u => console.log(u)
		)
		this.widgetService.read(this.data.user)
			.subscribe(x => {
				x.forEach(widget => {
					this.userWidgets.push(new Widget(widget.id, widget.tag, widget.colour, widget.name, widget.userId, widget.text))
				});
			});
		console.log(this.userWidgets);

	}

	apply () {
		const widget: Widget = new Widget(null, null, this.selectedColour, this.selectedOption.name, this.data.user.Email, this.selectedText)
		this.widgetService.create(widget)
			.subscribe(id => {
				if (id == null) {
					this.response = "Failed to create a new widget!"
					this.show = true;
				}
				else {
					this.url = "https://localhost:44351/api/widgets/" + id + ".js";
					//Check if widget already in array!
					if (this.userWidgets.find(x => x.Colour == widget.Colour && x.Name == widget.Name && x.Text == widget.Text)) {
						this.response = "Widget already exists!"
						this.show = true;
					}
					else {
						console.log(widget);

						widget.Id = id;
						this.userWidgets.push(widget);
						this.response = "Widget successfully created!"
						this.show = true;
					}
				}
			});
		setTimeout(() => {
			this.show = false;
		}, 1000);

	}

	update (widget: Widget) {
		this.widgetService.update(widget)
			.subscribe(res => console.log(res))
	}

	newWidget (widgetName: string) {
		this.selectedOption = this.widgetOptions.find(x => x.name == widgetName);
		console.log(this.selectedOption);
	}

	copyToClipboard (copy: string) {
		console.log(copy);
		var copyText = document.getElementById(copy) as HTMLInputElement;

		console.log(copyText.value);
		/* Select the text field */
		copyText.select();
		document.execCommand("copy");
	}

	openVerticallyCentered (content, widget) {
		let wid: Widget;
		if (widget != undefined) {
			this.selectedWidget = widget;
			wid = new Widget(widget.Id, widget.Tag,  widget.Colour, widget.Name, widget.UserId, widget.Text);

		}
		this.selectedOption = null;
		const modal = this.modalService.open(content, { centered: true });
		modal.result.then(() => {
			console.log('submit');
		}, () => {
			console.log('dismiss');
			if (widget) {
				console.log('inputWidget: ', widget);
				this.selectedWidget.Colour = wid.Colour;
				this.selectedWidget.Text = wid.Text;
				this.name.setValue(this.selectedWidget.Text);

			}
		})
	}
	updateText (e) {
		this.selectedWidget.Text = e;
	}
}
