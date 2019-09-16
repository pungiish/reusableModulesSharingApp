import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from 'src/app/services/data-service.service';
import { User } from 'src/app/models/user-model';
import { Widget } from 'src/app/models/widget-model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profile: any;
	user: User;
	widgets: Widget[];
	profileJson: string;
	widgetsJson: string;

	constructor (private authService: AuthService, private dataService: DataService) { }

	ngOnInit () {
		this.authService.profile.subscribe(profile => {
			if (profile) {
				this.user = new User(profile.email, profile.given_name, profile.family_name, profile.sub, []);
				if (this.user.Email != undefined)
				{

					this.dataService.read(this.user).subscribe(ret => {
						this.user.Widgets = ret.widgets;
						ret.widgets.forEach(widget => {
							widget.script = "<script src=https://localhost:44351/api/widgets/" + widget.id + ".js></script>"
							delete widget.id;
						});
						this.widgetsJson = JSON.stringify(ret.widgets, null, 2)

					});
				}
				this.profile = profile;
				this.profileJson = JSON.stringify(this.profile, null, 2);

				return
			}
			this.profile = null;
			this.profileJson = null;
		});
		console.log("PROFILE ONINIT");


	}
}
