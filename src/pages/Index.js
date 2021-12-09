import {
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { apiContext } from '../context/Context'
import { Routes, Route } from 'react-router-dom'
import { CharCounter } from '../components/CharCounter'
import { EpisodeLocation } from '../components/EpisodeLocation'
import { Home } from '../components/Home'


export const Index = () => {
  const { isFetching, totalCharacters, totalEpisodes, totalLocations } = useContext(apiContext)
  return (
    <Flex
      w={{ sm: 'full', md: '70%' }}
      ml={{ sm: 1, md: '20%' }}
      flexDirection="column"
      pt={{ base: '120px', md: '75px' }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} pl="10%" spacing="24px">
        <Box>
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              Characters
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color="gray.500">
                {isFetching ? '...' : totalCharacters}
              </StatNumber>
            </Flex>
          </Stat>
        </Box>
        <Box minH="83px">
          <Box>
            <Flex w="60%">
              <Stat>
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Locations
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="gray.500">
                    {isFetching ? '...' : totalLocations}
                  </StatNumber>
                </Flex>
              </Stat>
              <Spacer />
            </Flex>
          </Box>
        </Box>
        <Box minH="83px">
          <Box>
            <Flex w="60%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Episodes
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="gray.500" fontWeight="bold">
                    {isFetching ? '...' : totalEpisodes}
                  </StatNumber>
                </Flex>
              </Stat>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/charcounter" element={<CharCounter />} />
        <Route path="/episodelocation" element={<EpisodeLocation />} />
      </Routes>
    </Flex>
  )
}
