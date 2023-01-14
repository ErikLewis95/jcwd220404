import { Box, Center, VStack } from "@chakra-ui/react";
import { LogoComp } from "../../components/user/LogoComp";
import { NotificationComp } from "../../components/user/NotificationComp";
import { SearchComp } from "../../components/user/SearchComp";
import { NavbarComp } from "../../components/user/NavbarComp";
import { CarouselComp } from "../../components/user/CarouselComp";
import { MenuComp } from "../../components/user/MenuComp";
import { DefaultAddress } from "../../components/DefaultAddress";

export const LandingPage = () => {
  return (
    <>
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
            <LogoComp />
            <SearchComp />
            <NotificationComp />
          </Box>
          <DefaultAddress />
          <Box className="body" bgColor="white" h={"1750px"} w={"390px"}>
            <VStack>
              <CarouselComp />
              <MenuComp />
            </VStack>
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};
