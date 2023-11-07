export interface CreateLectureRequest {
  title: string;
  file: File;
}

export interface UploadVideoResponse {
  id: string;
  file_name: string;
}

export interface Lecture {
  title: string;
  id: string;
}

export interface AddVideoToCourseParams {
  title: string;
  id: string;
  order: number;
  course_id: number;
}

export interface LectureByCourse {
  id: string;
  title: string;
  order: number;
}
