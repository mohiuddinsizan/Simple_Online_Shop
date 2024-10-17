import React from 'react'
import { Box,Heading,HStack,IconButton,Image,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Text, useColorMode, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useProductStore } from '../Store/product';
const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");
    const {deleteProducts} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteProduct = async (pid) =>{
        const {success,message} = await deleteProducts(pid)
        if(!success){
            toast({
              title : "Error",
              description : message,
              status :"error",
              isClosable:true
            })
          }
          else{
            toast({
              title : "Success",
              description : message,
              status :"success",
              isClosable:true
            })
          }
    }

  return (
    <Box
    shadow ="lg"
    rounded="lg"
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)",shadow:"xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit='cover' />
        <Box p={4}>
            <Heading as='h3' size ='md' mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon/>} onClick={()=>handleDeleteProduct(product._id) }  colorScheme='red'/>
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                        placeholder='Product Name'
                        name='name'
                        // value={updatedProduct.name}
                        // onChange={(e) => setUpdatedProduct({...updatedProduct,name: e.target.value})}
                        />
                        <Input 
                        placeholder='Price'
                        name='price'
                        // value={updatedProduct.price}
                        // onChange={(e) => setUpdatedProduct({...updatedProduct,price: e.target.value})}
                        />
                        <Input 
                        placeholder='Image URL'
                        name='image'
                        // value={updatedProduct.image}
                        // onChange={(e) => setUpdatedProduct({...updatedProduct,image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>
            </ModalContent>    
        </Modal>
    </Box>
  )
}

export default ProductCard
