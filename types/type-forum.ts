export interface TypeForum_CommentProps {
  id: string;
  isActive: boolean;
  komentar: string;
  createdAt: Date;
  authorId: string;
  Author: {
    id: string;
    username: string;
    Profile: {
      id: string;
      imageId: string;
    };
  };
}