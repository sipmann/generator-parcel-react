import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StaticRouter as Router } from 'react-router-dom';
import { render, waitForElement, fireEvent } from '@testing-library/react'

import App from './index';

describe('Tests for App component', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><App /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});