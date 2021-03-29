import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { items, formSubmitHandler } = this.props;

    if (items.find(item => item.name === name)) {
      return toast.info(`${name} is already in contacts.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (name === '' || number === '') {
      return toast.warn(`All fields must be filled.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    formSubmitHandler(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={this.nameInputId} className={styles.formLabel}>
          Name
          <input
            className={styles.formInput}
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            id={this.nameInputId}
          />
        </label>

        <label htmlFor={this.numberInputId} className={styles.formLabel}>
          Number
          <input
            className={styles.formInput}
            type="tel"
            placeholder="Enter telephone number"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            id={this.numberInputId}
          />
        </label>
        <button type="submit" className={styles.formBtn}>
          Add contact
        </button>
        <ToastContainer />
      </form>
    );
  }
}

ContactForm.defaultProps = {
  items: [],
};

ContactForm.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape),
  formSubmitHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  formSubmitHandler: data => dispatch(contactsActions.addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
