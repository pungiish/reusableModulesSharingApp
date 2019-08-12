import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from "./environment-url-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

import { User } from 'src/app/models/user-model'

@Injectable({
	providedIn: 'root'
})
export class DataService {
	user: User;
	constructor (private env: EnvironmentUrlService, private http: HttpClient) { }

	public create (body: User): Observable<any> {
		return this.http.post(this.env.url + "/users", body, this.headers() )
	}

	public read (body: User): Observable<any> {
		return this.http.get(this.env.url + "/users/" + body.Email)
	}

	private fullRoute (route: string, envAddress: string): string {
		return `${envAddress}/${route}`;
	}
	private headers () {
		return {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		}
	}
}
