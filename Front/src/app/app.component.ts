import { Component, OnInit } from '@angular/core';
import { ErrorMensaje } from './Models/error-mensaje';
import { NuevoProducto } from './Models/nuevo-producto';
import { Producto } from './Models/producto';
import { ProductoServicioService } from './Servicios/producto-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Front';
  public nuevo:NuevoProducto={categoria:"",descripcion:"",nombre:"",precio:0,unidades:0};
  public actualizar:Producto={categoria:"",descripcion:"",nombre:"",precio:0,unidades:0, id:0};
  public productosList:Producto[]=[];
  public errorSave:ErrorMensaje=undefined;
  public errorList:ErrorMensaje=undefined;
  constructor(public servicios:ProductoServicioService){
   
  }
  ngOnInit(): void {
    this.refresh();
  }
  private refresh(){
    this.errorList=undefined;
    this.servicios.listAll().subscribe((datos)=>{
      this.productosList =datos;
    },(error)=>{
      this.errorList = { codigo:error.error.codigo,mensaje:error.error.mensaje};
    });
  }
  public add():void{
    this.errorSave=undefined;
    this.servicios.add(this.nuevo).subscribe(
      (data)=>{
        this.cancelar();
        this.refresh();
      },
      (error)=>{
        this.errorSave = { codigo:error.error.codigo,mensaje:error.error.mensaje};
      });
  }
  public update():void{
    this.servicios.update(this.actualizar.id,this.nuevo).subscribe(
      (data)=>{
        this.cancelar();
        this.refresh();
      },
      (error)=>{
        this.errorSave = { codigo:error.error.codigo,mensaje:error.error.mensaje};
      });
  }
  public delete(id:number):void{
    this.servicios.delete(id).subscribe(
      (data)=>{
        this.cancelar();
        this.refresh();
      },
      (error)=>{
        this.errorSave = { codigo:error.error.codigo,mensaje:error.error.mensaje};
      });
  }
  public edit(prod:Producto):void{
    this.actualizar=prod;
    this.nuevo = { categoria:prod.categoria,descripcion:prod.descripcion,nombre:prod.nombre,precio:prod.precio,unidades:prod.unidades };
  }
  public cancelar(){
    this.nuevo={categoria:"",descripcion:"",nombre:"",precio:0,unidades:0};
    this.actualizar={categoria:"",descripcion:"",nombre:"",precio:0,unidades:0,id:0};
  }
}

