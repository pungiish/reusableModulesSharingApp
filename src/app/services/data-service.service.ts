import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from "./environment-url-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user-model'
import { Components } from 'src/app/models/component-model'

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor (private env: EnvironmentUrlService, private http: HttpClient) { }

	public create (body: User): Observable<any> {
		return this.http.post(this.env.url + "/Users", body, this.headers() )
	}
	public get (route: string): Observable<any> {
		return this.http.get(this.fullRoute(route, this.env.url))
	}
	public getComponent (body: Components): Observable<any> {
		return this.http.post(this.env.url + "/Users/Components", body, this.headers() )
	}
	private fullRoute (route: string, envAddress: string): string {
		return `${envAddress}/${route}`;
	}

	public DownloadFile(body: Components, componentName: string): Observable<any>{
		return this.http.post(this.env.url + "/Users/Components", body,
		{ responseType: 'blob' })
		.pipe(map(
			(res) => {

				var blob = new Blob([res], { type: "text/plain" })
				console.log(res);
				return blob;
		  }));
	}

	private headers () {
		return {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		}
	}
}
