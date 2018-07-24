import React from 'react';

import Input from './Input';

export default ({ id,
                    value,
                    initiative,
                    hitpoints,
                    onNameChange,
                    onInitiativeChange,
                    onHitpointsChange,
                    onRemove
}) => (
    <div className="card">
        <Input
            label="Name: "
            type="text"
            value={value}
            onChange={ e => onNameChange(id, e) } />
        <Input
            label="Initiative: "
            type="number"
            value={initiative}
            onChange={ e => onInitiativeChange(id, e) } />
        <Input
            label="Hitpoints: "
            type="number"
            value={hitpoints}
            onChange={ e => onHitpointsChange(id, e) } />
        <button onClick={ () => onInitiativeChange(id,
            {target: {value: Math.floor(Math.random() * 500)} } ) } >Dice</button>
        <button onClick={ () => onRemove(id) } >Remove</button>
    </div>
);