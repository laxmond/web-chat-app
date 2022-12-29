import {
  Box,
  Flex,
  Button,
  Avatar,
  Stack,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/Navbar";
import FriendCard from "../components/FriendCard";
import { bindActionCreators } from "redux";
import { actionCreators } from "../hooks";
import { SunIcon } from "@chakra-ui/icons";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import MessageCard from "../components/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import OverlayChat from "../components/misc/OverlayChat";
import PorfileView from "../components/views/ProfileView";

import { io } from "socket.io-client";
// import { socket } from "../util/socket";
// import { socket } from "../util/socket";
// const socket = io("http://localhost:5000");
// socket.emit("login", "dani" + Math.random());

function Chat() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { SETCHAT, SETUSER } = bindActionCreators(actionCreators, dispatch);
  // const [socket, setSocket] = useState(null);
  const state = useSelector((state) => state.chat);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (!data) {
      toast({
        title: "Session expired!",
        description: "Login again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      sleep(2000);
      window.location.href = "./";
    } else {
      SETUSER(data);
    }
  }, []);

  async function sleep(milliseconds) {
    return await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const logOut = async () => {
    localStorage.clear();
    toast({
      title: "Logging out ...",
      description: "Logged out successfully!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    await sleep(2500);
    window.location.href = "./";
  };

  // useEffect(() => {
  //   const socket = io("http://localhost:5000");
  //   // socket.emit("login", "dani" + Math.random());
  //   // console.log("ok");
  // }, [true]);
  // useEffect(() => {
  //   socket.on("online", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5000");
  //   setSocket(newSocket);
  //   try {
  //     return socket.disconnect();
  //   } catch {
  //     return "ok";
  //   }
  // }, []);

  // useEffect(() => {
  //   socket.emit("logine", { value: "dani" + Math.random() });
  //   console.log("ok");
  // }, [socket]);
  return (
    <Flex m={"0"} p="0" flexDirection={"row"}>
      <Box maxW="fit-content" p="0" m="0">
        <Flex
          direction="column"
          w="300px"
          h="100vh"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            position="sticky"
            top={0}
            zIndex={199}
            p={4}
            h={"81px"}
            borderBottom="1px solid"
            bgColor={"#23272A"}
            borderRight={"1px solid #2D3748"}
          >
            {/* <Avatar
              cursor={"pointer"}
              onClick={() => {
                console.log("ok");
              }}
              src={
                "https://lh3.googleusercontent.com/a/AEdFTp7kiDrC2tOsV1S8_g-WJXQlmhRAFFZCYskUxGsYFA=s96-c"
              }
            /> */}
            <PorfileView username={userData.username} gmail={userData.gmail} />
            <Stack isInline>
              <IconButton
                size="sm"
                isRound
                _focus={{ boxShadow: "none" }}
                icon={<SunIcon />}
              />

              <IconButton
                icon={<Icon as={FiLogOut} />}
                _focus={{ boxShadow: "none" }}
                size="sm"
                onClick={logOut}
                isRound
              />
            </Stack>
          </Flex>
          <Flex
            direction="column"
            borderRight="1px solid"
            borderColor={"gray.700"}
            bg={"#1b1e20"}
            flex="1"
          >
            <Flex direction="column" p={4}>
              <Button
                _focus={{ boxShadow: "none" }}
                letterSpacing="wide"
                textTransform="uppercase"
                fontSize="md"
              >
                new chat
              </Button>
            </Flex>
            <Flex flexDir={"column"} flexGrow="1" gap="2px">
              {Array(50)
                .fill("Daniel")
                .map((v, i) => {
                  return (
                    <Box
                      key={i}
                      onClick={() => {
                        SETCHAT(v, i);
                      }}
                    >
                      {" "}
                      <FriendCard name={v} id={i} select={state.id} />
                    </Box>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        p="0"
        m="0"
        flexDir={"column"}
        bgColor={"#23272A"}
        height="100vh"
        flexGrow={"1"}
      >
        {state.id == -1 ? (
          <OverlayChat />
        ) : (
          <Box>
            <Navbar name="daniel" />
            <Box
              bgColor={"#23272A"}
              overflowY="scroll"
              height={"80vh"}
              mb={"4"}
              py={"2"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <Flex flexDirection={"column"} px={"2"} pt={"4"} pb={"1"}>
                {Array(50)
                  .fill("dani")
                  .map((val, i) => {
                    return (
                      <MessageCard
                        id={i}
                        name={val}
                        message={
                          "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                        }
                        time={"19-12-22 11:23PM"}
                        isUser={Math.random() < 0.5}
                      />
                    );
                  })}
              </Flex>
            </Box>
            <MessageBox />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default Chat;
