import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FlightType } from '../../contexts/FlightContext';
import { airPortApi } from '../../networks/Client';

export interface ReduxFlightState {
	arrivals: any[];
	departures: any[];
	fetching: boolean; // veri çekildği state
	fetched: boolean;
	error: any;
}

const initialState: ReduxFlightState = {
	arrivals: [],
	departures: [],
	fetching: false,
	fetched: false,
	error: {},
};

interface PayloadState {
	ArrivalFlight: ArrivalFlight;
	FlightType: string;
}

export interface ArrivalFlight {
	Origin: any;
	Previous: any;
	FlightNumber: string;
	Status: string;
	Id: number;
}

// redux ile asenkron state load edilmesi

export const fetchFlights = createAsyncThunk('FETCH-FLIGHT', async () => {
	return (
		await airPortApi.post('/flightlayout/ArrivalFlights', {
			Std: new Date(),
		})
	).data;
});

// ASENKRON VERI ÇEKTIĞIMIZDEN DOLAYI aşağı statelerde gezeriz.
// Pending (Loading), Rejected (Reject), Fullfilled (Resolved)

// FLIGHT_INSERT
const flightSlice = createSlice({
	name: 'FLIGHT',
	initialState: initialState,
	reducers: {
		// senkron yani uygulama için client state burada çalışır
		insertItem: (
			state: ReduxFlightState,
			action: PayloadAction<PayloadState>
		) => {
			console.log('payload', action.payload);
			if (action.payload.FlightType === FlightType.arrival) {
				const exists = state.arrivals.find(
					(x) => x.Id === action.payload.ArrivalFlight.Id
				);
				// state böyle bir bilgisi yoksa ekle
				if (!exists) {
					state.arrivals = [...state.arrivals, action.payload.ArrivalFlight];
					// state içindeki arrivals güncellenmiş oldu
				}
			}
		},
		deleteItem: (state: ReduxFlightState, action: PayloadAction<any>) => {
			if (action.payload.FlightType === FlightType.arrival) {
				const filteredItems = state.arrivals.filter(
					(x) => x.Id !== action.payload.ArrivalFlight.Id
				);
				state.arrivals = [...filteredItems];
			}
		},
		updateItem: (state: ReduxFlightState, action: PayloadAction<any>) => {
			console.log('FlightType', action.payload);
			if (action.payload.FlightType === FlightType.arrival) {
				if (state.arrivals) {
					const exists = state.arrivals.find(
						(x) => x.Id === action.payload.ArrivalFlight.Id
					);

					// elimizde böyle bir kayıt varsa

					if (exists) {
						const _arrivals = state.arrivals.map((record: any) => {
							if (record.Id === action.payload.ArrivalFlight.Id) {
								return action.payload.ArrivalFlight; // güncel olanı döndür
							} else {
								return record; // eski datayı döndür.
							}
						});

						state.arrivals = [..._arrivals];
					} else {
						state.arrivals = [...state.arrivals, action.payload.ArrivalFlight];
					}
				}
			}
		},
	},
	extraReducers(builder) {
		// async state
		builder.addCase(fetchFlights.pending, (state: ReduxFlightState) => {
			// asenkron işlem ile ilgili o anki case göre state değiştiriyoruz
			state.fetching = true;
		});
		builder.addCase(
			fetchFlights.fulfilled,
			(state: ReduxFlightState, action: PayloadAction<any>) => {
				state.fetching = false;
				state.fetched = true;

				// console.log('data', action.payload.ArrivalFlights);

				state.arrivals = [...action.payload.ArrivalFlights];
			}
		);
		builder.addCase(
			fetchFlights.rejected,
			(state: ReduxFlightState, action: PayloadAction<any>) => {
				state.fetched = false;
				state.fetching = false;
				state.arrivals = [];
				state.error = action.payload; // hata payload
			}
		);
	},
});

// store reducer import etmek için reducer'ı dışarıya çıkardık.
export const FlightReducer = flightSlice.reducer;
// actionları dışarıya çıkardık
export const { insertItem, deleteItem, updateItem } = flightSlice.actions;

// 1. adım Store.ts dosyası tanımı
// 2. adım Slice create işlemi
// 3. adım Reducer'ın store tanımlanması
// 4. adım Index.tsx dosyasında storeProvider ile uygulamanın sarmallanması
// 5. adım artık componentlerden action'ın yollanması veya state çekilmesi
