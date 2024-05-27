import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
@Injectable()
export class UserService {

    private userDataSource = new BehaviorSubject({ email: '', password: '' });
    private userDataSource1 = new BehaviorSubject({ email: '', password: '' });
    private clearBookingSource = new BehaviorSubject(false);
    currentUserData = this.userDataSource.asObservable();
    currentUser = this.userDataSource1.asObservable();
    clearBooking = this.clearBookingSource.asObservable();
    url: string = '';
    constructor(public http: HttpClient) { }

    changeData(newUserData) {
        this.userDataSource.next(newUserData)
    }

    changeData1(newUserData) {
        this.userDataSource1.next(newUserData)
    }

    changeclearBookingSourceData(newData) {
        this.clearBookingSource.next(newData)
    }

    login(data: any) {
        sessionStorage['Authenticated'] = true;
        let sessionData = sessionStorage['user'] || '[]';
        let parseData = JSON.parse(sessionData);
        debugger
        let datas = parseData.find(el=> el.email == data.email);
        if(datas) {
            return of({status: 200, message:'success', data: datas});  
        } else {
            return of({status: 500, message: 'not found'})
        }
        // return this.http.post<any>(this.url, data);
    }
    signup(data: any) {
        data['id'] = Date.now();
        sessionStorage['Authenticated'] = false;
        let datas = JSON.parse(sessionStorage['user'] || '[]');
        datas.push(data);
        sessionStorage['user'] = JSON.stringify(datas);
        return of({status: 200, message:'success', data: data});
        // return of({status: 500, message: 'not found'})
        // return this.http.post<any>(this.url, data);
    }
}