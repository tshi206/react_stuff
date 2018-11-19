import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import loader from '../assets/loader.gif';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;

export class Launches extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">
                    Launches
                </h1>
                <MissionKey/>
                <Query
                    client={undefined}
                    fetchPolicy={undefined}
                    notifyOnNetworkStatusChange={undefined}
                    onCompleted={undefined}
                    onError={undefined}
                    pollInterval={undefined}
                    query={LAUNCHES_QUERY}
                    variables={undefined}
                    ssr={undefined}
                    partialRefetch={undefined}
                    children={undefined}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <img src={loader} alt="loading"/>;
                            if (error) console.log(error);
                            return <Fragment>
                                    {
                                        data.launches.map(launch => <LaunchItem key={launch.flight_number} launch={launch}/>)
                                    }
                            </Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launches;