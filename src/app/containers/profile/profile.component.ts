import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { User } from 'src/app/models/user-model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profile: any;
	user: User;
	profileJson: string;

	constructor (private authService: AuthService, private dataService: DataService) { }

	ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.dataService.read(profile).subscribe(ret => {
					this.user = new User(profile.email, profile.name, profile.familyname, profile.googleID, ret.widgets)
					console.log(this.user);
				});
				this.profile = profile;
				console.log(profile);

				this.profileJson = JSON.stringify(this.profile, null, 2);
				return
			}

			this.profile = null;
			this.profileJson = null;
		});


	}
}
