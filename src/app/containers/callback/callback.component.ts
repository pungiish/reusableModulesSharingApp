import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

import { User } from "src/app/models/user-model";

@Component({
	selector: 'app-callback',
	templateUrl: './callback.component.html',
	styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
	constructor (private authService: AuthService, private router: Router, private data: DataService) { }

	async ngOnInit () {
		const client = await this.authService.getAuth0Client();
		const result = await client.handleRedirectCallback();

		const targetRoute =
			result.appState && result.appState.target ? result.appState.target : '/components';

		this.authService.isAuthenticated.next(await client.isAuthenticated());

		const userInfo = await client.getUser();
		const user: User = new User(userInfo.email, userInfo.given_name, userInfo.family_name, userInfo.sub, null);
		this.data.create(user)
			.subscribe(u => {
				this.data.user = new User(u.email, u.name, u.familyname, u.googleID, u.widgets)

			});
		this.router.navigate([targetRoute]);
	}
}
