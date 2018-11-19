import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import loader from "../assets/loader.gif";
import Moment from 'react-moment';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local,
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export class Launch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <Fragment>
                <Query
                    client={undefined}
                    fetchPolicy={undefined}
                    notifyOnNetworkStatusChange={undefined}
                    onCompleted={undefined}
                    onError={undefined}
                    pollInterval={undefined}
                    query={LAUNCH_QUERY}
                    variables={{ flight_number }}
                    ssr={undefined}
                    partialRefetch={undefined}
                    children={undefined}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <img src={loader} alt="loading"/>;
                            if (error) console.log(error);
                            const { mission_name, flight_number, launch_year, launch_success, launch_date_local, rocket: { rocket_id, rocket_name, rocket_type } } = data.launch;
                            return (
                                <div>
                                    <h1 className="display-4 my-3">
                                        <span className="text-dark">
                                            Mission: {mission_name}
                                        </span>
                                    </h1>
                                    <h4 className="mb-3">
                                        Launch Details
                                    </h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">Flight Number: {flight_number}</li>
                                        <li className="list-group-item">Launch Year: {launch_year}</li>
                                        <li className="list-group-item"><span className={classNames({ 'text-success': launch_success, 'text-danger': !launch_success })}>Launch Successful: {launch_success ? "Yes" : "No"}</span></li>
                                        <li className="list-group-item">Launch Date Local: <Moment format="YYYY-MM-DD HH:mm">{ launch_date_local }</Moment></li>
                                    </ul>
                                    <h4 className="my-3">
                                        Rocket Details
                                    </h4>
                                    <ul className="list-group">
                                        <li className="list-group-item">Rocket ID: {rocket_id}</li>
                                        <li className="list-group-item">Rocket Name: {rocket_name}</li>
                                        <li className="list-group-item">Rocket Type: {rocket_type}</li>
                                    </ul>
                                    <hr/>
                                    <Link className="btn btn-secondary" to="/">Back</Link>
                                </div>
                            )
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launch