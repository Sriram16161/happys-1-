import React, { useEffect } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useDebounce } from '../../hooks/useDebounce';
import { StyledSearchInputContainer, StyledInput, StyledClearIconContainer, StyledSearchIcon } from './styles';
import { DotsLoader } from '../DotsLoader/DotsLoader';

type SearchTextBoxProps = {
  searchText: string;
  placeholder: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  debounceTime?: number;
  onChange(searchText: string): void;
  onClear?(clearedString: string): void;
};

const SearchTextBox = (props: SearchTextBoxProps) => {
  const {
    searchText,
    placeholder,
    isDisabled = false,
    isLoading = false,
    debounceTime = 600,
    onChange,
    onClear,
  } = props;
  const [currentValue, setCurrentValue] = React.useState(searchText);

  const debouncedOnChange = useDebounce(onChange, debounceTime);

  const debouncedChangeHandler = React.useMemo(() => {
    if (debounceTime === 0) {
      return onChange;
    }

    return debouncedOnChange;
  }, [onChange]);

  const handleClearSearch = () => {
    if (typeof onClear === 'function') {
      onClear(currentValue);
    }

    onChange('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (value !== currentValue) {
      setCurrentValue(value);
      debouncedChangeHandler(value);
    }
  };

  useEffect(() => {
    if (searchText !== currentValue) {
      setCurrentValue(searchText);
    }
  }, [searchText]);

  return (
    <StyledSearchInputContainer className={props.className}>
      <StyledSearchIcon iconName="search" size="sm" />
      <StyledInput
        type="text"
        isDisabled={isDisabled}
        value={currentValue}
        disabled={isDisabled}
        onChange={handleChange}
        placeholder={placeholder}
        data-automation="results-search-field"
      />
      {isLoading && currentValue.length !== 0 && <DotsLoader />}
      {!isLoading && currentValue.length > 0 && (
        <StyledClearIconContainer onClick={handleClearSearch}>
          <SWReactIcons iconName="clear" size="xs" />
        </StyledClearIconContainer>
      )}
    </StyledSearchInputContainer>
  );
};

export default SearchTextBox;
