import React, { Component } from 'react';
import SortVisualizer from '../visulizers/SortVisualizer';
import { Container } from '@mui/system';
import { Box, Button, Grid, Slider, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { bubble_sort, selection_sort, insertion_sort } from '../algorithms/Sort';


class SortingScreen extends Component {
    state = {
        array: [],
        steps: [],
        colorKey: [],
        colors: [],
        timouts: [],
        currentStep: 0,
        count: 10,
        delay: 1400,
        algorithm: 'bubble sort',
        isRunning: false,
    };

    componentDidMount() {
        this.generateElements(this.state.count);
    }


    setArraySize = (e) => {
        const val = Number(e.target.value);
        if (isNaN(val)) {
            alert("Input must be an integer")
            return;
        }
        if (val > 1500) {
            alert("Input must be bellow 4000");
            return;
        }
        this.setState({
            count: Number(e.target.value)
        })
        this.generateElements(Number(e.target.value));
    }


    handleSpeedChanged = (e) => {
        const val = Number(e.target.value);

        const speed = ((1000 - (val * 10)) + 1);
        this.setState({ delay: speed });
    }

    handleAlgorithm = (e) => {
        const val = e.target.value;
        this.setState({ algorithm: val });
    }


    handleStart = () => {
        let array = this.state.array.slice();
        let steps = this.state.steps.slice();
        let colors = this.state.colors.slice();
        let algo = this.state.algorithm;
        if (algo == 'bubble sort') {
            bubble_sort(array, 0, steps, colors);
        }
        else if (algo == 'selection sort') {
            selection_sort(array, 0, steps, colors);
        }
        else if (algo == 'insertion sort') {
            insertion_sort(array, 0, steps, colors);
        }


        this.setState({ isRunning: true });


        this.clearTimeouts();
        let timeouts = [];

        let i = 0;
        while (i < steps.length - this.state.currentStep) {
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colors[currentStep],
                    currentStep: currentStep + 1,
                });
                timeouts.push(timeout);
            }, this.state.delay * i);
            i++;
        }

        this.setState({
            timeouts: timeouts,
        });
    };




    clearTimeouts = () => {
        this.state.timouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({ timeouts: [] });
    };

    clearColorKey = () => {
        let blank = new Array(this.state.count).fill(0);
        this.setState({ colorKey: blank, colors: [blank] });
    };

    reGenerateElements = () => {
        this.generateElements(this.state.count);
    }

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    generateElements = (count) => {
        this.clearTimeouts();
        this.clearColorKey()
        console.log(" 1", this.state.array);
        this.setState({
            array: [],
        })
        let arr = [];
        console.log("count is here -> ", count);
        for (let i = 0; i < count; i++) {
            arr.push(this.generateRandomNumber(50, 200));
        }

        this.setState(
            {
                array: arr,
                steps: [arr],
                count: count,
                currentStep: 0,
            }

        );
    };


    render() {

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={3} >




                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField  disabled={this.state.isRunning} id="outlined-basic" label="array size" variant="outlined" fullWidth size="small" value={this.state.count} onChange={this.setArraySize} />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">select sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={this.state.algorithm}
                                label="Age"
                                onChange={this.handleAlgorithm}
                                value={this.state.algorithm}
                                size="small"
                                disabled={this.state.isRunning}
                            >
                                <MenuItem value='bubble sort'>Bubble Sort</MenuItem>
                                <MenuItem value='selection sort'>Selection Sort</MenuItem>
                                <MenuItem value='insertion sort'>insertion Sort</MenuItem>

                            </Select>
                        </FormControl>
                        <Slider
                            size="small"
                            defaultValue={50}
                            aria-label="Small"
                            valueLabelDisplay="10px"
                            onChange={this.handleSpeedChanged}
                            disabled={this.state.isRunning}


                        />
                        speed
                        <br></br>
                        <br></br>

                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small" onClick={this.reGenerateElements} disabled={this.state.isRunning}>Regen</Button>



                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small" onClick={() => window.location.reload(false)}  >reload</Button>
                        <Button sx={{ bgcolor: '#006064' }} variant='contained' size="small" onClick={this.handleStart} disabled={this.state.isRunning}>start</Button>

                        <br></br>





                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <SortVisualizer data={this.state.array} colorKey={this.state.colorKey} />
                        {
                            this.state.algorithm == 'bubble sort' ?
                                <h4 sx={{ textAlign: 'center' }}>The best-case time complexity of Bubble Sort is: O(n) <br></br> The worst-case time complexity of Bubble Sort is: O(n²) <br></br> The average time complexity of Bubble Sort case is: O(n²)</h4>
                                : this.state.algorithm == 'selection sort' ?
                                    <h4 sx={{ textAlign: 'center' }}>Selection Sort time complexity 0 n*2 </h4>
                                    : null
                        }
                    </Grid>

                </Grid>
            </Box>
        );
    }
}

export default SortingScreen;