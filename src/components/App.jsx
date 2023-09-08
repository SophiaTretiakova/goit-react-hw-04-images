import { fetchImagesWithQuery } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { GlobalStyles } from './GlobalStyles.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(false);

  const handelSubmit = evt => {
    evt.preventDefault();
    setQuery(`${Date.now()}/${evt.target.elements.query.value}`);
    setImages([]);
    setPage(1);
    setHasMoreImages(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    async function processingUpdate() {
      try {
        setIsLoading(true);
        setError(false);
        setHasMoreImages(false);

        if (query) {
          const { newImages, totalHits } = await fetchImagesWithQuery(
            query.split('/')[1],
            page
          );

          if (!newImages.length) {
            setIsLoading(false);
            setHasMoreImages(false);
            toast('There are no images for this query.');
            return;
          }

          setImages(prevImages => [...prevImages, ...newImages]);
          setHasMoreImages(page * 12 < totalHits);
        }
      } catch (error) {
        toast('Oops, an error occurred! Try to reload the page.');
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (page !== undefined) {
      processingUpdate();
    }
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={handelSubmit} />
      {!error && (
        <>
          <ImageGallery images={images} handleLoadMore={handleLoadMore} />
          {hasMoreImages && !isLoading && (
            <Button onClick={handleLoadMore}></Button>
          )}
        </>
      )}
      <Loader isLoading={isLoading} />
      <GlobalStyles />
      <ToastContainer />
    </>
  );
};
