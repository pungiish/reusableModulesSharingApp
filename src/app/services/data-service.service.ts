import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from "./environment-url-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor (private env: EnvironmentUrlService, private http: HttpClient) { }

	public getData (route: string): Observable<any> {
		return this.http.get(this.fullRoute(route, this.env.url))
	}

	private fullRoute (route: string, envAddress: string): string {
		return `${envAddress}/${route}`;
	}
}
