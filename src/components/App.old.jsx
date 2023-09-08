import { fetchImagesWithQuery } from 'api';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { GlobalStyles } from './GlobalStyles.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  // state = {
  //   images: [],
  //   isLoading: false,
  //   page: 1,
  //   query: '',
  //   error: false,
  //   hasMoreImages: false,
  // };

  // handelSubmit = evt => {
  //   evt.preventDefault();
  //   this.setState({
  //     query: `${Date.now()}/${evt.target.elements.query.value}`,
  //     images: [],
  //     page: 1,
  //     hasMoreImages: false,
  //   });
  // };

  // handleLoadMore = () => {
  //   this.setState(prevState => {
  //     return {
  //       page: prevState.page + 1,
  //     };
  //   });
  // };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          isLoading: true,
          error: false,
          hasMoreImages: false,
        });

        const { images, totalHits } = await fetchImagesWithQuery(
          this.state.query.split('/')[1],
          this.state.page
        );

        if (!images.length) {
          this.setState({
            hasMoreImages: false,
            isLoading: false,
          });
          toast('There is no images for query like that.');
          return;
        }
        this.setState({
          images: [...this.state.images, ...images],
          hasMoreImages: this.state.page * 12 < totalHits ? true : false,
        });
      } catch (error) {
        toast('Oops there is an error ocurred! Try to reload the page.');
        this.setState({
          error: true,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handelSubmit} />
        {!this.state.error && (
          <>
            <ImageGallery
              images={images}
              handleLoadMore={this.handleLoadMore}
            />
            {this.state.hasMoreImages && (
              <Button onClick={this.handleLoadMore}></Button>
            )}
          </>
        )}
        <Loader isLoading={this.state.isLoading} />
        <GlobalStyles />
        <ToastContainer />
      </>
    );
  }
}
