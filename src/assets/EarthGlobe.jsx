import Globe from 'react-globe.gl';
import {useEffect, useState} from "react";

export function EarthGlobe() {

     const [issData, setIssData] = useState([]);


    useEffect(() => {
        fetch("http://api.open-notify.org/iss-now.json")
            .then(r => r.json())
            .then(data => {
                console.log(data)
                setIssData(data)
            })
            .catch(err => console.log(err) )

    }, []);

    return (
        <>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                objectsData={[issData]}
                objectLat={d => d.iss_position.latitude}
                objectLng={d => d.iss_position.longitude}
                objectLabel="ISS"
            />
        </>
    )
}