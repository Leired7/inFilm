import { SearchBar } from '../SearchBar';

import { SearchBarInfoProps } from '../SearchBar';

import Logo from '../../../assets/inFilm_logo.png';

export const Navigation: React.FC<SearchBarInfoProps> = ({
  textToFilter,
  formatedFilter,
  setTextToFilter,
}) => {
  return (
    <nav>
      <img src={Logo} alt="Logo de inFilm" />
      <SearchBar
        textToFilter={textToFilter}
        formatedFilter={formatedFilter}
        setTextToFilter={setTextToFilter}
      />
    </nav>
  );
};
