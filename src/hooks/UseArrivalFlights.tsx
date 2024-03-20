import React, { useContext, useEffect, useState } from 'react';
import {
	FlightContext,
	FlightContextType,
	FlightType,
} from '../contexts/FlightContext';
import axios, { AxiosResponse } from 'axios';
import { SetupInterceptors } from '../networks/axiosSetup';

function useArrivalFlights(socket: WebSocket) {
	const { addItem, deleteItem, updateItem, init } = useContext(
		FlightContext
	) as FlightContextType;

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
				addItem(socketData.ArrivalFlight, FlightType.arrival);
			} else if (socketData.MessageType === 'update') {
				updateItem(socketData.ArrivalFlight, FlightType.arrival);
			} else {
				deleteItem(socketData.ArrivalFlight.Id, FlightType.arrival);
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
			.post(
				'/flightlayout/ArrivalFlights',
				{ Std: new Date() }
				// {
				// 	headers: { Authorization: 'Bearer ' + token },
				// }
			)
			.then((response: AxiosResponse) => {
				// Promise Resolve Veri geldi.
				console.log('data', response);
				init(response.data.ArrivalFlights, FlightType.arrival);
				setArrivalState(response.data.ArrivalFlights);
			});

		// fetch(
		// 	'https://testservice.antalya-airport.aero/api/flightlayout/ArrivalFlights',
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify({ Std: new Date() }),
		// 		headers: new Headers({
		// 			Authorization: 'Bearer ' + token,
		// 			'Content-Type': 'application/json',
		// 			'Access-Control-Allow-Origin': 'http://localhost:3000/',
		// 		}),
		// 	}
		// )
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		console.log('data', data);
		// 		init(data.ArrivalFlights, FlightType.arrival);
		// 		setArrivalState(data.ArrivalFlights);
		// 	})
		// 	.catch((err) => {
		// 		console.log('err', err);
		// 	});
	};

	return {
		state: arrivalState,
	};
}

export default useArrivalFlights;
