import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CounterState = {
    value: number;
    status: 'idle' | 'loading' | 'failed';
};

const initialState: CounterState = {
    value: 0,
    status: 'idle',
};

export const fetchData = createAsyncThunk('counter/fetchData', async () => {
    const response = await axios.get('https://91ea-5-34-127-188.ngrok-free.app/car_makes', {
        headers: {
            'ngrok-skip-browser-warning': 'anyValueYouWantHere'
        }
    });
    console.log(response)
    return response.data;
});

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        addByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'idle';
                state.value = action.payload;  // Assuming the data is a number for this example
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { increment, decrement, addByAmount } = counterSlice.actions;

export default counterSlice.reducer;
