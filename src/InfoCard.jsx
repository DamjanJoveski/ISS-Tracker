import './InfoCard.css'
import {useEffect, useRef, useState} from "react";
import {isMobile} from 'react-device-detect';
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

    let isRotated = false;

    function mobileClickHandler() {
        const card = cardElement.current;
        if (!isRotated) {
            card.style.transform = 'rotateY(180deg)';
        } else {
            card.style.transform = 'rotateY(0deg)';
        }
        isRotated = !isRotated;
    }


    const cardElement = useRef()


    return (
        <div className="myCard" onClick={mobileClickHandler} >
            <div className="innerCard" ref={cardElement}>
                <div className="frontSide">
                    <p className="title">Number of people onboard</p>
                    <p>{people.length}</p>
                    <p className="actionText">{isMobile ? 'Click me for their names' : 'Hover me for their names'}</p>
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