import { CreateLectureRequest, UploadVideoResponse } from "../models/Lectures";
import LearningApi from './LearningApi';

export const uploadLecture = async (params: CreateLectureRequest) => {
    try {
        let formData = new FormData();
        formData.append("file", params.file);
        const videoUploadResponse = await LearningApi.post<UploadVideoResponse>("/lectures/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        
        const createLectureParams = {
            title: params.title,
            id: videoUploadResponse.data.id
        }

        await LearningApi.put("/lectures/info", createLectureParams);
    } catch (error) {
        throw error;
    }
};