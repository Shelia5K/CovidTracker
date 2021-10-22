import React from 'react'

const CountryInfo = (props) => {
    return (
    <div 
    className={`CountryInfo ${props.isOpened ? 'open' : 'close'}`} 
    style={{...props.style}}>
    <div className="CountryInfo_body"> 
            <h1 className="CountryInfo_info"><center>{props.CountryName}</center></h1>
            <h2 className="leftstr">Total Confirmed</h2><h2 className="rightstr">{props.TotalConfirmed}</h2>
            <h2 className="leftstr">Total Deaths</h2><h2 className="rightstr">{props.TotalDeaths}</h2>
            <h2 className="leftstr">Total Recovered</h2><h2 className="rightstr">{props.TotalRecovered}</h2>
            {props.children}
            <div style={{clear:'left'}} className="CountryInfo_close" onClick={props.onButtonClose}>OK</div>
        </div>
    </div>
    )
}

export default CountryInfo