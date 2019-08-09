import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { Widget } from 'src/app/models/widget-model';
import { WidgetService } from 'src/app/services/widget-service.service';
import { User } from 'src/app/models/user-model';

@Component({
	selector: 'app-components',
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
	profile: User;
	type: string = null;
	widget: string = null;
	colours: string[] = [];
	selectedValue: string;
	url: string = "";
	constructor (private authService: AuthService, private data: DataService, private widgetService: WidgetService) {
		this.colours.push('green', 'red', 'blue');
		this.selectedValue = this.colours[0];
	}

	ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.profile = new User(profile.email, profile.given_name, profile.family_name, profile.sub, null);
				console.log(this.profile);

				return;
			}
			this.profile = null;
		})

	}

	// Type of components.
	chooseComponent (componentType: string) {
		this.type = componentType;

	}
	// The component of type.
	selectedComponent (widget: string) {
		this.widget = widget;
	}

	onSelectedChange(value: string) {
		this.selectedValue = value;
	}
	apply () {
		const widget: Widget = new Widget(this.selectedValue, this.widget, this.profile.Email)
		this.widgetService.create(widget)
			.subscribe(id => {
				this.url = "https://localhost:44351/api/widgets/" + id + ".js";
				console.log(this.url);
			});

	}
}
