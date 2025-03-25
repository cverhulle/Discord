export class Post{
    postId?: string;
    currentUserId!: string;
    otherUserId!: string;
    username!: string;
    image!: string;
    content!: string;
    timestamp!: Date;
    imageToSend?: string | null;
    imageInChat?: string | null 

}