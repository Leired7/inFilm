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
            props.setFilter(event.currentTarget.value);
          }}
        />
      </label>
      {props.filter.length > 0 && props.filter.length < 3 && (
        <p>Hacen falta 3 carácteres para iniciar la búsqueda... ;-)</p>
      )}
    </form>
  );
};
