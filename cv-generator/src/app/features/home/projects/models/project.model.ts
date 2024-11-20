export interface Project {
  name: string;
  startDate: Date;
  endDate?: Date;
  teamSize: number;
  techStack: string[];
  roles: string[];
  description?: string;
  responsibilities?: string;
}
