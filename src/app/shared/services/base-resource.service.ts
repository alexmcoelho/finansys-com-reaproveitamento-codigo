import { BaseResourceModel } from "../models/base-resource.model";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Injector } from "@angular/core";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient
    
    constructor(        
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient)
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)), //dessa forma eu digo qual o this que deve ser levado em consideração dentro da função neste T (classe), senão ele leva em consideração o observable
            catchError(this.hadleError)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}/edit`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.hadleError)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.hadleError)            
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.hadleError)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.hadleError)
        )
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = []
        jsonData.forEach(
            element => resources.push(this.jsonDataToResourceFn(element))
        )
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected hadleError(error: any): Observable<any> {
        return throwError(error)
    }
}