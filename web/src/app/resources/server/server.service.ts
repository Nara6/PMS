import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { Observable } from 'rxjs';
import { List } from './server.types';

@Injectable({
    providedIn: 'root',
})
export class ServerService {

    private readonly url: string = env.apiUrl;
    private readonly httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private http: HttpClient) { }

    // ==================== Read All Servers
    list(params: { limit: number, page: number, receipt_number?: number, from?: string, to?: string }): Observable<List> {
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        httpOptions['params'] = params;
        return this.http.get<List>(this.url + '/vms', httpOptions);
    }

    // ==================== Delete One Server
    delete(id: number = 0): Observable<{ statusCode: number, message: string }> {
        return this.http.delete<{ statusCode: number, message: string }>(this.url + '/sales/' + id, this.httpOptions);
    }
}
