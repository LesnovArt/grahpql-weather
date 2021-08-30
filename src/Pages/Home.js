import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WEATHER_QUERY } from '../graphql/Queries'

function Home () {
  const [ citySearched, setCitySearched ] = useState('')
  const [ getWeather, { data, error } ] = useLazyQuery(GET_WEATHER_QUERY, {
    variables : { name: citySearched },
  })

  if (error) {
    return <h1>"error found"</h1>
  }

  return (
    <div className='home'>
      <h3>Search For Weather</h3>
      <input
        type='text'
        placeholder='City Name'
        onChange={e => setCitySearched(e.target.value)}
      />
      <button onClick={() => getWeather()}>Search</button>
      {data && 
      <div className='weather'>
          <>
            <h1>{`City name: ${data?.getCityByName?.name}`}</h1>
            <p>{ `Temperature: ${data?.getCityByName?.weather?.temperature?.actual}`}</p>
            <p>{ `Description: ${data?.getCityByName?.weather?.summary?.description}`}</p>
            <p>{`Wind: ${data?.getCityByName.weather?.wind?.speed}`}</p>
          </>
        

      </div>
      }
    </div>)
}

export default Home
