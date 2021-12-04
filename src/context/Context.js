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
  const [locations, setLocations] = useState([])
  const [characters, setCharacters] = useState([])

  const getCharactersAndLocation = async () => {
    let indexPages = []
    let arrLocations = []
    let tempCharacters = []
    let tempLocations
    try {
      for (let i = 1; i < totalCharactersPages + 1; i++) {
        indexPages.push(i)
      }
      await axios.all(allUrls(indexPages, 'character'))
        .then(
          axios.spread((...res) => {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < 20; j++) {
                if (res[i].data.results[j]?.id <= totalCharacters) {
                  tempCharacters.push(res[i].data.results[j].name)
                  arrLocations.push(res[i].data.results[j].location.name)
                }
              }
            }
          })
        ).then(
          tempLocations = new Set(arrLocations),
          setLocations([...tempLocations])
        )
        .then(setCharacters(tempCharacters))
        .catch(error => {
          console.log(error)
        })
    } catch (err) {
      console.error(err)
    }
  }

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
    getCharactersAndLocation,
    totalCharacters,
    totalEpisodes,
    totalLocations,
    isFetching,
    locations,
    characters
  }

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>
}
