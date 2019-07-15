import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
	selector: 'app-components',
	templateUrl: './components.component.html',
	styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
	profile: any
	login: string = null;
	constructor (private authService: AuthService) { }

	async ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.profile = profile;
				return;
			}
			this.profile = null;
		})

	}
	chooseComponent(event){
		this.login = event;
		console.log(event);

	}
	selectedComponent (e) {
		console.log(e)
	}
}
