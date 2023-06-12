import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) { 
    

  }

  generatePDF() {
    this.http.get<any[]>('http://localhost:4000/api/productos').subscribe(productos => {
      const doc = new jsPDF.default();
  
      // Crear el contenido del informe en formato de tabla
      let tableContent = '';
      productos.forEach((producto, index) => {
        const row = [
          index + 1,
          producto.producto,
          producto.categoria,
          producto.ubicacion,
          producto.precio
        ];
        tableContent += row.join('\t') + '\n';
      });
  
      const header = [['No.', 'Producto', 'Categoría', 'Ubicación', 'Precio']];
      const headerStyles = { fillColor: '#007bff', textColor: '#ffffff', fontStyle: 'bold', halign: 'center' };
      // Agregar el contenido al documento PDF
      doc.text('Mis Productos', 10, 10);
      doc.setFontSize(12);
      doc.text(tableContent, 10, 20);
  
      // Guardar el archivo PDF
      doc.save('MisProductos.pdf');
    });
  }
  

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  viewProducto(id?: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

}
