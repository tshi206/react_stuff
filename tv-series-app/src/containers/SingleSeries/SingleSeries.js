import React from 'react';
import 'whatwg-fetch';
import Loader from '../../components/Loader/Loader';

export default class SingleSeries extends React.Component {

    state = {
        show: null
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    show: json // obj
                })
            });
    }

    render() {
        console.log(this.props);
        console.log(this.props.match.params.id);
        const { show } = this.state;
        console.log(show);
        // noinspection JSUnresolvedVariable
        return (
            <div>
                <p>Single Series - the show id is {this.props.match.params.id}</p>
                {
                    show === null && <Loader/>
                }
                {
                    show !== null
                    &&
                    <div>
                        <p>{show.name}</p>
                        <p>Premiered - {show.premiered}</p>
                        <p>Rating - {show.rating.average}</p>
                        <p>Episodes - {show._embedded.episodes.length}</p>
                        <p>
                            <img alt="show" src={show.image.medium} />
                        </p>
                    </div>
                }
            </div>
        );
    }

}