import axios from 'axios'
import { allUrls } from '../context/Context'
import { Box, Button, Flex, Grid, Spacer, Text, CircularProgress } from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import { apiContext } from '../context/Context'

export const CharCounter = () => {
  const [totalTime, setTotalTime] = useState(0)
  const [charInEpisodes, setCharInEpisodes] = useState(0)
  const [charInLocations, setCharInLocations] = useState(0)
  const [charInCharacters, setCharInCharacters] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const {
    totalEpisodesPages,
    totalEpisodes,
    totalCharactersPages,
    totalCharacters,
  } = useContext(apiContext)

  const handleClick = () => {
    let startTime = performance.now()
    async function getData() {
      let indexEpisodesPages = []
      let indexCharactersPages = []
      let episodes = []
      let arrLocations = []
      let characters = []
      let tempLocations = []
      let locations = 0
      try {
        for (let i = 1; i < totalEpisodesPages + 1; i++) {
          indexEpisodesPages.push(i)
          for (let i = 1; i < totalCharactersPages + 1; i++) {
            indexCharactersPages.push(i)
          }
          await axios
            .all(allUrls(indexEpisodesPages, 'episode'))
            .then(
              axios.spread((...res) => {
                for (let i = 0; i < res.length; i++) {
                  for (let j = 0; j < 20; j++) {
                    if (res[i].data.results[j]?.id <= totalEpisodes) {
                      episodes.push(res[i].data.results[j].name)
                    }
                  }
                }
              })
            )
            .then(
              setCharInEpisodes(
                episodes.toString().toLowerCase().match(/e/g).length
              )
            )
            .catch(error => {
              console.log(error)
            })
        }

        await axios
          .all(allUrls(indexCharactersPages, 'character'))
          .then(
            axios.spread((...res) => {
              for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < 20; j++) {
                  if (res[i].data.results[j]?.id <= totalCharacters) {
                    characters.push(res[i].data.results[j].name)
                    arrLocations.push(res[i].data.results[j].location.name)
                  }
                }
              }
            })
          )
          .then(
            setCharInCharacters(
              characters.toString().toLowerCase().match(/c/g).length,
              console.log(locations.toString().toLowerCase().match(/l/g).length)
            )
          )
          .catch(error => {
            console.log(error)
          })
      } catch (err) {
        console.error(err)
      }
      tempLocations = new Set(arrLocations)
      locations = [...tempLocations]
    }
    getData()
    setIsFetching(false)
    let endTime = performance.now()
    setTotalTime((endTime - startTime) / 1000 + ' segundos')
  }

  /* useEffect( () => {
    let startTime = performance.now()
      async function  getData() {
      let indexEpisodesPages = []
      let indexCharactersPages = []
      let episodes = []
      let arrLocations = []
      let characters = []
      let tempLocations = []
      let locations = 0
      try {
        for (let i = 1; i < totalEpisodesPages + 1; i++) {
          indexEpisodesPages.push(i)
          for (let i = 1; i < totalCharactersPages + 1; i++) {
            indexCharactersPages.push(i)
          }
          await axios
            .all(allUrls(indexEpisodesPages, 'episode'))
            .then(
              axios.spread((...res) => {
                for (let i = 0; i < res.length; i++) {
                  for (let j = 0; j < 20; j++) {
                    if (res[i].data.results[j]?.id <= totalEpisodes) {
                      episodes.push(res[i].data.results[j].name)
                    }
                  }
                }
              })
            )
            .then(
              setCharInEpisodes(
                episodes.toString().toLowerCase().match(/e/g).length
              )
            )
            .catch(error => {
              console.log(error)
            })
        }

        await axios
          .all(allUrls(indexCharactersPages, 'character'))
          .then(
            axios.spread((...res) => {
              for (let i = 0; i < res.length; i++) {
                for (let j = 0; j < 20; j++) {
                  if (res[i].data.results[j]?.id <= totalCharacters) {
                    characters.push(res[i].data.results[j].name)
                    arrLocations.push(res[i].data.results[j].location.name)
                  }
                }
              }
            })
          )
          .then(
            setCharInCharacters(
              characters.toString().toLowerCase().match(/c/g).length
            )
          )
          .then(
            setCharInLocations(
              locations.toString().toLowerCase().match(/l/g).length
            )
          )
          .catch(error => {
            console.log(error)
          })
      } catch (err) {
        console.error(err)
      }
      tempLocations = new Set(arrLocations)
      locations = [...tempLocations]
      
      
      
    }
    getData()
    setIsFetching(false)
    let endTime = performance.now()
    setTotalTime((endTime - startTime) / 1000 + ' segundos')
  })
*/
  return (
    <Grid
      templateColumns={{ md: '1fr', lg: '1.8fr 1.2fr' }}
      templateRows={{ md: '1fr auto', lg: '1fr' }}
      my="26px"
      gap="24px"
    >
      <Box minHeight="290.5px" p="1.2rem">
        <Box w="100%">
          <Flex flexDirection={{ sm: 'column', lg: 'row' }} w="100%">
            {isFetching ? (
              <CircularProgress isIndeterminate color="green.300" />
            ) : (
              <Flex
                flexDirection="column"
                h="100%"
                lineHeight="1.6"
                width={{ lg: '45%' }}
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  {totalTime}
                </Text>
                <Text
                  fontSize="lg"
                  color="gray.500"
                  fontWeight="bold"
                  pb=".5rem"
                >
                  Se encuentran {charInCharacters} letras C en todos los
                  Personajes
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  Se encuentran {charInLocations} letras L en todos los
                  Escenarios
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  Se encuentrasn {charInEpisodes} letras E en todos los
                  Episodios
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{ sm: '1.5rem', lg: '0px' }}
                    onClick={handleClick}
                  >
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .5s ease"
                      my={{ sm: '1.5rem', lg: '0px' }}
                      _hover={{ me: '4px', color: 'red' }}
                    >
                      Contactar
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>
    </Grid>
  )
}
