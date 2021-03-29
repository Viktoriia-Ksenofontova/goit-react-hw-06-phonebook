import { v4 as uuidv4 } from 'uuid';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';

const searchInputId = uuidv4();
const Filter = ({ value, onChange }) => (
  <>
    <label htmlFor={searchInputId} className={styles.filterLabel}>
      Find contacts by name
      <input
        className={styles.filterInput}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
        id={searchInputId}
      />
    </label>
  </>
);

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.contacts.filter,
});
const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
