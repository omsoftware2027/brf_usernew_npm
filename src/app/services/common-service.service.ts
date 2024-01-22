import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }
  transform(value: string): string {
    let first = value?.substr(0, 1)?.toUpperCase();
    return first + value?.substr(1);
  }

  keyPressNumbers(event) {
    // Only Numbers 0-9
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  keyPressNumbersAndAlphabets(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
      return true;
    }
    else {
      return false;
    }
  }
  keyPressAlphabets(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
      return true;
    }
    else {
      return false;
    }
  }

  keyPressAlphabetsAndSpace(event: any) {
    event.target.value = event.target.value.trimLeft();
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 32)) {
      return true;
    }
    else {
      return false;
    }
  }

  keyPressAadharcardNumber(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
      return true;
    }
    else {
      return false;
    }
  }
  keyPressDocumentNumber(event: any, documentName: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (documentName == 'ADHAARCARD') {
      if ((charCode >= 48 && charCode <= 57)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || (charCode == 45) || (charCode == 32)) {
        return true;
      }
      else {
        return false;
      }
    }

  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  selectList(query: string, listClone: any): any[] {
    const result: any[] = [];
    for (const b of listClone) {
      if (b.toLowerCase().indexOf(query) > -1) {
        result.push(b)
      }
    }
    return result
  }

  searchList(query, listClone): any {
    var list;
    const d = query.toLowerCase();
    const result = this.selectList(d, listClone);
    if (query == '') {
      list = listClone;
    } else {
      // @ts-ignore
      list = result;
    }
    return list;
  }


  public selectDocNameList(query: string, listClone: any): any[] {
    const result: any[] = [];
    for (const b of listClone) {
      if (b.doctorName.toLowerCase().indexOf(query) > -1) {
        result.push(b)
      }
    }
    return result
  }

  public searchDocNameList(query, listClone): any {
    var list;
    const d = query.toLowerCase();
    const result = this.selectDocNameList(d, listClone);
    if (query == '') {
      list = listClone;
    } else {
      // @ts-ignore
      list = result;
    }
    return list;
  }
}
