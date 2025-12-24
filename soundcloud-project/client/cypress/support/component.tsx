// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import React from 'react';
import { mount} from "cypress/react";
import "./../../src/main/index.css"
import { Provider } from 'react-redux';
import { storeApp } from '../../src/redux/storages/store';
import {store} from "../../src/redux/storages/store";
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: { reduxStore?: storeApp}
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  const { reduxStore = store, ...mountOptions } = options;

  const wrapped = (
    <Provider store={reduxStore}>
      {component}
    </Provider>
  );

    mount(wrapped, mountOptions);
  // return cy.wrap(null)
}); 

// Example use:
// cy.mount(<MyComponent />)