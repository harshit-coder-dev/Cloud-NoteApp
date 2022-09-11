import React from 'react'

import Notes from './Notes';
import PropTypes from "prop-types";



export default function Home(props) {
  let { showAlert } = props
  return (
    <div>

      <Notes showAlert={showAlert} />
    </div>
  )
}

Home.propTypes = {
  showAlert: PropTypes.func.isRequired,
};
