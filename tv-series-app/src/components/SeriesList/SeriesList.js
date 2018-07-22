import React from 'react';
import {Link} from 'react-router-dom';

import "./SeriesList.css";

// distructurize 'props' with { series } is telling the JSX interpreter that we only care about the 'series' property inside the 'props' object. This is very similar to unapply() in scala where you unapply (or 'unpack') a class/object/trait to get direct access to its fields/instances.
const SeriesListItem = ({ series }) => (
    <li key={series.show.id}>
        <Link to={`/series/${series.show.id}`}>
            {series.show.name}
        </Link>
    </li>
);

const SeriesList = props => (
    <div>
        <ul className="series-list">
            {props.list.map(series => (
                <SeriesListItem series={series} key={"sl" + series.show.id}/>
            ))}
        </ul>
    </div>
);

export default SeriesList;