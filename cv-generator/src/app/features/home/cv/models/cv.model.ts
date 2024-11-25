export interface CV {
  _id: string;
  employeeId: string;
  name: string;
  description?: string;
  department: string;
  specialization: string;
  skills: string[];
  projects: string[];
  createdAt?: string;
  updatedAt?: string;
}
