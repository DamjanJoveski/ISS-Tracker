import './InfoCard.css'
import {useEffect, useState} from "react";
export function InfoCard() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("http://api.open-notify.org/astros.json")
                .then(response => {
                    if(!response.ok){
                        throw new Error('Network response was not OK !')
                    }
                    return response.json();
                })
                .then(data =>{
                    setPeople(data.people)
                })
                .catch(error => {
                    console.error('Error fetching ISS data:', error)
                })
        }
        fetchData();
    }, []);

    return (
        <div className="myCard">
            <div className="innerCard">
                <div className="frontSide">
                    <p className="title">Number of people onboard</p>
                    <p>{people.length}</p>
                    <p>Hover me for their names</p>
                </div>
                <div className="backSide">
                    <ul className="people">
                        {people.map((person,index) => {
                            return (
                                <li key={index}>
                                    <p>
                                        {person.name}
                                    </p>
                                </li>
                            )}
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}