export const SearchBar = (props: any) => {
  return (
    <form>
      <label htmlFor="busqueda">
        ¿Qué quieres buscar hoy?
        <input
          id="busqueda"
          placeholder="¿Qué quieres buscar hoy?"
          value={props.textToFilter}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.setTextToFilter(event.currentTarget.value);
          }}
        />
      </label>
      {props.textToFilter.length > 0 && props.textToFilter.length < 3 && (
        <p>Te faltan 2 carácteres para iniciar la búsqueda... 😉</p>
      )}
      {props.formatedFilter.length < 3 && (
        <p>
          Hacen falta 3 carácteres diferentes al espacio para iniciar la
          búsqueda... 😉
        </p>
      )}
    </form>
  );
};
