import {useState} from 'react';
import {useRouter} from 'next/router'
import {Flex, Box, Text, Icon} from '@chakra-ui/react'
import Image from 'next/image';
import noResults from '../assets/images/noresult.svg'
import  { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property'
import { baseUrl, fetchApi } from '../utils/fetchApi';

const Search = ({properties}) => {
    
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter();
    // const query = router.query;

    return (
        <Box>
            <Flex
                backgroundColor="lightgrey"
                cursor="pointer"
                borderBottom="1px"
                borderColor="grey.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={()=>setSearchFilter((prevFilters) => !prevFilters)}
            >
                <Text>Search Property by Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>
            {searchFilter && <SearchFilters />}
            <Text fontSize="2xl" margin="5" fontWeight="bold">
                Properties {router.query.purpose} ({properties.length})
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property)=><Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex alignItems="center" justifyContent="center" marginTop="5" flexDirection="column" marginBottom="5">
                    <Image src={noResults} alt="no results image" />
                    <Text fontSize="2xl">No Results Found</Text>
                </Flex>
            )}
        </Box>
    )    
}

export default Search;

export async function getServerSideProps({query}) {
    
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalIDs = query.categoryExternalIDs || '4';
    
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalIDs}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`)

    return {
      props:{
        properties:data?.hits,
      }
    }
  }
  