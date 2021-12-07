import {Box,Text,Flex,Icon} from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

const LeftArrow = () => {
    const {scrollPrev} = useContext(VisibilityContext);
    return (
        <Flex justifyContent="center" alignItems="center">
            <Icon 
                as={FaArrowAltCircleLeft} 
                onClick={()=>scrollPrev()}
                fontSize="2xl"
                cursor="pointer"
            />
        </Flex>
    )
}
const RightArrow = () => {
    const {scrollNext} = useContext(VisibilityContext);
    return (
        <Flex justifyContent="center" alignItems="center">
            <Icon 
                as={FaArrowAltCircleRight} 
                onClick={()=>scrollNext()}
                fontSize="2xl"
                cursor="pointer"
            />
        </Flex>
    )
}

const ImageScrollbar = ({data}) => (
        <ScrollMenu
        LeftArrow={LeftArrow} RightArrow={RightArrow}
        style={{overflow:'hidden'}}
        >
            {
                data.map((item)=>(
                    <Box key={item.id} width="910px" itemId={item.id} overflow="hidden" p="1">
                        <Image 
                            src={item.url}
                            placeholder="blur" 
                            blurDataURL={item.url} 
                            width={1000}
                            height={500}
                            alt="property"
                            sizes=''
                            />
                    </Box>
                ))
            }
        </ScrollMenu>
)

export default ImageScrollbar