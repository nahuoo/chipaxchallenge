import {
  Box,
  Button,
  Flex,
  Grid,
  Spacer,
  Text,
} from '@chakra-ui/react'

export const Home = () => {
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
            <Flex
              flexDirection="column"
              h="100%"
              lineHeight="1.6"
              width={{ lg: '45%' }}
            >
              <Text fontSize="sm" color="gray.400" fontWeight="bold">
                Rick and Morty Challenge
              </Text>
              <Text fontSize="lg" color="gray.500" fontWeight="bold" pb=".5rem">
                Nahuel Sigismondi
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                Fullstack dev
              </Text>
              <Spacer />
              <Flex align="center">
                <Button
                  as='a'
                  p="0px"
                  variant="no-hover"
                  bg="transparent"
                  my={{ sm: '1.5rem', lg: '0px' }}
                  href='mailto:nahuel.sigismondi@gmail.com'
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
  )
}
