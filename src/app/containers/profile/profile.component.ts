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
	profileJson: string;

	constructor (private authService: AuthService, private dataService: DataService) { }

	ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.profile = profile;
				this.profileJson = JSON.stringify(this.profile, null, 2);
				this.profile = new User(profile.email, profile.given_name, profile.family_name, profile.sub);

				this.profile = this.dataService.read(this.profile).subscribe(ret => console.log(ret));
				return;
			}
			this.profile = null;
			this.profileJson = null;
		});


	}
}
