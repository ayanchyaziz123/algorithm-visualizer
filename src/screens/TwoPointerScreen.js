import React, { Component } from 'react';
import SortVisualizer from '../visulizers/SortVisualizer';
import { Container } from '@mui/system';
import { Alert, Box, Button, Grid, Slider, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { opposite_directional, equ_directional} from '../algorithms/TwoPointer';
import TwoPointerVisulizer from '../visulizers/TwoPointerVisulizer';



class TwoPointerScreen extends Component {
    state = {
        array: [],
        steps: [],
        colorKey: [],
        colors: [],
        timouts: [],
        currentStep: 0,
        count: 15,
        delay: 500,
        target: 10,
        algorithm: 'technique1',
        isActiveAlgo2: false,
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

    // start here !!
    handleStart = () => {
        let array = this.state.array.slice();
        let steps = this.state.steps.slice();
        let colors = this.state.colors.slice();
        let target = this.state.target;
        if(this.state.algorithm == 'technique1')
        {
            opposite_directional(array, target, steps, colors);
        }
        else{
            equ_directional(array, target, steps, colors);
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

    handleAlgorithm = (e) => {
        const val = e.target.value;
        if (val == 'technique2') {
            this.clearTimeouts();
            this.clearColorKey()
            this.setState({
                array: [],
            })
            this.setState({ isActiveAlgo2: true, algorithm: val })
            let arr = []
            for (let i = 1; i <= 20; i++) {
                if (i % 2 == 0)
                    arr.push(0);
                else
                    arr.push(i);
                this.setState(
                    {
                        array: arr,
                        steps: [arr],
                        count: 20,
                        currentStep: 0,
                    }

                );
            }
        }
        else {
            this.setState({ algorithm: val, isActiveAlgo2: false });
        }
    }

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
            arr.push(i);
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
    };


    render() {

        return (
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 4 }}>
                    <Grid item xs={12} sm={3}>




                        <Typography sx={{ backgroundColor: '#006064', color: 'white', p: 1, fontWeight: '700', borderRadius: '5px' }}>Found Target color!</Typography>
                        <Typography sx={{ backgroundColor: '#827717', color: 'white', p: 1, mt: 1, fontWeight: '700', borderRadius: '5px' }}>Running color!</Typography>
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
                                <MenuItem value='technique1'>Opposite directional</MenuItem>
                                <MenuItem value='technique2'>Equ-directional</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField disabled={this.state.isRunning || this.state.isActiveAlgo2} id="outlined-basic" label="array size" variant="outlined" fullWidth size="small" value={this.state.count} onChange={this.setArraySize} />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField disabled={this.state.isRunning || this.state.isActiveAlgo2} id="outlined-basic" label="target data" variant="outlined" fullWidth size="small" value={this.state.target} onChange={this.handleTarget} />
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
                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small"  onClick={this.reGenerateElements} disabled={this.state.isRunning || this.state.isActiveAlgo2}>Regen</Button>



                        <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small"  onClick={() => window.location.reload(false)}  >reload</Button>
                        <Button sx={{ bgcolor: '#006064' }}  variant='contained' size="small" onClick={this.handleStart} disabled={this.state.isRunning}>start</Button>
                        <br></br>

                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TwoPointerVisulizer data={this.state.array} colorKey={this.state.colorKey} />

                    </Grid>

                </Grid>
        );
    }
}

export default TwoPointerScreen;