import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map, tap} from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
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
  getAllcategoryy(){ 
    return this.http.get<any>(`${environment.baseurl}/category/getAllCategory`)
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
  getallwishlist(no:any,size:any,userid:any, search: any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllWishlist?pageNo=${no}&pageSize=${size}&userId=${userid}&search=${search}`)
  }
  searchWishlist(userId: any, search: string) {
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllWishlist`, {
      params: {
        userId: userId.toString(),
        search: search
      }
    });
  }
  getproductbyname(productName:any,userId:any){
    return this.http.get<any>(`${environment.baseurl}/product/getProductByName?productName=${productName}&userId=${userId}`)
  }
  getallcart(no:any,size:any,userid:any){
    return this.http.get<any>(`${environment.baseurl}/wishlistCart/getAllCart?pageNo=${no}&pageSize=${size}&userId=${userid}`)
  }
  clearAllCart(userId: any) {
    return this.http.delete<any>(`${environment.baseurl}/order/clearCart?userId=${userId}`);
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
  getallproduct(no:any,size:any,productName:any,userid:any){
      return this.http.get<any>(`${environment.baseurl}/product/getAllProduct?pageNo=${no}&pageSize=${size}&productName=${productName}&userId=${userid}`)
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
  getallorder(userId:any){
    return this.http.get<any>(`${environment.baseurl}/order/getAllOrder?userId=${userId}`)
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
  forgotpassword(data:any){
   // @ts-ignore
   return this.http.post<any>(`${environment.baseurl}/auth/ForgotPassword`,data)
  }
  getcmsbyidwithhtml(cmsId:any){
    return this.http.get<any>(`${environment.baseurl}/master/getByCmsIdWithhtml?cmsId=${cmsId}`)
  }
  getlogin(userId:any){
    return this.http.get<any>(`${environment.baseurl}/user/getLoginUserDetailsById?userId=${userId}`)
  }
  downloadprintinvoice(orderId:any) {
    return this.http.get<any>(`${environment.baseurl}/order/printInvoice?orderId=${orderId}`);
  }
  getBrFoodUserOrderProduct(pageNo:any,pageSize:any,search:any,type:any,productName:any,skuCode:any,bin:any,vendor:any,quantity:any,price:any,totalPrice:any,customerName:any,ref:any,orderStatus:any,driver:any,transactionDate:any,route:any){
    return this.http.get<any>(`${environment.baseurl}/order/getBrFoodUserOrderProduct?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&type=${type}&productName=${productName}&skuCode=${skuCode}&quantity=${quantity}&bin=${bin}&vendor=${vendor}&price=${price}&totalPrice=${totalPrice}&customerName=${customerName}&ref=${ref}&driver=${driver}&orderStatus=${orderStatus}&transactionDate=${transactionDate}&route=${route}`);
  }
  getAllBrfoodUserOrder(pageNo:any,pageSize:any,search:any,vender:any){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/getAllBrfoodUserOrder?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&vender=${vender}`);
  }
  getorderbyorderid(pageNo:any,pageSize:any,orderId:any,userId:any,search:any,orderItemId:any){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/getOrderByOrderId?pageNo=${pageNo}&pageSize=${pageSize}&orderId=${orderId}&userId=${userId}&search=${search}&orderItemId=${orderItemId}`);
  }
  getallvendor(userId:any){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/getAllVendor?userId=${userId}`);
  }
  getalldropdowndata(type:any){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/getAllDropdownData?type=${type}`);
  }
  saveorder(orderId:any){
  // @ts-ignore
    return this.http.put<any>(`${environment.baseurl}/brfooduser/saveOrderPage?orderId=${orderId}`)
  }
  Cancelorder(orderId:any){
    // @ts-ignore
      return this.http.put<any>(`${environment.baseurl}/brfooduser/cancelOrderPage?orderId=${orderId}`)
    }
  changecheckedstatus(orderItemId:any){
      // @ts-ignore
      return this.http.put<any>(`${environment.baseurl}/product/changeCheckedStatus?orderItemId=${orderItemId}`)
  }
  getOrderProductInventoryedit(productId:any,orderItemId:any){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/getOrderProductInventory?productId=${productId}&orderItemId=${orderItemId}`)
  }
  changeweight(weight: any, inventoryId: any, orderItemId: any) {
    const url = `${environment.baseurl}/brfooduser/saveWeight?weight=${weight}&inventoryId=${inventoryId}&orderItemId=${orderItemId}`;
    return this.http.post(url, {});
  }
  checkWeightExists(weight:any,sku:any,orderItemId:any ){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/checkWeightExists?weight=${weight}&sku=${sku}&orderItemId=${orderItemId}`)
  }
  changestatusofproduct(confirmStatus:any,remark:any,orderItemId:any ){
    return this.http.get<any>(`${environment.baseurl}/brfooduser/changeStatusOfProduct?confirmStatus=${confirmStatus}&remark=${remark}&orderItemId=${orderItemId}`)
  }
  Updateremark(remark: any, orderItemId: any) {
    const url = `${environment.baseurl}/brfooduser/updateRemarkByOrderItemsId?remark=${remark}&orderItemId=${orderItemId}`;
    return this.http.post(url, {});
  }
  getallproductt(no:any,size:any){
    return this.http.get<any>(`${environment.baseurl}/product/getAllProduct?pageNo=${no}&pageSize=${size}`)
  }
  changeproduct(orderId:any,originalProductId:any,replaceProductId:any,orderItemId:any) {
    return this.http.get<any>(`${environment.baseurl}/brfooduser/changeProduct?orderId=${orderId}&originalProductId=${originalProductId}&replaceProductId=${replaceProductId}&orderItemId=${orderItemId}`);
   }

   private productSearchResults = new BehaviorSubject<any[]>([]);
  productSearchResults$ = this.productSearchResults.asObservable();

  setSearchResults(data: any[]) {
    this.productSearchResults.next(data);
  }
}


  
   
 