import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {

    function deleteContactHandler = 
    // here is whewr you have stopped
    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard key={contact.id} contact={contact}></ContactCard>
    });

    return <div className="ui celled list">{renderContactList}</div>;
};

export default ContactList;
