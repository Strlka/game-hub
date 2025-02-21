import { Box, Button, Image  } from "@chakra-ui/react";

interface Props {
    showPhoto: number | null;
    onImgClose: () => void;
}


const BoxWithImage = ({showPhoto, onImgClose }: Props) => {

  const src=`src/assets/Photo_game/${showPhoto}.jpeg`;

  return (
    <Box id="prize"
        position="fixed"
        top="50%" // Центрирование по вертикали
        left="50%" // Центрирование по горизонтали
        transform="translate(-50%, -50%)" // Смещение для точного центрирования
        borderRadius="6px"
        shadow="lg"
        bg="gray.50"
    > 
        <Image
        src={src}
        objectFit="contain"
        maxW="95vw" 
        maxH="95vh" 
        /> 
        <Button 
        w="40px" 
        h="40px" 
        bg="yellow.300" 
        position="absolute"
        top="2%"
        left="90%" 
        onClick={onImgClose}>
            X
        </Button>
    </Box>
  )
}

export default BoxWithImage
