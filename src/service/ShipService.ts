import ShipBuild from '../type/ShipBuild';
import axios from 'axios';
import {API_URL_BASE} from './config';

export const findAllShipBuild = async () : Promise<[ShipBuild]> => {
  try {
    const resp = await axios.get(`${API_URL_BASE}/ship-builds`);
    return resp.data;
  } catch (error) {
    throw error;
  }
}
