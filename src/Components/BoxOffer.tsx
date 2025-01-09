import { Box } from '@chakra-ui/react'

interface Props {
  sum: number;
  openedPhotos: number[];
}

const BoxOffer = ({sum, openedPhotos} : Props) => {
  return (
    <Box
      borderRadius="md"
      bg={openedPhotos.includes(sum) ? "yellow.50" : "yellow.300"}
      color="black"
      px={4}
      h={10}
      margin={2}
      textAlign="center"
    >
      $ {sum}
    </Box>
  )
}

export default BoxOffer
