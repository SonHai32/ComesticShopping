import { User } from '../../../models/user.model';
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  hasError: boolean;
  errorMessage: string;
  accessToken: string;
  refreshToken?: string;
}
