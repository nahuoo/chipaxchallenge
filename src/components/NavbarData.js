import { useContext } from 'react'
import {
  Flex,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { apiContext } from '../context/Context'

export const NavbarData = () => {
    const { isFetching, totalCharacters, totalEpisodes, totalLocations } = useContext(apiContext)
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} pl="10%" spacing="24px">
      <Flex align="center" w="60%">
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
            <StatNumber fontSize="lg" color="gray.700">
              {isFetching ? '...' : totalCharacters}
            </StatNumber>
          </Flex>
        </Stat>
      </Flex>
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
            <StatNumber fontSize="lg" color="gray.700">
              {isFetching ? '...' : totalLocations}
            </StatNumber>
          </Flex>
        </Stat>
        <Spacer />
      </Flex>
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
            <StatNumber fontSize="lg" color="gray.700" fontWeight="bold">
              {isFetching ? '...' : totalEpisodes}
            </StatNumber>
          </Flex>
        </Stat>
      </Flex>
    </SimpleGrid>
  )
}
