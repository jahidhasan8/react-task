import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const Problem2 = () => {
    
    const [allContacts, setAllContacts] = useState([]);
    const[displayContacts, setDisplayContacts]=useState([]);
    const [modal, setModal] = useState('');
    const [display, setDisplay] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [contacts, setContacts] = useState({});
    
    const handleCloseDetail= () => setDisplayDetail(false);
    const handleDisplayDetail= () => setDisplayDetail(true);

    const handleClose = () => {
        setModal('');
        setDisplay(false);
    };

    const handleDisplay = () => setDisplay(true);

    useEffect(() => {
        const url = 'https://contact.mediusware.com/api/contacts/';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllContacts(data.results)
                console.log(data.results);
            })

    }, [])

    const displayAllContacts = () => {
        setDisplayContacts(allContacts);
        setModal('All Contacts');
        handleDisplay();
    }

    const displayUSContacts = () => {
        const usContacts = allContacts.filter(contact => contact.country.name === 'United States');
        setDisplayContacts(usContacts);
        setModal('US Contacts');
        handleDisplay();
    }

    const contactInfo = (id) => {

        const contactDetails = allContacts.find(contact => contact.id === id);
        setContacts(contactDetails);
        handleDisplayDetail();
    };
    
    const handleChange = (e) => {
        if (e.target.checked) {
            const evenContacts = displayContacts.filter(contact => contact.id % 2 === 0);
            setDisplayContacts(evenContacts);
        }
        else {
            if (modal === 'US Contacts') {
                const usContacts = allContacts.filter(contact => contact.country.name === 'United States');
                setDisplayContacts(usContacts);
            }
            else {

                setDisplayContacts(allContacts);
            }
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button" onClick={displayAllContacts} >All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" onClick={displayUSContacts} >US Contacts</button>
                </div>
                
            </div>

{
    displayContacts.length > 0 &&
    <Modal show={display} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title >{modal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                displayContacts.map(contact => <div key={contact.id} className='d-flex cursor-pointer' onClick={() => contactInfo(contact.id)}>
                    <p className='me-3'>{contact.id}.</p>
                    <p className='me-5'>{contact.phone}</p>
                    <p>{contact?.country?.name}</p>
                </div>
                )

            }
        </Modal.Body>
        <Modal.Footer className='flex justify-content-between align-items-center'>
            <Form>
                {['checkbox',].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label='Only Even'
                            onChange={e => handleChange(e)}
                        />

                    </div>
                ))}
            </Form>
            <Button style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }} onClick={displayAllContacts}>
                All Contacts
            </Button>
            <Button style={{ backgroundColor: '#ff7f50', border: '1px solid #ff7f50' }} onClick={displayUSContacts}>
                US Contacts
            </Button>
            <Button style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }} onClick={handleClose}>
                Close
            </Button>

        </Modal.Footer>
    </Modal>
}

{
    displayDetail &&

    <Modal show={displayDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='me-3'>ID: {contacts.id}</p>
            <p className='me-3'>Phone: {contacts.phone}</p>
            <p className='me-3'>Country: {contacts?.country?.name}</p>
        </Modal.Body>
        <Modal.Footer className='flex justify-content-between align-items-center'>
            <Button variant="secondary" onClick={handleCloseDetail}>
                Close
            </Button>

        </Modal.Footer>
    </Modal>
}

</div>
    );
};

export default Problem2;