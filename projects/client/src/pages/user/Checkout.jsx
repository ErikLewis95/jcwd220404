import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/addressSlice";
import { DefaultAddress } from "../../components/DefaultAddress";
import { CartComp } from "../../components/user/CartComp";

export const Checkout = () => {
  const [value, setValue] = useState("0");
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  // const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const toPayment = () => {
    navigate("/checkout/payment/success");
  };

  return (
    <div>
      <Box>
        <Center>
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
            <Box as={Link} to={"/cart"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                CHECKOUT
              </Text>
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"100%"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel>Shipping Method</FormLabel>
              <Select>
                <option>Select Shipping Method</option>
                <option>
                  <Box border={"2px"}>
                    <Text>Regular ETA: 2-days</Text>
                  </Box>
                </option>
                <option>
                  <Box border={"2px"}>
                    <Text>One-Day Service ETA: 1-day</Text>
                  </Box>
                </option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Option</FormLabel>
              <Box variant={"unstyled"}>
                <Checkbox value="1">
                  <Text>Bank Transfer via Only Fresh Account</Text>
                </Checkbox>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel>Order Detail</FormLabel>
              {product?.map((item) => {
                return (
                  <Card margin={"10px"}>
                    <Flex mb={"50px"} justify={"space-between"}>
                      <Grid
                        templateAreas={`"nav main""nav footer"`}
                        gridTemplateRows={"50px 1fr 30px"}
                        gridTemplateColumns={"120px 1fr"}
                        h="50px"
                        gap="1"
                        color="blackAlpha.700"
                        fontWeight="bold"
                      >
                        <GridItem pl="1" area={"nav"}>
                          <Image
                            boxSize={"50px"}
                            src={
                              `${process.env.REACT_APP_API_BASE_URL}/` +
                              item.Product.picture
                            }
                          ></Image>
                        </GridItem>
                        <GridItem fontSize={"small"} pl="1" area={"main"}>
                          {item.Product?.productName}
                        </GridItem>
                        <GridItem fontSize={"small"} pl="1" area={"footer"}>
                          {item.Product.Price.productPrice}
                        </GridItem>
                      </Grid>
                      <Text>{item.Product.weight}</Text>
                      <Text>{item.qty}</Text>
                    </Flex>
                  </Card>
                );
              })}
            </FormControl>

            <FormControl>
              <FormLabel>Voucher</FormLabel>
              <Button w={"100%"}>Apply Voucher</Button>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Detail</FormLabel>
              <Flex justify={"space-between"}>
                <Box>
                  <Text>Subtotal Produk</Text>
                  <Text>Voucher</Text>
                </Box>
                {/* {product?.map((item) => {
                  return (
                    <> */}
                <Box>
                  <Text>{product?.Product?.Price?.productPrice}</Text>
                  <Text>xx.xxx</Text>
                </Box>
                {/* </>
                  );
                })} */}
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Subtotal</FormLabel>
              <Flex justify={"space-between"}>
                <Text>Total Weight</Text>
                <Text>{product?.Product?.weight}</Text>
              </Flex>
              <Flex justify={"space-between"}>
                <Text>Delivery Charge</Text>
                <Text>xx.xxx</Text>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"}>Total</Text>
              <Text as={"b"}>xx.xxx</Text>
            </Flex>
            <Button onClick={toPayment} w={"100%"}>
              Proceed Payment
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
