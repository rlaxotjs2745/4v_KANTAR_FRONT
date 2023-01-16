import React from 'react';
import {Navigate} from 'react-router-dom';

const PublicRoute = ({ children }) => {
    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    return get_cookie('X-AUTH-TOKEN') !== null ? <Navigate to='/'/> : children;
};

export default PublicRoute;