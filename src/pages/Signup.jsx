import { useState } from 'react';
import { Input, Button, Box, VStack, Heading, useToast, Text, Link, Flex } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: 'Signup successful!', status: 'success' });
      navigate('/login');
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, blue.400, teal.500)">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w={{ base: '90%', sm: '400px' }}>
        <Heading mb={6} color="blue.600" textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSignup}>
          <VStack spacing={5}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.50"
              _focus={{ bg: 'white', borderColor: 'blue.400' }}
              size="lg"
            />
            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              bg="gray.50"
              _focus={{ bg: 'white', borderColor: 'blue.400' }}
              size="lg"
            />
            <Button type="submit" colorScheme="blue" w="full" size="lg">
              Sign Up
            </Button>
            <Text fontSize="sm" color="gray.600">
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="teal.500" fontWeight="bold">
                Log in
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}