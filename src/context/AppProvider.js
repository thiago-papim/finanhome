/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [selectHeader, setSelectHeader] = useState('home');

  const values = useMemo(
    () => ({
      selectHeader,
    }),
    [selectHeader],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
