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
	url: string = "";
	userWidgets: Widget[] = [];
	allWidgets: Widget[] = [new Widget(),]


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

	// apply () {
	// 	const widget: Widget = new Widget()
	// 	this.widgetService.create(widget)
	// 		.subscribe(id => {
	// 			this.url = "https://localhost:44351/api/widgets/" + id + ".js";
	// 		});

	// }

	getWidget (widget: Widget) {
		console.log(widget);
	}

	copy (copy: string) {
		var copyText = document.getElementById(copy) as HTMLInputElement;
		/* Select the text field */
		copyText.select();
		document.execCommand("copy");
	}

	openVerticallyCentered (content) {
		console.log("click");

		this.modalService.open(content, { centered: true });
	}
}
