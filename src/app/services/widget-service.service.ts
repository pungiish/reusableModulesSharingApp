import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from "./environment-url-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Widget } from 'src/app/models/widget-model'
import { User } from '../models/user-model';

@Injectable({
	providedIn: 'root'
})
export class WidgetService {
	constructor (private env: EnvironmentUrlService, private http: HttpClient) { }

	public create (body: Widget): Observable<any> {
		return this.http.post(this.env.url + "/widgets/new", body, this.headers());
	}
	public read (user: User): Observable<any> {
		return this.http.get(this.env.url + "/widgets/" + user.Email);
	}
	private fullRoute (route: string, envAddress: string): string {
		return `${envAddress}/${route}`;
	}
	private headers () {
		return {
			headers: new HttpHeaders({
				//'Content-Type': 'application/json',
				'responseType': 'text'})
		}
	}
}
