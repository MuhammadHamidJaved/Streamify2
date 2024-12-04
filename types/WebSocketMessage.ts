export interface WebSocketMessage {
    type: "new_post" | "like" | "dislike";
    content?: string;
    post_id?: number;
    action?: "create" | "like" | "dislike";
    media?: string;
    access_token: string;
  }