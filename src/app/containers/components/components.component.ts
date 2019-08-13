import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { Widget } from 'src/app/models/widget-model';
import { WidgetService } from 'src/app/services/widget-service.service';
import { User } from 'src/app/models/user-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-components',
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
	colors: string[] = ["Red", "Green", "Blue"];
	userWidgets: Widget[] = [];
	widgetNames: string[] = ["Square", "Circle"]
	widgetOptions: any[] = [
		{ name: "square", color: this.colors },
		{ name: "circle", color: this.colors, text: "" }
	]
	selectedColor: string;
	selectedOption: { name: string, color: string[], text?: string };
	response: string = "widget exists";
	url: string = "";
	show: boolean = true;
	autohide: boolean = true;

	constructor (private modalService: NgbModal, private authService: AuthService, private data: DataService, private widgetService: WidgetService) {
	}

	ngOnInit () {
		this.authService.profile.subscribe(x => this.data.user = new User(x.email, x.name, x.family_name, x.sub, null));
		this.widgetService.read(this.data.user)
			.subscribe(x => {
				x.forEach(widget => {
					this.userWidgets.push(new Widget(widget.id, widget.color, widget.name, widget.userId))
				});
			});
	}

	apply () {
		const widget: Widget = new Widget(null, this.selectedColor, this.selectedOption.name, this.data.user.Email)
		this.widgetService.create(widget)
			.subscribe(id => {
				if (id == null) {
					this.response = "Failed to create a new widget!"
					this.show = true;
				}
				else {
					this.url = "https://localhost:44351/api/widgets/" + id + ".js";
					//Check if widget already in array!
					if (this.userWidgets.find(x => x.Color == widget.Color && x.Name == widget.Name)) {
						this.response = "Widget already exists!"
						this.show = true;
					}
					else {
						console.log("Widget successfully created!");
						widget.Id = id;
						this.userWidgets.push(widget);
						this.response = "Widget successfully created!"
						this.show = true;
					}
				}
			});
		setTimeout(() => {
			this.show = false;
		}, 5000);

	}

	getWidget (widget: Widget) {
		console.log(widget);
	}

	newWidget (widgetName: string) {
		this.selectedOption = this.widgetOptions.find(x => x.name == widgetName);
		console.log(this.selectedOption);
	}

	copy (copy: string) {
		var copyText = document.getElementById(copy) as HTMLInputElement;
		/* Select the text field */
		copyText.select();
		document.execCommand("copy");
	}

	openVerticallyCentered (content) {
		this.selectedOption = null;
		this.modalService.open(content, { centered: true });
	}
}
