export interface CreateTaskRequest {
  title: string;
  content: string;
  lecture_id: string;
}

export interface Task {
  title: string;
  content: string;
  id: string;
}