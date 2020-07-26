import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { Factura } from 'src/app/core/models/comprobantes/factura';
import { Subscription } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public invoice: Factura;
  public orderId: number;
  public subtotal: number;
  public address: string;
  public invoiceColumns: string[] = ['producto', 'precio', 'cantidad', 'total'];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number,
    private invoiceService: InvoiceService,
  ) {
    this.orderId = data;
  }

  ngOnInit(): void {
    this.getOrderInvoice();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOrderInvoice() {
    this.subscription.add(this.invoiceService.getInvoice(this.orderId)
      .subscribe(res => {
        this.invoice = res;
        this.subtotal = this.getSubTotal();
        this.address = this.getAddress();
      }));
  }

  downloadInvoice() {
    const data = document.getElementById('invoice');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`invoice-${this.invoice.id}.pdf`);
    });
  }

  getSubTotal() {
    return this.invoice.orden.detalles.reduce((acc, value) => acc += value.precioTotal, 0);
  }

  getAddress() {
    if (this.invoice.orden.delivery) {
      const { calle, numero, localidad } = this.invoice.orden.direccionEntrega;
      return `${calle} ${numero}, ${localidad.nombre}, ${localidad.provincia.nombre}`;
    } else {
      if (this.invoice.orden.cliente.direccionesEnvio[0] === undefined) {
        return '';
      } else {
        const { calle, numero, localidad } = this.invoice.orden.cliente.direccionesEnvio[0];
        return `${calle} ${numero}, ${localidad.nombre}, ${localidad.provincia.nombre}`;
      }
    }
  }

}
