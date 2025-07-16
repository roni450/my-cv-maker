import { useState } from 'react';
import { Input, Button, Box, VStack, Heading, useToast, Text, Link, Flex } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login successful!', status: 'success' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Invalid email or password', status: 'error' });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.400, blue.500)">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w={{ base: '90%', sm: '400px' }}>
        <Heading mb={6} color="teal.600" textAlign="center">Login</Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={5}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.50"
              _focus={{ bg: 'white', borderColor: 'teal.400' }}
              size="lg"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.50"
              _focus={{ bg: 'white', borderColor: 'teal.400' }}
              size="lg"
            />
            <Button type="submit" colorScheme="teal" w="full" size="lg">
              Login
            </Button>
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{' '}
              <Link as={RouterLink} to="/signup" color="blue.500" fontWeight="bold">
                Sign up
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}