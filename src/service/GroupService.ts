import axios from 'axios';
import {API_URL_BASE} from './config';
import Group from './../type/Group';

export const findAllGroups = async (): Promise<Group> => {
  try {
    const resp = await axios.get(`${API_URL_BASE}/groups/ships`);
    return resp.data;
  } catch (error) {
    throw error;
  }
}
