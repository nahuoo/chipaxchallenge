import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
