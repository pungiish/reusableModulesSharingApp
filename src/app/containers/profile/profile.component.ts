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
	constructor (public auth: AuthService) { }

	ngOnInit () {

	}
}
