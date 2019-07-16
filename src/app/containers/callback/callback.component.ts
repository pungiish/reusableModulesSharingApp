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
		// console.log(userInfo);

		const user: User = new User(userInfo.given_name, userInfo.family_name, userInfo.sub);
		/* this.data.get("users")
			.subscribe(data => {
				// console.log(data);

			},
				(error) => {
					console.log(error);

				})
 */
		this.data.create(user)
			.subscribe(data => {
				// console.log(data);
			},
				(error) => {
					console.log(error);

				})


		this.router.navigate([targetRoute]);
	}
}
