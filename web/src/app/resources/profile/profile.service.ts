import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { ReqUpdatePassword, ReqUpdateProfile, ResUpdatePassword, ResUpdateProfile } from './profile.tyeps';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MyProfileService {

    private readonly url: string = env.apiUrl;
    private readonly httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    constructor(private readonly http: HttpClient) { }
    // ==================== Update Profile
    updateProfile(data: ReqUpdateProfile): Observable<ResUpdateProfile> {
        // console.log(data);
        
        return this.http.post<ResUpdateProfile>(this.url + '/my-profile', data, this.httpOptions);
    }

    // =================== Update password
    updatePassword(data: ReqUpdatePassword): Observable<ResUpdatePassword> {
        return this.http.post<ResUpdatePassword>(this.url + '/my-profile/change-password', data, this.httpOptions);
    }
}
