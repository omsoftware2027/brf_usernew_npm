import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map, tap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(`${environment.baseurl}/auth/login`, data)
      .pipe(
        map((apiResponse) => {
          console.log('hj')
          // Check if the 'response' property exists
          if (apiResponse && apiResponse.response) {
          

            // Store the name and profile image in local storage
         
            return apiResponse; // You can return the entire response if needed
          } else {
            // Handle the case where 'response' or 'name' and 'profileImage' are not found
            return null;
          }
        })
      );
  }
  signup(data:any){
    return this.http.post<any>(`${environment.baseurl}/user/signupUser`, data);
  }
  saveprofile(data:any){
    return this.http.post<any>(`${environment.baseurl}/user/saveOrUpdateUser`, data);
  }
  savewishlist(data:any){
    return this.http.post<any>(`${environment.baseurl}/wishlistCart/saveWishlist`, data);
  }
  
  savewishcart(data:any){
    return this.http.post<any>(`${environment.baseurl}/wishlistCart/saveCart`, data);
  }
  getAllcategoryy(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/category/getAllCategory?pageNo=${no}&pageSize=${size}`)
  }
  getAllProductByCategoryId(no:any,size:any,categoryId:any,userId:any){
    return this.http.get<any>(`${environment.baseurl}/category/getAllProductByCategoryId?pageNo=${no}&pageSize=${size}&categoryId=${categoryId}&userId=${userId}`)
  }
  getProductByCategoryId(productId:any,userId:any){
    return this.http.get<any>(`${environment.baseurl}/product/getProductById?productId=${productId}&userId=${userId}`)
  }
  getUserByUserId(userId:any){
    return this.http.get<any>(`${environment.baseurl}/user/getSignUpUserDataById?userId=${userId}`)
  }
  getallwishlist(no:any,size:any,userid:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllWishlist?pageNo=${no}&pageSize=${size}&userId=${userid}`)
  }
  getallcart(no:any,size:any,userid:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllCart?pageNo=${no}&pageSize=${size}&userId=${userid}`)
  }
  deletewishlist(wishlistId:any) {
    return this.http.delete<any>(`${environment.baseurl}/wishlistCart/deleteWishlistByWishlistId?wishlistId=${wishlistId}`);
  }
  deletecard(cartId:any) {
    return this.http.delete<any>(`${environment.baseurl}/wishlistCart/deleteCartByCartId?cartId=${cartId}`);
  }
  getallcmsdata(cmsEnum:any){
    return this.http.get<any>(`${environment.baseurl}/master/getCmsData?cmsEnum=${cmsEnum}`)
  }
  getallcmsdatabyid(cmsId:any){
    return this.http.get<any>(`${environment.baseurl}/master/getByCmsId?cmsId=${cmsId}`)
  }
  getallcardtotal(no:any,size:any,userid:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllCartTotal?pageNo=${no}&pageSize=${size}&userId=${userid}`)
  }
  savequtanity(userId: any,productId:any,quantity:any) {
    // @ts-ignore
   return this.http.post(`${environment.baseurl}/wishlistCart/saveQuantity?userId=`+userId+'&productId='+productId+'&quantity='+quantity);
    }
  getallproduct(no:any,size:any,productName:any){
      return this.http.get<any>(`${environment.baseurl}/product/getAllProduct?pageNo=${no}&pageSize=${size}&productName=${productName}`)
    }
  getallshppingaddress(no:any,size:any,userid:any){
      return this.http.get<any>(`${environment.baseurl}/master/getAllShippingAddress?pageNo=${no}&pageSize=${size}&userId=${userid}`)
    }
  saveaddress(data:any){
      return this.http.post<any>(`${environment.baseurl}/order/placeOrder`, data);
    }
  saveshippingaddress(data:any){
      return this.http.post<any>(`${environment.baseurl}/master/saveOrUpdateShippingAddress`, data);
    }
  changepassword(data:any){
      return this.http.post<any>(`${environment.baseurl}/auth/changePassword`, data);
    }

  getalladdress(no:any,size:any,userId:any){
      return this.http.get<any>(`${environment.baseurl}/master/getAllShippingAddress?pageNo=${no}&pageSize=${size}&userId=${userId}`)
    }
  getallbulkorder(categoryId:any,userId:any){
      return this.http.get<any>(`${environment.baseurl}/master/getAllWishlistForBulkOrder?categoryId=${categoryId}&userId=${userId}`)
   }
  getallstaff(no:any,size:any,userId:any){
    return this.http.get<any>(`${environment.baseurl}/user/getUsersByUserId?pageNo=${no}&pageSize=${size}&UserId=${userId}`)
  }
  getallorder(no:any,size:any,userId:any){
    return this.http.get<any>(`${environment.baseurl}/order/getAllOrder?pageNo=${no}&pageSize=${size}&userId=${userId}`)
  }
  deleteshippingaddress(shippingaddressid:any) {
    return this.http.delete<any>(`${environment.baseurl}/master/deleteShippingAddressById?shippingaddressid=${shippingaddressid}`);
  }
  deletestaff(userId:any) {
    return this.http.delete<any>(`${environment.baseurl}/user/deleteUserByUserId?userId=${userId}`);
  }
  deletecart(userId:any) {
    return this.http.delete<any>(`${environment.baseurl}/user/deleteUserByUserId?userId=${userId}`);
  }
  getallreorder(orderId:any,userId:any){
      // @ts-ignore
    return this.http.post<any>(`${environment.baseurl}/order/reorder?orderId=`+orderId+'&userId='+userId)
  }
  getallsigupuserbyid(userId:any){
        // @ts-ignore
  return this.http.post<any>(`${environment.baseurl}/user/getSignUpUserDataById?userId=`+userId)
  }
  getshppingsddressbyid(shippingAddressId:any){
    // @ts-ignore
  return this.http.get<any>(`${environment.baseurl}/master/getShippingAddressByShippingAddressId?shippingAddressId=`+shippingAddressId)
  } 
  getcontactus(){
  return this.http.get<any>(`${environment.baseurl}/master/getContactUs`);
   }
  getsocialmediaurl(){
    return this.http.get<any>(`${environment.baseurl}/master/getSocialUrl`);
  }
  bulkcartadd(data:any){
   // @ts-ignore
  return this.http.post<any>(`${environment.baseurl}/wishlistCart/bulkAddToCart`, data)
  }
  getorderbyid(userId:any){
    return this.http.get<any>(`${environment.baseurl}/order/getOrderByOrderId?orderId=${userId}`)
  }
  getcountcart(userId:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getCountCartByUserId?userId=${userId}`)
  }
  getcartcount(userId:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getCoutWishlistByUserId?userId=${userId}`)
  }
  savesubscriction(email:any){
       // @ts-ignore
    return this.http.post<any>(`${environment.baseurl}/master/saveSubscription?emailId=` +email);
  }
  getalllinkname(linkName:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getNameAndDescriptionByLink?linkName=${linkName}`)
  }
  forgotpassword(linkName:any){
   // @ts-ignore
   return this.http.post<any>(`${environment.baseurl}/auth/ForgotPassword`+userId)
  }
  getcmsbyidwithhtml(cmsId:any){
    return this.http.get<any>(`${environment.baseurl}/master/getByCmsIdWithhtml?cmsId=${cmsId}`)
  }
}