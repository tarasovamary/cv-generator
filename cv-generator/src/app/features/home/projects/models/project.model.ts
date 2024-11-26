export interface Project {
  _id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  teamSize: string;
  techStack: string[];
  roles: string[];
  description?: string;
  responsibilities?: string;
}
