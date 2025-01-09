import BoxOffer from "./BoxOffer";

interface Props {
    sums: number[];
    openedPhotos: number[];
  }

const LeftRightBoxes = ({sums, openedPhotos} : Props) => {
  return (
    <div>
        { sums.map((sum) => <BoxOffer sum={sum} openedPhotos={openedPhotos} key={sum}/>) }
    </div>
  )
}

export default LeftRightBoxes
