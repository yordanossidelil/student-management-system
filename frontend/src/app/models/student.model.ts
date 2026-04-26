export interface Student {
  _id?: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  year: number;
  gpa?: number | null;
  phone?: string | null;
  createdAt?: string;
}

export interface StudentResponse {
  students: Student[];
  total: number;
  page: number;
  limit: number;
}
