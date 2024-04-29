import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../store/layoutSlice';

const Alert = () => {

    const type = useSelector(state => state.layoutSlice.alert.alertType)
    const message = useSelector(state => state.layoutSlice.alert.alertMessage)
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
        
        dispatch(
            setAlert({
                alert: {
                    alertType: "",
                    alertMessage: "",
                    alertVisible: false
                }
            })
        )
        setShowAlert(false);
    };

    return (
        showAlert && (
            <div className={`p-4 mx-16 my-4 rounded ${type === 'success' ? 'bg-green-200' : type === 'error' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <p className="text-lg text-gray-950">{message}</p>
                    </div>
                    <button onClick={handleClose} className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    );
};

export default Alert;
