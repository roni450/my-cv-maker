import React from "react";
import { Box, Flex, Spacer, Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <Box bg="teal.500" px={6} py={3} color="white">
      <Flex maxW="container.lg" mx="auto" alignItems="center">
        <ChakraLink as={Link} to="/" fontWeight="bold" fontSize="xl">
          CV Builder
        </ChakraLink>
        <Spacer />
        {user ? (
          <>
            <Button onClick={handleLogout} colorScheme="teal" variant="outline">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" mr={4} colorScheme="teal" variant="outline">
              Login
            </Button>
            <Button as={Link} to="/signup" colorScheme="teal" variant="solid">
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}
