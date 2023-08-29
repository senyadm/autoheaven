"use client";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '@/app/GlobalRedux/slice';
import { RootState } from '@/app/GlobalRedux/store';
import { AppDispatch } from '@/app/GlobalRedux/store';

function DataFetchingComponent() {
    const carMakes = useSelector((state: RootState) => state.carMakes.carMakes);
    const status = useSelector((state: RootState) => state.carMakes.status);

    const dispatch: AppDispatch = useDispatch();

    const handleFetch = () => {
        dispatch(fetchData());
    }

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error fetching data</p>}
            {status === 'idle' && (
                <div>
                    <p>Data:</p>
                    <ul>
                        {carMakes.map((make, index) => (
                            <li key={index}>{make}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleFetch}>Fetch Data</button>
        </div>
    );
}

export default DataFetchingComponent;
