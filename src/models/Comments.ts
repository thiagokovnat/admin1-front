export interface Comment{
    id: number;
    author: {
        username: string;
    };
    content: string;
    parent_id: number;
    highlighted: boolean;
}

export interface MappedComment extends Comment{
    answers: Comment[];
}