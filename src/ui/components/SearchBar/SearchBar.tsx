export interface SearchBarInfoProps {
  textToFilter: string;
  setTextToFilter: (text: string) => void;
  formatedFilter: string;
}

export const SearchBar: React.FC<SearchBarInfoProps> = ({
  textToFilter,
  formatedFilter,
  setTextToFilter,
}) => {
  return (
    <form>
      <label htmlFor="busqueda">
        ¿Qué quieres buscar hoy?
        <input
          id="busqueda"
          placeholder="¿Qué quieres buscar hoy?"
          value={textToFilter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTextToFilter(event.currentTarget.value);
          }}
        />
      </label>
      {formatedFilter.length !== 0 && formatedFilter.length <= 3 && (
        <p>
          Hacen falta 3 carácteres diferentes al espacio para iniciar la
          búsqueda... 😉
        </p>
      )}
    </form>
  );
};
