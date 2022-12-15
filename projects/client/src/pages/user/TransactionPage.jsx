import { Box, Center, Button, StackDivider, VStack } from "@chakra-ui/react"
import {NavbarComp} from "../../components/user/NavbarComp"

export const TransactionPage = () => {
  return (
    <div>
      <Center>
        <Box>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display="flex"
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            position="fixed"
            zIndex="2"
          >
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              ORDERS
            </Box>
          </Box>
          <Box className="body" bgColor="white" h={"1750px"} w={"390px"} />
          <VStack
  mt={"250px"}
  divider={<StackDivider borderColor='gray.200' />}
  spacing={"10px"}
  align='stretch'
  >
  <Button textColor={"black"} h='40px'>
    My Address
  </Button>
  <Button ml={"10px"} textColor={"black"} h='40px' as="button" >
    Privacy and Policy
  </Button>
  <Button ml={"10px"} textColor={"black"} h='40px' as="button" >
    Help
  </Button>
  <Button ml={"10px"} textColor={"black"} h='40px' as="button" >
    Account Settings
  </Button>
  <Box margin={"auto"} alignItems={"center"} bgColor={"ButtonShadow"}>
  Versi Aplikasi - 2.5.0    
  </Box>
  </VStack>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
            
