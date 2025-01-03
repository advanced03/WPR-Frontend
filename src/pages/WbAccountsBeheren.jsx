import React, { useState } from 'react';
import { Button, Form, Table, InputGroup, FormControl, Modal } from 'react-bootstrap';
import '../style/wagenpark.css';

const WbAccountsBeheren = () => {
  // Voorbeeld data met 20 zakelijke huurders
  const [accounts, setAccounts] = useState([
    { id: 1, naam: 'John Doe', email: 'john@techcorp.com' },
    { id: 2, naam: 'Jane Smith', email: 'jane@designltd.com' },
    { id: 3, naam: 'Sarah Johnson', email: 'sarah@marketingco.com' },
    { id: 4, naam: 'Michael Brown', email: 'michael@financegroup.com' },
    { id: 5, naam: 'Emily Davis', email: 'emily@creativeagency.com' },
    { id: 6, naam: 'David Wilson', email: 'david@constructionllc.com' },
    { id: 7, naam: 'Jessica Taylor', email: 'jessica@itsolutions.com' },
    { id: 8, naam: 'Daniel Anderson', email: 'daniel@techinnovators.com' },
    { id: 9, naam: 'Olivia Martinez', email: 'olivia@globalenterprises.com' },
    { id: 10, naam: 'William Thomas', email: 'william@ecoindustries.com' },
    { id: 11, naam: 'Sophia Jackson', email: 'sophia@digitalworld.com' },
    { id: 12, naam: 'James White', email: 'james@consultingfirm.com' },
    { id: 13, naam: 'Charlotte Harris', email: 'charlotte@creativesolutions.com' },
    { id: 14, naam: 'Benjamin Martin', email: 'benjamin@retailco.com' },
    { id: 15, naam: 'Amelia Lee', email: 'amelia@techinnovations.com' },
    { id: 16, naam: 'Lucas Clark', email: 'lucas@futureenterprises.com' },
    { id: 17, naam: 'Mia Walker', email: 'mia@designstudio.com' },
    { id: 18, naam: 'Ethan Perez', email: 'ethan@marketingpros.com' },
    { id: 19, naam: 'Ava Young', email: 'ava@businessconsulting.com' },
    { id: 20, naam: 'Alexander Hall', email: 'alexander@creativeminds.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  // Filter de accounts op basis van de zoekterm
  const filteredAccounts = accounts.filter((account) =>
    account.naam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Functie om de account te verwijderen
  const handleDelete = () => {
    setAccounts(accounts.filter(account => account.id !== accountToDelete.id));
    setShowModal(false);
  };

  const handleShowModal = (account) => {
    setAccountToDelete(account);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAccountToDelete(null);
  };

  return (
    <div className="achtergrond2 d-flex justify-content-center">
      <div className="w-75">
        {/* Titel buiten de Tabel */}
        <h1 className="pagina-titel text-center my-5">Zakelijke Huurders Beheren</h1>

        {/* Zoekbalk buiten de Tabel */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Zoek medewerkers"
            aria-label="Zoek medewerkers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {/* Tabel met de lijst van accounts */}
        <div className="scrollen">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Email</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.naam}</td>
                    <td>{account.email}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleShowModal(account)}>
                        Verwijderen
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <em>Geen medewerkers gevonden...</em>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal voor bevestiging */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Weet je het zeker?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ben je zeker dat je {accountToDelete?.naam} wilt verwijderen? Dit kan niet ongedaan gemaakt worden.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuleren
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Verwijderen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WbAccountsBeheren;
