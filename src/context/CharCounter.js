import axios from 'axios'
import { allUrls } from './Context'
import { useContext } from 'react'
import { apiContext } from '../context/Context'

export const CharCounter = async (array, char) => {
  console.time()
  const { totalEpisodesPages, totalEpisodes } = useContext(apiContext)
  let indexPages = []
  let episodes = []

  try {
    for (let i = 1; i < totalEpisodesPages + 1; i++) {
      indexPages.push(i)
    }
    await axios
      .all(allUrls(indexPages, 'episode'))
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
      .catch(error => {
        console.log(error)
      })
  } catch (err) {
    console.error(err)
  }
  console.log(episodes)
  console.timeEnd()
}
