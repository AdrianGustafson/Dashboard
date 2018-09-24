import React from 'react';

import RedirectButton from '../utils/RedirectButton';

const PublicComponent = () => {
    return (
        <main className="main-public">
          <h1>Välkommen till bokningssystemet!</h1>
          <p>Du är inte inloggad...</p>
          <RedirectButton
            to="/login"
            css="btn btn-lg btn-primary">
              Klicka här för att logga in!
          </RedirectButton>
        </main>
      )
}
export default PublicComponent;