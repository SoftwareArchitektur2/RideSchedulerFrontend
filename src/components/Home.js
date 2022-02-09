import React from 'react';
import BuslineOverview from './busline/BuslineOverview';
import './Home.css';

export default function Home({isAdmin}) {
    return <>
        <div className='welcome'>

        </div>
        <div className='linetable'>
            <BuslineOverview isAdmin={isAdmin}/>
        </div>
    </>;
}