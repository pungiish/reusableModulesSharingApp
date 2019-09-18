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
	constructor (private auth: AuthService) { }

	ngOnInit () {
		this.auth.handleAuthCallback();
	}
}
