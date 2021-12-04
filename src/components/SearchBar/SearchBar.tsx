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
      {props.formatedFilter.length !== 0 &&
        props.formatedFilter.length <= 3 && (
          <p>
            Hacen falta 3 carácteres diferentes al espacio para iniciar la
            búsqueda... 😉
          </p>
        )}
    </form>
  );
};
