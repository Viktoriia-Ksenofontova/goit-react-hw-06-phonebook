import { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/Contacts/ContactsList';
import Section from './Components/Section';
import Filter from './Components/Filter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Section title="Phonebook">
          <ContactForm />
        </Section>

        <Section title="Contacts">
          <Filter />
          <ContactList />
        </Section>
      </div>
    );
  }
}

export default App;
