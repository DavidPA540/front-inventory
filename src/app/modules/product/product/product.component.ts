import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  getProducts(){
    this.productService.getProducts()
    .subscribe( (data:any) =>{
      console.log("respuesta de productos: ",data)
      this.processProductResponse(data);
    }, (error:any) =>{
      console.log("error de productos: ",error)
    })
  }

  processProductResponse(resp:any){
    const dataProduct: ProductElement[] = [];
    if(resp.metadate[0].code == "00"){
      let listCProduct = resp.product.products;

        listCProduct.forEach( (element: ProductElement) => {
          //element.category = element.category.name;
          element.picture = 'dara:image/jpeg;base64,'+element.picture;
          dataProduct.push(element);
        });
          //set teh datasource
          this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
          this.dataSource.paginator = this.paginator;
       }
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'

    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Producto Agregado","Exito");
        this.getProducts();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al guardar el producto ","Error");
      }
    });
  }

  openSnackBar(message : string, actions: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,actions,{
      duration: 2000
    })
  }

  edit(id:number,name:string,price:number,account:number,category:any){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data:{id: id,name:name,price:price,account:account,category:category}

    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Producto Editado","Exito");
        this.getProducts();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al editar el producto ","Error");
      }
    });
  }

  deletee(id: any){
    const dialogRef = this.dialog.open( ConfirmComponent, {
      width: '450px',
      data: {id: id, module: "product"}

    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Producto Eliminado","Exito");
        this.getProducts();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar producto","Error");
      }
    });
  }

  buscar(name:any){
    if(name.length === 0){
      return this.getProducts();
    }
      this.productService.getProductByName(name)
      .subscribe((resp: any)=>{
        this.processProductResponse(resp);
      })
  }

}

export interface ProductElement{
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
