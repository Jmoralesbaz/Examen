import { Component, OnInit } from '@angular/core';
import { ErrorMensaje } from './Models/error-mensaje';
import { Producto } from './Models/producto';
import { ProductoServicioService } from './Servicios/producto-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Front';
  public productosList:Producto[]=[];
  public error:ErrorMensaje=undefined;
  constructor(public servicios:ProductoServicioService){
   
  }
  ngOnInit(): void {
    this.servicios.listAll().subscribe((datos)=>{
      this.productosList =datos;
    },(error_m)=>{});
  }
}
