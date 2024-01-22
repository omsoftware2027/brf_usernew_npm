import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDisease(no: any,size: any,region: any){
    const requestBody ={
      page:no,
      size:size,
      region:region
    }
    return this.http.post<any>(`${environment.baseurl}/disease/getDisease`,requestBody)
  }

  getRegion(){
    return this.http.post<any>(`${environment.baseurl}/disease/getRegion`,{})
  }

  // Get Overview Api
  getOverview(id:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getOverview?diseaseId=${id}`)
  }

  // Get News Api
  getNewsSearch(id:any,size:any,no:any,companies:any,products:any,newsType:any){
    const requestBody ={
      diseaseId:id,
      pageSize:size,
      pageNo:no,
      keyCompanies:companies,
      keyProducts:products,
      types:newsType
    }
    return this.http.post<any>(`${environment.baseurl}/v1/news/getNewsSearch`,requestBody)
  }

  // Api For key companies
  getAllKeyCompanies(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getAllKeyCompanies?pageNo=${no}&pageSize=${size}`)
  }

  // Api for Key products
  getAllKeyProducts(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl }/v1/news/getAllKeyProducts?pageNo=${no}&pageSize=${size}`)
  }

  // Api for News Type
  getAllNewsTypes(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getAllNewsTypes?pageNo=${no}&pageSize=${size}`)
  }

  // All Api for Competitors with dropdown start
  getCompetitorsByDiseaseId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getCompetitorsByDiseaseId?pageNo=${no}&pageSize=${size}&diseaseId=${id}`)
  }
  getAllCompetitorsBySearch(body:any){
    return this.http.post<any>(`${environment.baseurl}/disease/getAllCompetitorsBySearch`,body)
  }
  getAllCompetitorsKeyProducts(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllCompetitorsKeyProducts?pageNo=${no}&pageSize=${size}`)
  }
  getAllCompetitorsSubTypes(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllCompetitorsSubTypes?pageNo=${no}&pageSize=${size}`)
  }
  getAllCompetitorsTypes(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllCompetitorsTypes?pageNo=${no}&pageSize=${size}`)
  }
  
  // All Api for Competitors with dropdown end

  // Api for Conferences
  getConferencesByDiseaseId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getConferencesByDiseaseId?pageNo=${no}&pageSize=${size}&diseaseId=${id}`)
  }
  getAllConferenceByYear(year:any,no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllConferenceByYear?year=${year}&pageNo=${no}&pageSize=${size}`)
   }
   //Dropdown Api By year for conference
   getAllConferencesYear(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllConferencesYear?pageNo=${no}&pageSize=${size}`)
   }
   
  // Api for Competitive Landscape
  getCompetitiveLandscape(id:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getCompetitiveLandscape?diseaseId=${id}`)
  }

  // Api for Countries
  getAllCountries(){
    return this.http.get<any>(`${environment.baseurl}/v1/master/getAllCountries`)
  }

  // Api for Specialities
  getAllSpecialities(){
    return this.http.get<any>(`${environment.baseurl}/v1/master/getAllSpecialities`)
  }

  // Api for Positions
  getAllPositions(){
    return this.http.get<any>(`${environment.baseurl}/v1/master/getAllPositions`)
  }

   // Api for Kol Profile
   getAllKolProfile(body:any){
    return this.http.post<any>(`${environment.baseurl}/v1/kol/getAllKolProfileNew`,body)
  }
  // Product profile details by id
  // getAllProductProfileByDiseaseId(id:any){
  //   return this.http.get<any>(`${environment.baseurl}/disease/getAllProductProfileByDiseaseId?diseaseId=${id}`)
  // }
  // Get Conference Details
  getConferencesDetailsByDiseaseId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getConferencesByDiseaseId?diseaseId=${id}`)
  }
  // Get Compititors 
  getCompetitorsDetailsByDiseaseId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/news/getCompetitorsByDiseaseId?diseaseId=${id}`)
  }
  // Product profile details All Api  with dropdown start 
  getAllProductProfileBySearch(body:any){
    return this.http.post<any>(`${environment.baseurl}/disease/getAllProductProfileBySearch`,body)
  }
  getAllProductProfileKeyProducts(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllProductProfileKeyProducts?pageNo=${no}&pageSize=${size}`)
  }
  getAllProductProfileKeyCompanies(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllProductProfileKeyCompanies?pageNo=${no}&pageSize=${size}`)
  }
  getAllProductProfileTypes(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllProductProfileTypes?pageNo=${no}&pageSize=${size}`)
  }
  // Product profile details All Api  with dropdown end 
  
  //KOL Insights APIs
  getAllAwardsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllAwardsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllBookChaptersByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllBookChaptersByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllClinicalTrialsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllClinicalTrialsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllCongressByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllCongressByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllDisclosureByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllDisclosureByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllEdBoardsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllEdBoardsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllEducationsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllEducationsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllOtherClinicalTrialsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllOtherClinicalTrialsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllPatentsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllPatentsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllPublicationsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllPublicationsByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllSocietyRolesByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllSocietyRolesByKolId?pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getBiographyDetailsByKolId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getBiographyDetailsByKolId?kolId=${id}`)
  }
  getDigitalActivityByKolId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getDigitalActivityByKolId?kolId=${id}`)
  }
  getExpertFocusByKolId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getExpertFocusByKolId?kolId=${id}`)
  }
  getGoogleScholarByKolId(id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getGoogleScholarByKolId?kolId=${id}`)
  }
  getAllGuidelinesByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllGuidelinesByKolId??pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  getAllGrantsByKolId(no:any,size:any,id:any){
    return this.http.get<any>(`${environment.baseurl}/v1/kol/getAllGrantsByKolId??pageNo=${no}&pageSize=${size}&kolId=${id}`)
  }
  // Timelines api
  getAllTimelines(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/disease/getAllTimelines?pageNo=${no}&pageSize=${size}`)
  }
}