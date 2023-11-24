import React, { Component } from 'react';
import SortVisualizer from '../visulizers/SortVisualizer';
import { Container } from '@mui/system';
import { Alert, Box, Button, Grid, Slider, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { binary_search, roted_arrayBinarySearch } from '../algorithms/BinarySearch';
import BinarySearchVisulizer from '../visulizers/BinarySearchVisulizer';



class BinarySearchScreen extends Component {
    state = {
        array: [],
        steps: [],
        colorKey: [],
        colors: [],
        timouts: [],
        currentStep: 0,
        count: 200,
        delay: 500,
        target: 10,
        isRunning: false,
        algorithm: 'bs1',
        isRoted: false,
        roted_value: 90,
    };

    componentDidMount() {
        this.generateElements(this.state.count);
    }


    // to define array size
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
   
    // to handle speed change
    handleSpeedChanged = (e) => {
        const val = Number(e.target.value);
        const speed = ((1000 - (val * 10)) + 1);
        this.setState({ delay: speed });
    }
    
    // to make array roted
    makeArrayRoted = (arr, rot) =>{
        let val;
        if(rot == 45) val = Math.floor(arr.length / 8);
        if(rot == 90) val = Math.floor(arr.length / 4);
        if(rot == 180 )val = Math.floor(arr.length / 2);
        for(let i = 0; i < val; i++)
        {
            
            arr.push(arr.shift())
        }
        this.setState({
            array: arr
        })
    }
     // to store algotthm name
    handleAlgorithm = (e) => {
        const val = e.target.value;
        if (val == 'bs2') {
            this.setState({ isRoted: true });
            let arr = this.state.array;
            let num = this.state.roted_value;
            this.makeArrayRoted(arr, num);
        }
        else {
            this.generateElements(this.state.count)
            this.setState({ isRoted: false });
        }
        this.setState({ algorithm: val });
    }


    handleRotedValue = (e) => {
        const val = Number(e.target.value);
        this.setState({ roted_value: val });
        let arr = this.state.array;
        this.makeArrayRoted(arr, val);
    }

    handleTarget = (e) => {
        const val = Number(e.target.value);
        if (isNaN(val)) {
            alert("Input must be an integer")
            return;
        }
        if (val > 1500) {
            alert("Input must be bellow 4000");
            return;
        }
        this.setState({ target: val });
    }


    handleStart = () => {
        let array = this.state.array.slice();
        let steps = this.state.steps.slice();
        let colors = this.state.colors.slice();
        let target = this.state.target;
        let algo = this.state.algorithm;
        if(algo == 'bs2')
        {
            roted_arrayBinarySearch(array, target, steps, colors)
        }
        else{
            binary_search(array, target, steps, colors);
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
        this.setState({
            array: [],
            color: [],
            colorKey: []
        })
      
        let blank = [];
        let arr = [];
        
        for (let i = 1; i <= count; i++) {
            arr.push(i * 2);
            blank.push(0);
        }

        
        this.setState(
            {
                array: arr,
                steps: [arr],
                colorKey: blank,
                colors: [blank],
                count: count,
                currentStep: 0,
            }
        );
        if(this.state.algorithm == 'bs2')
        {
            this.makeArrayRoted(this.state.array, this.state.roted_value);
        }
    };


    render() {

        return (
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt: 4}}>
                    <Grid item xs={12} sm={3} >
                        <Typography sx={{ backgroundColor: '#006064', color: 'white', p: 1, fontWeight: '700', borderRadius: '5px' }}>Found Target color!</Typography>
                        <Typography sx={{ backgroundColor: '#827717', color: 'white', p: 1, mt: 1, fontWeight: '700', borderRadius: '5px' }}>Mid color!</Typography>
                        <Typography sx={{ backgroundColor: '#5d4037', color: 'white', p: 1, mt: 1, fontWeight: '700', borderRadius: '5px' }}>Eliminated color!</Typography>



                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">select technique</InputLabel>
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
                                <MenuItem value='bs1'>binary search</MenuItem>
                                <MenuItem value='bs2'>roted array binary search</MenuItem>

                            </Select>
                        </FormControl>


                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField disabled={this.state.isRunning} id="outlined-basic" label="array size" variant="outlined" fullWidth size="small" value={this.state.count} onChange={this.setArraySize} />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField disabled={this.state.isRunning} id="outlined-basic" label="target data" variant="outlined" fullWidth size="small" value={this.state.target} onChange={this.handleTarget} />
                        </FormControl>
                        {
                            this.state.isRoted ? <>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="demo-simple-select-label">rotate array</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={this.state.algorithm}
                                        label="Age"
                                        onChange={this.handleRotedValue}
                                        size="small"
                                        disabled={this.state.isRunning}
                                    >
                                        <MenuItem value={45}>45 degree</MenuItem>
                                        <MenuItem value={90}>90 degree</MenuItem>
                                        <MenuItem value={180}>180 degree</MenuItem>

                                    </Select>
                                </FormControl>
                            </> : null
                        }
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
                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small" color="warning" onClick={this.reGenerateElements} disabled={this.state.isRunning}>Regen</Button>



                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small" color='warning' onClick={() => window.location.reload(false)}  >reload</Button>
                        <Button  sx={{ bgcolor: '#006064' }} variant='contained' size="small" onClick={this.handleStart} disabled={this.state.isRunning}>start</Button>
                        <br></br>

                    </Grid>
                    <Grid xs={12} sm={9}>
                        <BinarySearchVisulizer data={this.state.array} colorKey={this.state.colorKey} />
                        <h3>binary search algorithm is O(log n)</h3>

                    </Grid>

                </Grid>
        );
    }
}

export default BinarySearchScreen;