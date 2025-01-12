import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiry.component.html',
  styleUrl: './inquiry.component.css'
})
export class InquiryComponent implements OnInit{
  inquiries: any[] = []; // To hold the inquiry data
  city = 'New York'; // Example city
  pageIndex = 1;
  pageSize = 10;
  private apiUrl = 'https://localhost:7203/api/Search/'; // API endpoint

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInquiries();
  }

  // Method to load inquiries from the API
  loadInquiries(): void {
    alert("Load Inqu");
    const a ={
      city :this.city,
      // pageIndex: this.pageIndex,
      // pageSize : this.pageSize
    }
    // Make HTTP GET request to the API
    this.http.post<any>(this.apiUrl,a).subscribe(
      (data:any) => {
        this.inquiries = data.inquiries;
        console.log(this.inquiries); // Optional: log the response to the console
      },
      (error:any) => {
        console.error('Error fetching inquiries', error);
      }
    );
  }

  getAllRecord(){
    this.http.get('https://localhost:7203/api/Inquariys').subscribe((res:any) => console.log(res));
  }
}
