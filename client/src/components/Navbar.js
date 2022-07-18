import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useBasket } from "../context/BasketContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { basket } = useBasket();

  const authAdmin = "pmustafa0@gmail.com";

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goBasket = () => {
    navigate("/basket");
  };

  const goAdmin = () => {
    navigate("/admin");
  };

  localStorage.setItem("colorMode", colorMode);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("basket", JSON.stringify(basket.length));

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* LOGO AND HOME BUTTON CODES*/}

          <Flex>
            {" "}
            <Button variant="ghost">E-commerce</Button>
            <Button onClick={() => goHome()} variant="ghost">
              Home
            </Button>
            {basket.length > 0 && (
              <Button onClick={() => goBasket()} variant="ghost">
                Basket ({basket.length})
              </Button>
            )}
          </Flex>

          {/* IS AUTH TRUE RETURN LOGIN CODES*/}

          {isAuthenticated ? null : (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={loginWithRedirect}
            >
              LOGIN
            </Button>
          )}

          {/* IS AUTH ADMIN CODES*/}

          {isAuthenticated && user.email === authAdmin ? (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => goAdmin()}
            >
              ADMIN PANEL
            </Button>
          ) : null}

          {/* THEME SWİTCH CODES*/}

          {isAuthenticated ? (
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                {/* USER CODES*/}

                {basket.length > 0 ? (
                  <Button
                    variant="solid"
                    border={"1px"}
                    onClick={() => goBasket()}
                  >
                    My Basket: {basket.length}
                  </Button>
                ) : null}

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.picture} />
                  </MenuButton>

                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={user.picture} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={() => goBasket()}>My Basket</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </>
  );
}
