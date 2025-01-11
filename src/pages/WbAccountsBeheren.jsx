import React, { useState } from 'react';
import { Button, FormControl, Table, InputGroup, Modal, Container } from 'react-bootstrap';
import '../style/wagenpark.css';
import WbNavbar from "../components/WbNavbar.jsx";

const WbAccountsBeheren = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, naam: 'John Doe', email: 'john@techcorp.com', isGoedgekeurd: false },
    { id: 2, naam: 'Jane Smith', email: 'jane@designltd.com', isGoedgekeurd: true },
    { id: 3, naam: 'Sarah Johnson', email: 'sarah@marketingco.com', isGoedgekeurd: false },
    // Voeg meer accounts toe
  ]);

  const [zoekterm, setZoekterm] = useState('');
  const [toonModal, setToonModal] = useState(false);
  const [teVerwerkenAccount, setTeVerwerkenAccount] = useState(null);
  const [actieType, setActieType] = useState('goedkeuren'); // 'goedkeuren', 'weigeren', of 'verwijderen'

  const gefilterdeAccounts = accounts.filter((account) =>
    account.naam.toLowerCase().includes(zoekterm.toLowerCase())
  );

  const goedkeurenAccount = (account) => {
    setAccounts(accounts.map(a =>
      a.id === account.id ? { ...a, isGoedgekeurd: true } : a
    ));
  };

  const weigerenAccount = (account) => {
    setAccounts(accounts.filter(a => a.id !== account.id));
  };

  const verwijderenAccount = (account) => {
    setAccounts(accounts.filter(a => a.id !== account.id));
  };

  const toonModalVoorActie = (account, type) => {
    setTeVerwerkenAccount(account);
    setActieType(type);
    setToonModal(true);
  };

  const sluitModal = () => {
    setToonModal(false);
    setTeVerwerkenAccount(null);
  };

  const voerActieUit = () => {
    if (actieType === 'goedkeuren') {
      goedkeurenAccount(teVerwerkenAccount);
    } else if (actieType === 'weigeren' || actieType === 'verwijderen') {
      weigerenAccount(teVerwerkenAccount); // 'weigeren' en 'verwijderen' hebben hetzelfde effect.
    }
    sluitModal();
  };

  return (
    <div className="achtergrond2">
      <WbNavbar />
      <Container fluid className="align-items-center w-75">
        <h1 className="pagina-titel text-center my-5">Zakelijke Huurders Beheren</h1>

        <div className="d-flex justify-content-center mb-3">
          <InputGroup>
            <FormControl
              placeholder="Zoek medewerkers"
              aria-label="Zoek medewerkers"
              value={zoekterm}
              onChange={(e) => setZoekterm(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="scrollable-table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Email</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {gefilterdeAccounts.length > 0 ? (
                gefilterdeAccounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.naam}</td>
                    <td>{account.email}</td>
                    <td>{account.isGoedgekeurd ? 'Goedgekeurd' : 'In afwachting'}</td>
                    <td>
                      {!account.isGoedgekeurd ? (
                        <>
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => toonModalVoorActie(account, 'goedkeuren')}
                          >
                            Goedkeuren
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => toonModalVoorActie(account, 'weigeren')}
                          >
                            Weigeren
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => toonModalVoorActie(account, 'verwijderen')}
                        >
                          Verwijderen
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <em>Geen medewerkers gevonden...</em>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>

      <Modal show={toonModal} onHide={sluitModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actieType === 'goedkeuren'
              ? 'Gebruiker Goedkeuren'
              : actieType === 'verwijderen'
              ? 'Gebruiker Verwijderen'
              : 'Gebruiker Weigeren'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actieType === 'goedkeuren'
            ? `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt goedkeuren?`
            : actieType === 'verwijderen'
            ? `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt verwijderen? Dit kan niet ongedaan gemaakt worden.`
            : `Ben je zeker dat je ${teVerwerkenAccount?.naam} wilt weigeren? Dit kan niet ongedaan gemaakt worden.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={sluitModal}>
            Annuleren
          </Button>
          <Button
            variant={actieType === 'goedkeuren' ? 'success' : 'danger'}
            onClick={voerActieUit}
          >
            {actieType === 'goedkeuren' ? 'Goedkeuren' : 'Verwijderen'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WbAccountsBeheren;
