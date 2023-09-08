import { ImageListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <ImageListItem>
      <Image
        small={image.webformatURL}
        large={image.largeImageURL}
        alt={image.tags}
      />
    </ImageListItem>
  );
};
