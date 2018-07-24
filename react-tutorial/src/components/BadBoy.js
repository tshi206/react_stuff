import React from 'react';
import PropTypes from 'prop-types';

// noinspection JSUnusedLocalSymbols
const BadBoy = ( { parent, word, onClick, fword, sword } ) => (
    <div className="bad-boy">
        <h2>Please enjoy the poem: 《Bad Boy》</h2>
        <h2>Author: Ricky Redneck Jr</h2>
        <h3><strong>I'm not a good child. I like Marilyn Manson.</strong></h3>
        <h3><strong>My {parent} said, "{word}" </strong></h3>
        <h3><strong onClick={onClick}>And I replied "{fword} YOU OLD BASTARD U SUCK I AIN'T GONNA GIVE A {sword}"</strong></h3>
        <h3><strong>So this is why they all call me a bad boy.</strong></h3>
    </div>
);

export default BadBoy;

// you can also use PropTypes.shape({...}) to define the fine-grained structure you expect your object props to have.
// similarly, you can use arrayOf([...]) to define the fine-grained structure of your expected array props
BadBoy.propTypes = {
    parent: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    fword: PropTypes.any,
    sword: PropTypes.any
};

BadBoy.defaultProps = {
    parent: 'dad'
};