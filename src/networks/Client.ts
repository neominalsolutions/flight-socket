import axios from 'axios';
import { SetupInterceptors } from './axiosSetup';

export const airPortApi = SetupInterceptors(
	axios.create({
		baseURL: 'https://testservice.antalya-airport.aero/api',
		timeout: 5000,
	})
);
