import {
  Box,
  Container,
  SimpleGrid,
  chakra,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'


export const Footer = () => {
    const SocialButton = ({
      children,
      label,
      href,
    }) => {
      return (
        <chakra.button
          bg={useColorModeValue('black', 'whiteAlpha.100')}
          rounded={'full'}
          ml={2}
          w={8}
          h={8}
          cursor={'pointer'}
          as={'a'}
          href={href}
          display={'inline-flex'}
          alignItems={'center'}
          justifyContent={'center'}
          transition={'background 0.3s ease'}
          _hover={{
            bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
          }}
        >
          <VisuallyHidden>{label}</VisuallyHidden>
          {children}
        </chakra.button>
      )
    }
    return (
      <Box
        pl={{ base: 0, md: '15%' }}
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 4 }}
            spacing={8}
          ></SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}
          >
            Nahuel Sigismondi
            <SocialButton label={'Github'} href={'https://github.com/nahuoo'}>
              <FaGithub />
            </SocialButton>
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2020 Chakra Templates. All rights reserved
          </Text>
        </Box>
      </Box>
    )
}



