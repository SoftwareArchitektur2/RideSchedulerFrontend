import React from 'react';
import BuslineOverview from './busline/BuslineOverview';
import './Home.css';

export default function Home() {
    return <>
        <div className='welcome'>

        </div>
        <div className='linetable'>
            <BuslineOverview />
        </div>
    </>;
}