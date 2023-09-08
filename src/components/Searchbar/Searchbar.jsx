import {
  SearchbarHead,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarHead>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHead>
  );
};

Searchbar.propTypes = {
  onClick: PropTypes.func,
};
