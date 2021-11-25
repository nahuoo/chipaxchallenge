import {
  Box,
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import {Card} from './Card'
import { useContext } from "react"
import { apiContext } from '../context/Context'


export const Home = () => {

    const { isFetching, totalCharacters, totalEpisodes, totalLocations } = useContext(apiContext)

    return (
      <Flex
        ml={{ sm: 1, md: '20%'}}
        flexDirection="column"
        pt={{ base: '120px', md: '75px' }}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} pl="10%" spacing="24px">
          <Box>
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="black"
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
                    <StatNumber fontSize="lg" color="black" fontWeight="bold">
                      {isFetching ? '...' : totalEpisodes}
                    </StatNumber>
                  </Flex>
                </Stat>
              </Flex>
            </Box>
          </Box>
        </SimpleGrid>
        <Grid
          templateColumns={{ md: '1fr', lg: '1.8fr 1.2fr' }}
          templateRows={{ md: '1fr auto', lg: '1fr' }}
          my="26px"
          gap="24px"
        >
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
                  <Text
                    fontSize="lg"
                    color="gray.500"
                    fontWeight="bold"
                    pb=".5rem"
                  >
                    Nahuel Sigismondi
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    Fullstack developer Chipax
                  </Text>
                  <Spacer />
                  <Flex align="center">
                    <Button
                      p="0px"
                      variant="no-hover"
                      bg="transparent"
                      my={{ sm: '1.5rem', lg: '0px' }}
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
              </Flex>
            </Box>
          </Box>
        </Grid>
      </Flex>
    )
}