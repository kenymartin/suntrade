const Search = () => {
  return (
    <>
      <div className="custom-select">
        <select name="category" id="category">
          <option selected value="0">
            All
          </option>
          <option value="1">Metal</option>
          <option value="2">Fibber Glass</option>
          <option value="3">Customized</option>
        </select>
      </div>
      <div className="input-field">
        <input type="text" />
      </div>
    </>
  );
};

export default Search;
