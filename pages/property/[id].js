import { Box, Flex,Spacer, Text, Avatar} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import {BsGridFill} from 'react-icons/bs';
import millify from 'millify';
import { GoVerified } from 'react-icons/go';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({propertyDetails:{price,rentFrequency,rooms,title,baths,area,agency, isVerified,description, type, purpose, furnishingStatus,amenities,photos}}) => {
    return(
        <Box maxWidth="1000px" margin="auto" p="4">
            {photos && <ImageScrollbar data={photos} />}
            <Box w="full" p="4">
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green">
                            {isVerified && <GoVerified />}
                        </Box>
                        <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                    </Flex>
                    <Box>
                        <Avatar size="sm" src={agency?.logo?.url} title={agency?.name}/>
                    </Box>
                </Flex>
                <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Text fontSize="md" title={title} fontWeight="bold">
                    {title.length > 30 ? `${title.substring(0,180)}...`:title}
                </Text>
                <Text lineHeight="2" color="grey.400">
                    {description}
                </Text>
                <Flex justifyContent="space-between" width="400px" marginTop="25px">
                    <Text>Type:</Text>
                    <Text fontWeight="bold">{type}</Text>
                    <Text>Purpose:</Text>
                    <Text fontWeight="bold">{purpose}</Text>
                </Flex>
                {
                    furnishingStatus && (
                    <Flex justifyContent="space-between" width="400px" marginTop="15px" >
                    <Text>Furnishing Status:</Text>
                    <Text fontWeight="bold">{furnishingStatus}</Text>
                    <Text>Purpose:</Text>
                    {/* <Text fontWeight="bold">{amenities}</Text> */}
                </Flex>
                    )
                }
                <Box>
                    {amenities.length && <Text fontSize="2xl" fontWeight="bold">Amenities
                        <Flex flexWrap="wrap">
                            {amenities.map((item)=>(
                                item.amenities.map((amenity)=>(
                                    <Text 
                                        key={amenity.text} 
                                        lineHeight="2" 
                                        fontSize="14" 
                                        fontWeight="400" 
                                        color="blue.400"
                                        p="1"
                                        bg="gray.200"
                                        borderRadius="5px"
                                        marginRight="5px"
                                        marginTop="10px"
                                        
                                        >{amenity.text}</Text>
                                ))
                            ))}
                            </Flex>    
                    </Text>}
                </Box>
                
            </Box>
        </Box>
    )
}

export default PropertyDetails;

export async function getServerSideProps({params:{id}}){
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
    console.log(data)
    return {
        props:{
            propertyDetails: data
        }
    }
}