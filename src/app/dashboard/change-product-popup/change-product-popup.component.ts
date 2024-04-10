import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-product-popup',
  templateUrl: './change-product-popup.component.html',
  styleUrls: ['./change-product-popup.component.scss']
})
export class ChangeProductPopupComponent {
  currentPage = 0;
  pageSize = 30;
  productform!:FormGroup;
  productdata:any;
  productId:any;
  orderid:any;
  orderitemid:any;
  replaceproductid:any;
  constructor(public domSanitizer:DomSanitizer,public dialogRef: MatDialogRef<ChangeProductPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private service:DashboardService,private snackBar:MatSnackBar,private formBuilder:FormBuilder){

  }
  ngOnInit(): void{
   this.orderid=this.data.orderid;
   this.orderitemid=this.data.orderitemid;
   this.replaceproductid=this.data.replaceproductid;
    console.log("this.data.productName",this.data.orderid);
    console.log("this.data.productName",this.data.orderitemid);
    console.log("this.data.productName",this.data.replaceproductid);

    this.getallproduct() ;
    this.productform = this.formBuilder.group({
      productId: [''],
    });
  }
  getallproduct() {
   
     this.service.getallproductt(this.currentPage,this.pageSize).subscribe(res => {
       this.data =res;
       if (this.data.status === 0) {
         this.productdata = this.data.response.dataSet;
       }
       else {
         this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
       }
     })
   }
   changeproduct(){
    this.service.changeproduct(this.orderid,this.replaceproductid,this.productId,this.orderitemid).subscribe((res)=>{
      if(res['status']==0){
        this.snackBar.open("Product Change Sucessfully", 'x', { duration: 2000 })

        this. closeDialog();
        // this.changrproductlist = res.response;
        
      
      }

    });
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
