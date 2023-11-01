
export interface CreateLectureRequest{
    title: string;
    file: File;
}

export interface UploadVideoResponse{
    id: string;
    file_name: string;
}

export interface Lecture{
    title: string;
    id: string;
}