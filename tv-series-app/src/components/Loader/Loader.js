import React from 'react';

// get source binary of the loader.gif
import loaderSrc from '../../assets/loader.gif';

// noinspection JSUnusedLocalSymbols
const Loader = props => (
    <div><img
        style={
            {
                width: 375
            }
        }
        alt="http://via.placeholder.com/350x150"
        src={loaderSrc}/></div>
);

export default Loader;