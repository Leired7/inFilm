export const SearchBar = (props: any) => {
  return (
    <form>
      <label htmlFor="busqueda">
        ¿Qué quieres buscar hoy?
        <input
          id="busqueda"
          placeholder="¿Qué quieres buscar hoy?"
          value={props.filter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setTextToFilter(event.currentTarget.value);
          }}
        />
      </label>
      {props.textToFilter.length > 0 && props.textToFilter.length < 3 && (
        <p>Hacen falta 3 carácteres para iniciar la búsqueda... 😉</p>
      )}
    </form>
  );
};
