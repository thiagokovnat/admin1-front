import { Comment, MappedComment } from "../models/Comments";
import LearningApi from "./LearningApi";


export const createComment = async (lecture_id: string, content: string, parent_comment_id: number) => {
    try {
        await LearningApi.post("/comments", {
            content,
            lecture_id,
            parent_comment_id
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })

        return true;
    } catch (error) {
        return false;
    }
}

export const getCommentForLecture = async (lecture_id: string) => {
    try {
        const response = await LearningApi.get("/comments/lecture/" + lecture_id);
        const comments = response.data.comments as Comment[];

        const commentsWithChildren: MappedComment[] = comments.map((comment) => {
            const children = comments.filter((c) => c.parent_id === comment.id);
            return { ...comment, answers: children };
        })

        return commentsWithChildren.filter(c => c.parent_id === null);
        
    } catch (error) {
        return [];
    }
}