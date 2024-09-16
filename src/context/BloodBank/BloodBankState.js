import { useState } from 'react';
import BloodBankContext from './BloodBankContext'

const BloodBankState = props => {
    const host = "http://localhost:5000";
    const [bloodBankAuthToken, setBloodBankAuthToken] = useState(null);
}