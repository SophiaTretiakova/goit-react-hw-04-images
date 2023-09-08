import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageList>
      {images.length > 0 &&
        images.map(image => {
          return <ImageGalleryItem key={nanoid()} image={image} />;
        })}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      searchQuery: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
