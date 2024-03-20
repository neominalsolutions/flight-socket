import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FlightType } from '../contexts/FlightContext';
import { SetupInterceptors } from '../networks/axiosSetup';
import { RootDispatch } from '../store/store';
import {
	deleteItem,
	insertItem,
	updateItem,
} from '../store/features/FlightSlice';

function UseReduxArrivalFlights(socket: WebSocket) {
	// redux içerisinde state güncellemek için ise dispatch kullanılır
	const dispatch = useDispatch<RootDispatch>();

	const [arrivalState, setArrivalState] = useState();

	const client = SetupInterceptors(
		axios.create({
			baseURL: 'https://testservice.antalya-airport.aero/api',
			timeout: 3000,
		})
	);

	useEffect(() => {
		fetchData();

		//195.175.26.178:8080
		socket.onopen = onConnection;
		socket.onmessage = onMessageRecieved;
		socket.onclose = onClose;
	}, []);

	const onMessageRecieved = (evt: any) => {
		// socketten verile json string olarak gelir.
		const socketData = JSON.parse(evt.data);
		// gelen veriyi JSON objesine çevirdik.
		console.log('socketData', socketData);

		if (socketData.FlightType === FlightType.arrival) {
			console.log('... flightType');
			if (socketData.MessageType === 'insert') {
				dispatch(insertItem(socketData));
				// dispatch ile action tetikledik.
				// socketData.ArrivalFlight payload bilgisi
			} else if (socketData.MessageType === 'update') {
				dispatch(updateItem(socketData));
			} else {
				dispatch(deleteItem(socketData));
			}
		}
	};
	const onConnection = () => {
		console.log('socket is connected');
	};
	const onClose = () => {
		console.log('Connection is closed...');
	};

	// arrivals verisini çek state güncelle
	const fetchData = () => {
		// const token = localStorage.getItem('access_token');
		client
			.post('/flightlayout/ArrivalFlights', { Std: new Date() })
			.then((response: AxiosResponse) => {
				// Promise Resolve Veri geldi.
				console.log('data', response);
				// init(response.data.ArrivalFlights, FlightType.arrival);
				setArrivalState(response.data.ArrivalFlights);
			});
	};

	return {
		state: arrivalState,
	};
}

export default UseReduxArrivalFlights;
