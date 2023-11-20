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

export interface Resolution{
  user: {
    id: number,
    username: string
  },
  resolution: string,
  grade: number
}
