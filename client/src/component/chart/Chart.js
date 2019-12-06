import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from './Bar';
import { generateUnsorted } from '../../actions';

class Chart extends Component {
    componentDidMount() {
        this.props.generateUnsorted();
    }

    renderValues = () => {
        let { array, selected, sorted, swaped, highlighted } = this.props;
        return array.map((val, idx) => {
            return <Bar 
                    key={idx}
                    val={val}
                    selected={selected.includes(idx)}
                    sorted={sorted.includes(idx)}
                    swaped={swaped.includes(idx)}
                    highlighted={highlighted.includes(idx)}
                    />
        });
    }

    render() {
        return (
            <ul className="chart">
                {this.renderValues()}
            </ul>
        );
    }
}

const mapStateToProps = ({ array, selected, sorted, swaped, highlighted }) => {
    return { array, selected, sorted, swaped, highlighted };
}

export default connect(mapStateToProps, { generateUnsorted })(Chart);