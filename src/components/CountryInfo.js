import React from 'react'

const CountryInfo = (props) => {
    return (
    <div 
    className={`CountryInfo ${props.isOpened ? 'open' : 'close'}`} 
    style={{...props.style}}>
    <div className="CountryInfo_body"> 
            <h1 className="CountryInfo_info"><center>{props.CountryName}</center></h1>
            <h2 className="CountryInfo_info">Total Confirmed {props.TotalConfirmed}</h2>
            <h2 className="CountryInfo_info">Total Deaths {props.TotalDeaths}</h2>
            <h2 className="CountryInfo_info">Total Recovered {props.TotalRecovered}</h2>
            {props.children}
            <center><div className="CountryInfo_close" onClick={props.onButtonClose}>OK</div></center>
        </div>
    </div>
    )
}

export default CountryInfo