import { MessageType } from "src/app/types/message.type";

export interface AppState {
  isLoading: boolean;
  message: MessageType
}
