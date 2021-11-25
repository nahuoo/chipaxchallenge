import {
  Box,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'

export const Card = ({Children}) => {
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
       {Children}
      </Box>
    </Center>
  )
}
