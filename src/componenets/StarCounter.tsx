import React from 'react'
import SVGStar from '../assets/star.svg';

export default function StarCounter({starCount}:{starCount:number}) {
    if(starCount > 0) {
        return (
            <div className="StarCounter">
                    <img src={SVGStar} width="18" height="18" alt="star"/>
                    <span>{starCount}</span>
            </div>
        )
    }

    return <div />;
}
