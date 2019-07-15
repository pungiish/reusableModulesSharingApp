import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

import { User } from "src/app/models/user-model";

@Component({
	selector: 'app-callback',
	templateUrl: './callback.component.html',
	styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
	constructor (private authService: AuthService, private router: Router) { }

	async ngOnInit () {
		const client = await this.authService.getAuth0Client();
		const result = await client.handleRedirectCallback();

		const targetRoute =
			result.appState && result.appState.target ? result.appState.target : '/components';

		this.authService.isAuthenticated.next(await client.isAuthenticated());

		const userInfo = await client.getUser();
		let user = new User(userInfo.name, userInfo.family_name, userInfo.sub);
		console.log(user);



		this.router.navigate([targetRoute]);
	}
}
