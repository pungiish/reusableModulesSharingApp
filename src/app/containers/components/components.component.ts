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
	type: string = null;
	widget: string = null;
	colours: string[] = [];
	selectedValue: string;
	url: string = "";
	widgets: Widget[];
	closeResult: string;
	constructor (private modalService: NgbModal, private authService: AuthService, private data: DataService, private widgetService: WidgetService) {
		this.colours.push('green', 'red', 'blue');
		this.selectedValue = this.colours[0];
	}

	ngOnInit () {
		this.authService.profile.subscribe(x => this.data.user = new User(x.email, x.name, x.family_name, x.sub, null));
		this.widgetService.read(this.data.user)
			.subscribe(x => {
				this.widgets = x
				console.log(this.widgets);
			});
	}


	// Type of components.
	chooseComponent (componentType: string) {
		this.type = componentType;

	}
	// The component of type.
	selectedComponent (widget: string) {
		this.widget = widget;
	}

	onSelectedChange (value: string) {
		this.selectedValue = value;

	}
	apply () {
		const widget: Widget = new Widget(null, this.selectedValue, this.widget, this.data.user.Email)
		this.widgetService.create(widget)
			.subscribe(id => {
				this.url = "https://localhost:44351/api/widgets/" + id + ".js";
			});

	}

	openVerticallyCentered (content) {
		console.log("click");

		this.modalService.open(content, { centered: true });
	  }
}
