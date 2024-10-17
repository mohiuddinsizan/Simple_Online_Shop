import { Container, Flex, HStack,Text,Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {PlusSquareIcon} from "@chakra-ui/icons"
import { color } from 'framer-motion'
import {IoMoon} from "react-icons/io5"
import {LuSun} from "react-icons/lu"
const Navbar = () => {
    const {colorMode,toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex h={16}  alignItems={"center"} justifyContent={"space-between"}
        flexDir={{base:"column",sm:"row"}}>
        <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize= {{base:"22",sm:"28"}}
        fontWeight='bold'
        >
        <Link to={"/"}>Product Store </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
                <Button>
                    <PlusSquareIcon />
                </Button>
            </Link>
            <Link to={"/"}>
                <Button onClick={toggleColorMode}>
                    {
                        colorMode ==="light" ? <IoMoon /> : <LuSun size="20" />
                    }
                </Button>
            </Link>
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
