// Ce modèle permet de typer le post dans un groupe de discussion

export class GroupPost{
    postId?: string;
    groupId!: string;
    senderId!: string;
    senderProfileImage!: string;
    senderUsername!: string;
    content!: string;
    timestamp!: Date;
    imageInChat?: string | null 
}