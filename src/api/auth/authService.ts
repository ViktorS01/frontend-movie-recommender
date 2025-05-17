import api from '../apiConfig';
import { AuthCredentialsRequest, AuthCredentialsResponse } from '../../types';

export const authService = {
  login: (credentials: AuthCredentialsRequest): Promise<AuthCredentialsResponse> => {
    return api.post<AuthCredentialsResponse>('/auth/login', credentials);
  },
};