import React, { Component } from 'react';
import SeriesList from "../../components/SeriesList/SeriesList";
import Loader from "../../components/Loader/Loader";
import {Intro} from "../../components/Intro/Intro";

export default class Series extends Component {

    // all Component classes inherit the 'state' property, we override it here to make it our customized state
    state = {
        series: [],
        seriesName: '',
        isFetching: false
    };

    componentDidMount() {
        // don't care
    }

    // define custom method as lambda may help avoiding explicit binding. For this example, since our custom onSeriesInputChange method is written as a named function literal (aka lambda), we do not explicit bind it to 'this' like we usually do (which can be quite cumbersome...). However, keep in mind that this workaround DOES NOT work for all cases. Sometimes you will have to use explicit binding. For instance, when handling onSubmit event for forms, using lambda can avoid the "'this' is undefined" error but the e.preventDefault() does not work in lambda...
    onSeriesInputChange = e => {
        // const series = ['Vikings', 'Game of Thrones'];
        // setTimeout(() => {
        //     this.setState({
        //         series // shorthand for series : series since they've got the same name
        //     })
        // }, 2000);
        this.setState({
            seriesName: e.target.value,
            isFetching: true
        });
        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    series: json // [obj]
                })
            })
            .then(() =>this.setState({isFetching: false}));
        // console.log(e);
        // console.log(e.target.value);
    };

    render() {
        // variable spreading, just like what you do in ruby
        const { series, seriesName, isFetching } = this.state;
        // conditional rendering is simply pipelining ordinary JSX elements with boolean expression so that the pipelined JSX elements will only be rendered if and only if the result of evaluating the accompanying boolean expressions is TRUE.
        return (
            <div>
                <Intro message="Here you can find all of your most loved series"/>
                <div>
                    <input value={seriesName} type='text' onChange={this.onSeriesInputChange} />
                </div>
                {
                    !isFetching && series.length === 0 && seriesName.trim() === "" && <p>Please enter series name into the input</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== "" && <p>No TV series have been found with this name</p>
                }
                {
                    isFetching && <Loader/>
                }
                {
                    !isFetching && <SeriesList list={this.state.series}/>
                }
            </div>
        );
    }

}