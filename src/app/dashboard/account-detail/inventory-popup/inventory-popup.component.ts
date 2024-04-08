import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../../dashboard.service';
interface InventoryItem {
  isSold: boolean;
  // other properties of the object
}
interface InventoryItem {
  inventoryId: string; // Replace with the actual type of inventoryId
  // Define other properties and their types as needed
}

@Component({
  selector: 'app-inventory-popup',
  templateUrl: './inventory-popup.component.html',
  styleUrls: ['./inventory-popup.component.scss']
})
export class InventoryPopupComponent {
  productNameModal:any;
  totalPriceModal:any;
  customerdetail:any
  orderItemId:any;
  productDetails:any
  quantity:any;
  userId:any;
  currentPage=0;
  addressdetail:any;
  pageSize=30;
  orderDetails:any
  selectedRowWeight: any;
  inventoryIds:any;
  inputIndexToInventoryId: { [key: number]: number } = {};
  latestWeights: number[] = [];
  accumulatedWeights: number[] = [];
  selectedInventoryIds: number[] = [];
  inputValues:any;
  checkinventory:any;

  inventorylist:any;
  checkInventoryStatus:any
  constructor(public domSanitizer:DomSanitizer,public dialogRef: MatDialogRef<InventoryPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private service:DashboardService){

  }
  ngOnInit(): void{
    console.log("this.data.productName",this.data.productName);
    
    this.userId=localStorage.getItem('id');
    this.Orderedit();
  }
  Orderedit() {
    console.log(this.data.quantity, 'quantity');
    console.log(this.data.inventoryItems, 'inventoryItems');
    this.productNameModal = this.data.productName;
    this.totalPriceModal =  this.data.totalPrice;
    this.orderItemId =  this.data.orderItemId;
    this.quantity = parseInt(this.data.quantity, 10); // Set the quantity property
    this.inputValues = new Array(parseInt(this.data.quantity, 10)).fill('');
    this.checkInventoryStatus = new Array(this.inputValues.length).fill(true);
  
    // Subscribe to the getOrderProductInventory response
    this.service.getOrderProductInventoryedit(this.data.productId, this.orderItemId).subscribe((res) => {
      if (res['status'] == 0) {
        this.inventorylist = res.response.inventoryCodeAndWeightProjections;
        let isSold = false; // Initialize to false
        if (res.response?.inventoryCodeAndWeightProjections) {
          res.response.inventoryCodeAndWeightProjections.forEach((element: InventoryItem) => {
            if (element.isSold === true) {
              isSold = true;
            }
          });
        }
  
        this.patchInventoryWeights(this.data.inventoryItems);
      }
    });
  }

  generateArray(length: number): any[] {
    return new Array(length);
  }
  isValidNumber(value: any) {
    return !isNaN(parseFloat(value));
  }

  checkInventory(weightValue: any, index: number) {
    console.log('Checking Inventory for weight:', weightValue);
    const weight = this.isValidNumber(weightValue) ? parseFloat(weightValue) : 0;

    if (!this.inventoryIds) {
      this.inventoryIds = [];
    }

    if (!this.checkInventoryStatus) {
      this.checkInventoryStatus = [];
    }

    if (!this.inputIndexToInventoryId) {
      this.inputIndexToInventoryId = [];
    }

    if (weightValue === '' || weightValue === null || weightValue === undefined) {
      // Clear the input value and reset the inventory status when weightValue is empty
      this.inputValues[index] = '';
      this.checkInventoryStatus[index] = undefined as unknown as boolean; // Use 'undefined as boolean' to explicitly set it as boolean or undefined
      this.inputIndexToInventoryId[index] = 0;
    } else {
      // Perform inventory check when weightValue is not empty
      this.inputValues[index] = weightValue;
      this.service.checkWeightExists(weight, this.totalPriceModal, this.orderItemId).subscribe((res) => {
        this.checkInventoryStatus[index] = !!res.response; // Convert to boolean
        const inventoryId = res.response !== undefined ? res.response : 0;
        console.log('Received inventoryId:', inventoryId);
        this.inputIndexToInventoryId[index] = inventoryId;
      });
    }
  }
  sumbitInventory() {
    // Initialize arrays to store the weights and inventory IDs
    const weights: number[] = [];
    const inventoryIds: number[] = [];

    // Loop through the input values and populate the arrays up to the quantity limit
    const maxQuantity = this.quantity; // The maximum allowed quantity

    for (let i = 0; i < maxQuantity; i++) {
      const value = this.inputValues[i];
      const weight = this.isValidNumber(value) ? parseFloat(value) : 0;
      const inventoryId = this.selectedInventoryIds[i] || this.inputIndexToInventoryId[i] || 0;

      weights.push(weight);
      inventoryIds.push(inventoryId);
    }

    // Log the extracted inventory IDs and weights
    console.log('Inventory IDs:', inventoryIds);
    console.log('Weights:', weights);

    // Use the limited inventoryIds and weights arrays when calling the service
    this.service.changeweight(weights, inventoryIds, this.orderItemId).subscribe((res) => {
      // this.getmyorderbyorderid(orderid);
    });
  }
  // getmyorderbyorderid(orderid:any) {
  //   const serach ='';
  //   const orderitemid=''
  //   console.log('hksk')
  //   this.service.getorderbyorderid(this.currentPage, this.pageSize,orderid,this.userId,serach,orderitemid).subscribe(res => {
  //     this.data =res;
  //     if (this.data.status === 0) {
     
