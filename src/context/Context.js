import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const apiContext = createContext()

export const allUrls = (indexPages, queryName) => {
  let temp = []
  indexPages.map(index =>
    temp.push(
      axios.get(
        'https://rickandmortyapi.com/api/' + queryName + '?page=' + index
      )
    )
  )
  return temp
}

export const ApiDataProvider = ({ children }) => {
  const [totalEpisodes, setTotalEpisodes] = useState(0)
  const [totalEpisodesPages, setTotalEpisodesPages] = useState(0)
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [totalCharactersPages, setTotalCharactersPages] = useState(0)
  const [totalLocations, setTotalLocations] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    async function fetchInitialData() {
      await axios
        .all([
          axios.get('https://rickandmortyapi.com/api/episode'),
          axios.get('https://rickandmortyapi.com/api/location'),
          axios.get('https://rickandmortyapi.com/api/character'),
        ])
        .then(
          axios.spread((...res) => {
            setTotalEpisodes(res[0].data.info.count)
            setTotalEpisodesPages(res[0].data.info.pages)
            setTotalLocations(res[1].data.info.count)
            setTotalCharacters(res[2].data.info.count)
            setTotalCharactersPages(res[2].data.info.pages)
            setIsFetching(false)
          })
        )
        .catch(error => console.log(error))
    }
    fetchInitialData()
  },[])
  
  const value = {
    totalEpisodesPages,
    totalCharactersPages,
    totalCharacters,
    totalEpisodes,
    totalLocations,
    isFetching
  }

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>
}
