import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const ModalComponent = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [arrCharactersUrls, setArrCharactersUrls] = useState([])
  const [locationsOrigins, setLocationsOrigins] = useState('')
  

    useEffect( () => {
      const getCharactersUrl = () => {
        let temp = []
        arrCharactersUrls.map(characterUrl =>
          temp.push(axios.get(characterUrl))
        )
        return temp
      }

      const getData = async () => {
        let tempLocations = []
        let tempLocationsName
        await axios
          .get('https://rickandmortyapi.com/api/episode/' + props.id)
          .then(res => setArrCharactersUrls(res.data.characters))
          .then(() => {
            axios.all(getCharactersUrl()).then(
              axios.spread((...res) => {
                res.map(res => tempLocations.push(res.data.origin.name + ', '))
                tempLocationsName = new Set(tempLocations)
                setLocationsOrigins([...tempLocationsName])
              })
            )
          })
      }
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])

  const handleButton = () => {
      onOpen()
  }
    return (
      <>
        <Button onClick={handleButton}>{props.children}</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="sm" color="gray.400" fontWeight="bold">
                Las locaciones de los personajes en este capítulo son:{' '}
              </Text>
              {locationsOrigins}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
