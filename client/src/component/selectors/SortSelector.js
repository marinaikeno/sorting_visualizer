import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bubbleSort, selectionSort, insertionSort, shellSort, heapSort, generateUnsorted } from '../../actions';
import SortButton from './SortButton';

class SortSelector extends Component {
    state = {
        selected: ""
    }

    onSort = (selected) => {
        this.setState({ selected });
    }

    onGenerate = () => {
        this.setState({ selected: "" });
        this.props.generateUnsorted();
    }

    render() {
        const { selected } = this.state;

        return (
            <nav className="sort-actions">
                <SortButton text="Bubble Sort" disable={selected.length} selected={selected} sortClick={this.props.bubbleSort} handleState={this.onSort} />
                <SortButton text="Selection Sort" disable={selected.length} selected={selected} sortClick={this.props.selectionSort} handleState={this.onSort} />
                <SortButton text="Insertion Sort" disable={selected.length} selected={selected} sortClick={this.props.insertionSort} handleState={this.onSort} />
                <SortButton text="Shell Sort" disable={selected.length} selected={selected} sortClick={this.props.shellSort} handleState={this.onSort} />
                <SortButton text="Heap Sort" disable={selected.length} selected={selected} sortClick={this.props.heapSort} handleState={this.onSort} />
                <button id="generate" disabled={!this.props.checkSorted} onClick={this.onGenerate}>Generate</button>
            </nav>
        );
    }
}

const mapStateToProps = ({ array, selected, sorted, swaped, checkSorted }) => {
    return { array, selected, sorted, swaped, checkSorted };
}

export default connect(mapStateToProps, { bubbleSort, selectionSort, insertionSort, shellSort, heapSort, generateUnsorted })(SortSelector);