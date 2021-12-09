import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { apiContext } from '../context/Context'
import { allUrls } from '../context/Context'
import axios from 'axios'
import { ModalComponent } from './Modal'

export const EpisodeLocation = () => {
    const [allEpisodes, setAllEpisodes] = useState('')
    const [isFetching, setIsFetching] = useState(true)
    const [toogle, setToogle] = useState(false)
 
      const {
        totalEpisodesPages,
        totalEpisodes,
      } = useContext(apiContext)

    const handleClick = () => {
          async function getEpisodesData(){
            let indexEpisodesPages = []
            let episodes = []
            
              for (let i = 1; i < totalEpisodesPages + 1; i++) {
                indexEpisodesPages.push(i)
                }
              await axios
                  .all(allUrls(indexEpisodesPages, 'episode'))
                  .then(
                    axios.spread((...res) => {
                      for (let i = 0; i < res.length; i++) {
                        for (let j = 0; j < 20; j++) {
                          if (res[i].data.results[j]?.id <= totalEpisodes) {
                            episodes.push({
                              'name': res[i].data.results[j].name,
                              'id': res[i].data.results[j].id
                            })
                          }
                        }
                      }
                    })
                  )
                  .catch(error => {
                    console.log(error)
                  })
                  setAllEpisodes(episodes)
                  setIsFetching(false)
                }
            getEpisodesData()
            setToogle(!toogle)
        }
        
   return (
     <Grid
       templateColumns={{ md: '1fr', lg: '1fr 1fr' }}
       templateRows={{ md: '1fr auto', lg: '1fr' }}
       my="26px"
       gap="24px"
     >
       {isFetching ? (
         <Button onClick={handleClick}> Mostrar episodios </Button>
       ) : (
         ''
       )}
       {isFetching
         ? ''
         : allEpisodes.map(episode => (
             <ModalComponent
               key={episode.id}
               title={episode.name}
               id={episode.id}
             >
               {episode.name}
             </ModalComponent>
           ))}
       <Box minHeight="290.5px" p="1.2rem">
         <Box w="100%">
           <Flex flexDirection={{ sm: 'column', lg: 'row' }} w="100%">
             <Flex
               flexDirection="column"
               h="100%"
               lineHeight="1.6"
               width={{ lg: '45%' }}
             >
               <Text fontSize="sm" color="gray.400" fontWeight="bold">
                 Rick and Morty Challenge
               </Text>

               <Flex align="center"></Flex>
             </Flex>
           </Flex>
         </Box>
       </Box>
     </Grid>
   )
  }