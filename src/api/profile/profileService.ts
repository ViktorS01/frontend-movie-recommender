import api from '../apiConfig';
import { Profile } from '../../types';

export const profileService = {
  getProfile: (): Promise<Profile> => {
    return api.get('/profile');
  },
};
