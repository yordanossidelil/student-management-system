import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentResponse } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(search = '', page = 1, limit = 10): Observable<StudentResponse> {
    const params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('limit', limit);
    return this.http.get<StudentResponse>(this.apiUrl, { params });
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
