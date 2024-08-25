import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusquedaserviceService } from './busquedaservice.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Agrega CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demonvidalangular';
  @ViewChild('searchInput') searchInput!: ElementRef;
  results: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private apiService: BusquedaserviceService, private cdr: ChangeDetectorRef) { }

  onSearch() {
    const searchValue = this.searchInput.nativeElement.value;
    this.currentPage = 1; // Reinicia la página actual a 1
    this.results = []; // Limpia los resultados anteriores
    this.loadResults(searchValue);
  }

  private loadResults(query: string) {
    this.apiService.search(query).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
  
        // Ajusta esto si no hay `items` en la respuesta
        this.results = [...this.results, ...response];
  
        this.cdr.detectChanges(); // Forza la detección de cambios
        console.log('Results:', this.results); // Verifica los resultados aquí
      },
      error: (error) => {
        console.error('Error al enviar la búsqueda:', error);
      }
    });
  }

    get paginatedResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.results.slice(startIndex, endIndex);
    }
  
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.results.length) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }