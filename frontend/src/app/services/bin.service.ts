import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Bin } from '../models/bin.model';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BinService {  private apiUrl = 'http://localhost:8200/bins'; 
  bins = signal<Bin[]>([]);

  constructor(private http: HttpClient) {}

  getBins(): Observable<Bin[]> {
    return this.http.get<Bin[]>(this.apiUrl).pipe(
      tap(bins => this.bins.set(bins)),
      catchError(this.handleError<Bin[]>('getBins', []))
    );
  }

  addBin(bin: Omit<Bin, 'id' | 'createdAt' | 'lastCollectionDate' | 'nextCollectionDate'>): Observable<Bin> {
    return this.http.post<Bin>(this.apiUrl, bin).pipe(
      tap(newBin => {
        this.bins.update(bins => [...bins, newBin]);
      }),
      catchError(this.handleError<Bin>('addBin'))
    );
  }

  updateBin(bin: Bin): Observable<Bin> {
    const url = `${this.apiUrl}/update/${bin.id}`;
    console.log(url);
    return this.http.put<Bin>(url, bin).pipe(
      tap(() => {
        this.bins.update(bins => bins.map(b => b.id === bin.id ? bin : b));
      }),
      catchError(this.handleError<Bin>('updateBin'))
    );  
  }

  deleteBin(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.bins.update(bins => bins.filter(b => b.id !== id));
      }),
      catchError(this.handleError<void>('deleteBin'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
