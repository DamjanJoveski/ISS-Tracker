import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';

export function EarthGlobe() {
    const [issData, setIssData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://api.open-notify.org/iss-now.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setIssData(data);
                })
                .catch(error => {
                    console.error('Error fetching ISS data:', error);
                });
        };

        const intervalId = setInterval(fetchData, 1000);


        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                objectsData={issData ? [issData] : []}
                objectLat={d => d?.iss_position?.latitude || 0}
                objectLng={d => d?.iss_position?.longitude || 0}
                objectLabel="ISS"
                objectAltitude={0.0625}
            />
        </>
    );
}
