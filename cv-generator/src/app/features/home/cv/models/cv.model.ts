export interface CV {
  _id: string;
  employeeId: string;
  name: string;
  description?: string;
  department: string;
  specialization: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
}