  //       this.customerdetail=this.data.response.dataSet.customerDetails;
  //       this.addressdetail=this.data.response.dataSet.shippingDetails;
  //       this.productDetails=this.data.response.dataSet.productDetails;
  //       this.orderDetails=this.data.response.dataSet.orderDetails
  //     }
  //     else {
  //     }
  //   })
  // }
  handleCheckboxClick(data: any, index: number) {
    if (index >= 0 && index < this.inputValues.length) {
      if (data.isSold) {
        // If the checkbox is checked, set the input value to the selected row's weight
        this.selectedRowWeight = data.weight;
        this.inputValues[index] = this.selectedRowWeight;
      } else {
        // If the checkbox is unchecked, clear the input value
        this.inputValues[index] = '';
      }

      data.isSold = !data.isSold; // Toggle the isSold property
      this.selectedInventoryIds[index] = data.inventoryId;
      console.log(this.inputValues[index], 'inputValue');
      console.log(this.selectedInventoryIds[index], 'inventoryId');
    }
  }
  checkboxes: boolean[] = [];
  updateInputValue(index: number,data:any) {
    if (data.isSold === true) {
      this.checkboxes[index] = true;
      this.checkInventory(data.weight,index)
      this.checkboxes[index] = true; // Check the checkbox
    } else {
      const blankIndex = this.inputValues.findIndex((value:any) => value === '');
      if (blankIndex !== -1) {
        this.inputValues[blankIndex] = this.inventorylist[index].weight;
        this.checkboxes[index] = false; // Uncheck the checkbox
       this.checkInventory(data.weight,index)
      }
    }
  }
  patchInventoryWeights(inventoryItems: any) {
    console.log('Starting patchInventoryWeights');
    const seenWeights = new Set<string>();
  
    for (const inventoryItem of inventoryItems) {
      const weight = String(inventoryItem.weight);
      const inventoryId = (inventoryItem.inventoryId);
      const index = this.inventorylist.findIndex((item: any) => item.inventoryId === inventoryId);
  
      if (index !== -1) {
        if (!seenWeights.has(weight)) {
          seenWeights.add(weight);
          this.inputValues[index] = weight;
        } else {
          this.inputValues[index] = weight;
          console.log('Duplicate Record:', weight);
        }
  
        console.log('Patched Weight:', weight);
      } else {
        console.log('Inventory item not found:', inventoryItem);
      }
    }
  
    console.log('Finished patchInventoryWeights');
    console.log('Updated inputValues:', this.inputValues);
  }
  toggleCheckbox(index: number) {
    this.checkboxes[index] = !this.checkboxes[index]; // Toggle the checkbox state

    // If the checkbox is checked, set the input value to the weight, else clear it
    if (this.checkboxes[index]) {
      this.inputValues[index] = this.inventorylist[index].weight;
    } else {
      this.inputValues[index] = ''; // Clear the input field
    }
  }
}
