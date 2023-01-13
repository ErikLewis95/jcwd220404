import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
 
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {  useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/addressSlice";

export const ListAddressPage = () => {
  // const [data, setData] = useState([]);
  const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/addressById/${id}`
      );
      console.log(result.data);
      // setData(result.data);
      dispatch(syncData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/address/remove/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const toAddAddress = () => {
    navigate(`/account/address/addAddress/${id}`);
  };

  const toUpdate = (addressId) => {
    navigate(`/account/address/updateAddress/${addressId}`);
  };

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={"/account"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"baseline"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
             Account
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            pt="10" 
          >
            {data?.map((item) => {
              return (
                <Box
                  border={"2px"} borderColor={"black"}
            p="4" m="4" 
                >
                  <Flex justifyContent={"space-between"}>
                    <Text color={"#285430"}>{item.receiverName}</Text>
                    <Text color={"#285430"}>{item.receiverPhone}</Text>
                    <Menu theme={({ direction : "rtl" })} width="50px">
                      <MenuButton
                        color={"#285430"}
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="ghost" 
                      />
                        
                      <MenuList bgColor="#E5D9B6" >
                        <MenuItem
                          as={"button"}
                          onClick={() => toUpdate(item.id)}
                          icon={<EditIcon />}
                          bgColor="#E5D9B6"
                          textColor={"#285430"}
                          
                        >
                          Edit Address
                        </MenuItem>
                        <MenuItem
                          as={"button"}
                          onClick={() => onDelete(item.id)}
                          icon={<DeleteIcon />}
                          bgColor="#E5D9B6"
                          textColor={"#285430"}
                          
                        >
                          Delete Address
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Text color={"#285430"}>{item.addressLine}</Text>
                  <Flex>
                    <Text color={"#285430"}>{item.district},</Text>
                    <Text color={"#285430"}>{item.city},</Text>
                    <Text color={"#285430"}>{item.province}</Text>
                  </Flex>
                  <Text color={"#285430"}>{item.detail}</Text>
                  <Text color={"#285430"}>Alamat Utama?</Text>
                </Box>
              );
            })}{" "}
            <Center>
              <Button mt="8"
                onClick={toAddAddress}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                width={"160px"}
                justifyContent="baseline"
              >
                Tambah Alamat
              </Button>
            </Center>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
