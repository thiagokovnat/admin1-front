import { CreateTaskRequest, Task} from "../models/Tasks";
import { CreateTask } from "../pages/CreateTask";
import LearningApi from './LearningApi';

export const uploadTask = async (params: CreateTaskRequest) => {
    try {
        const videoUploadResponse = await LearningApi.post("/tasks", params, {
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