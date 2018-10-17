import React from 'react';

import RedirectButton from '../utils/RedirectButton';

const PublicComponent = () => {
    return (
        <div className="page-container">
          <div className="flex-row centered">
            <div className="small-12 large-8">

              <div className="widget">
                <div className="widget__header">
                  <h1>Välkommen till bokningssystemet!</h1>
                </div>

                <div className="widget__content text-center">
                  <p>Du är inte inloggad...</p>
                  <RedirectButton
                    to="/login"
                    css="btn btn-lg btn-primary">
                      Klicka här för att logga in!
                  </RedirectButton>
                </div>
              </div>

            </div>
          </div>
        </div>
      )
}
export default PublicComponent;
