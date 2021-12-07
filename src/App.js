import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react'
import { Footer } from './components/Footer'
import { Index } from './pages/Index'
import { Navbar } from './components/Navbar'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Index />
      <Footer />
    </ChakraProvider>
  )
}

export default App;
