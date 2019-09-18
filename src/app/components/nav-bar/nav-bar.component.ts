import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	isAuthenticated = false;
	isCollapsed = true;
	profile: any;
	faUser = faUser;
	faPowerOff = faPowerOff;

	constructor (public auth: AuthService) { }

	async ngOnInit () {

		};
	}
