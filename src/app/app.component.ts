import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import 'fecha';
import fechaObj from 'fecha';
/* import { SignaturePad } from 'angular2-signaturepad/signature-pad'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;
  totalRef: number = 0;
  obra: number = 0;
  otros: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  anticipo: number = 0;
  saldo: number = 0;
  myformValuesChanges$;
  fecha: string;
  combust: number;
  /* @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public signaturePadOptions: Object = {
    'minWidth': 3,
    'maxWidth': 4,
    / 'canvasWidth': 270,
    'canvasHeight': 80, *
    'penColor': 'rgb(16, 16, 16)'
  }; */
  public canvasWidth = 150;
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['red', 'yellow', 'green'],
    arcDelimiters: [33, 67],
    rangeLabel: ['E', 'F'],
    needleStartValue: 60,
  };

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
    this.myForm = this.fb.group({
      units: this.fb.array([
        this.getUnit()
      ])
    });
    this.myformValuesChanges$ = this.myForm.controls['units'].valueChanges;
    this.myformValuesChanges$.subscribe(units => {
      this.updateTotalUnitPrice(units);
    /*  this.numero =  num(this.total,{lang:'es'});
      this.numero = this.numero.toString();
      this.numero = this.numero[0].toUpperCase() + this.numero.slice(1);*/
    });
    this.generRow();
  }
  /* clearPad() {
    this.signaturePad.clear();
  } */
  combus(ev) {
   // console.log(ev.srcElement.value);
    this.needleValue = ev.srcElement.value;
  }
  updt() {
    this.subtotal = this.totalRef + this.obra + this.otros;
    this.iva = Math.round(this.subtotal* 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.anticipo;
  }
  private generRow() {
    for (let i = 1; i < 8; i++) {
      this.addUnit();
    }
  }

  private getUnit() {
    return this.fb.group({
      qty: [''],
      price: [''],
      importe: ['']/*,
      obra:[''],
      otros:[''],
      anticipo:['']*/
    });
  }

  private addUnit() {
    const control = <FormArray>this.myForm.controls['units'];
    control.push(this.getUnit());
  }

  getControls(frmGrp: FormGroup, key: string) {
  return (<FormArray>frmGrp.controls[key]).controls;
  }

  private updateTotalUnitPrice(units: any) {
    const control = <FormArray>this.myForm.controls['units'];
    this.totalRef = 0;
    for (let i in units) {
      let totalRefUnitPrice = (units[i].qty*units[i].price);
      if(totalRefUnitPrice != 0)
      control.at(+i).get('importe').setValue(totalRefUnitPrice, {onlySelf: true, emitEvent: false});
      this.totalRef += totalRefUnitPrice;
    }
    this.subtotal = this.totalRef + this.obra + this.otros;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.anticipo;
  }
}
