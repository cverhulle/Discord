// Ce modèle permet de créer un Post
export class Post{
    postId?: string;
    currentUserId!: string;
    otherUserId!: string;
    username!: string;
    image!: string;
    content!: string;
    timestamp!: Date;
    imageInChat?: string | null 

}