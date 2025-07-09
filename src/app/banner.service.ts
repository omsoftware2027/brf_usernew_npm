import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private baseUrl = environment.baseurl; // Ensure this is correctly set in environment.ts

  constructor(private http: HttpClient) {}

  /**
   * Fetch banners with optional search and pagination.
   * 
   * @param search Optional search term
   * @param pageNo Page number (0-based index)
   * @param pageSize Number of items per page
   * @returns Observable containing the response
   */
  getBanners(search: string = '', pageNo: number = 0, pageSize: number = 30): Observable<any> {
    const url = `${this.baseUrl}/master/searchBanner`;
    
    const params = new HttpParams()
      .set('search', search)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(url, { params });
  }
}
