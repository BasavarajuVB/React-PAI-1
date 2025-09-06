import './SortDropdown.css';

const SortDropdown = ({ sortOrder, onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="asc">Title A-Z</option>
        <option value="desc">Title Z-A</option>
      </select>
    </div>
  );
};

export default SortDropdown;
