import React from 'react'
import PropTypes from "prop-types";

const Alert = (props) => {

    return (
        <div style={{ height: "50px" }}>
            {props.alert && <div
                className={`alert alert-${props.alert.type} alert-dismissible fade show`}
                role="alert">
                <strong>{props.alert.type}</strong>: {props.alert.msz}
            </div>}
        </div>
    )
}

Alert.propTypes = {
    alert: PropTypes.object
};
export default Alert
