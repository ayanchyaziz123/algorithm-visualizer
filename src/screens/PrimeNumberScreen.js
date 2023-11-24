import { Container } from '@mui/system';
import React, { Component } from 'react';
import { Box, Button, Grid, Slider, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PrimeVisulizer from '../visulizers/PrimeVisulizer';
import { sieve_ofEratosthenes } from '../algorithms/PrimeNumber';


class PrimeNumberScreen extends Component {

    state = {
        array: [],
        steps: [],
        colorKey: [],
        colors: [],
        timouts: [],
        currentStep: 0,
        count: 50,
        delay: 500,
        algorithm: 'Sieve of Eratosthenes',
        isRunning: false,
    }

    componentDidMount() {
        this.generateElements(this.state.count);
    }

    reGenerateElements = () => {
        this.generateElements(this.state.count);
    }

    clearTimeouts = () => {
        this.state.timouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({ timeouts: [] });
    };

    clearColorKey = () => {
        let blank = new Array(this.state.count).fill(0);
        this.setState({ colorKey: blank, colors: [blank] });
    };

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


    handleStart = () => {

        let array = this.state.array.slice();
        let steps = this.state.steps.slice();
        let colors = this.state.colors.slice();
        sieve_ofEratosthenes(array, 0, steps, colors)


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


    render() {
        return (
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt: 4}}>
                <Grid item xs={12} sm={3} >
                    <Typography sx={{ backgroundColor: '#006064', color: '#fff', p: 1, fontWeight: '700', borderRadius: '5px' }}>Prime Number color!</Typography>
                    <Typography sx={{ backgroundColor: '#5d4037', color: '#fff', p: 1, mt: 1, fontWeight: '700', borderRadius: '5px' }}>Eliminated color!</Typography>





                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField id="outlined-basic" label="array size" variant="outlined" fullWidth size="small" value={this.state.count} onChange={this.setArraySize} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="demo-simple-select-label">select algorithm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            // value={this.state.algorithm}
                            label="Age"
                            value={this.state.algorithm}
                            disabled={this.state.isRunning}

                        >
                            <MenuItem value='Sieve of Eratosthenes'>Sieve of Eratosthenes</MenuItem>
                            <MenuItem value='selection sort'>Normal Prime</MenuItem>

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
                    <Button disabled={this.state.isRunning} sx={{ mr: 1, bgcolor: '#006064' }} onClick={this.reGenerateElements} variant='contained' size="small" >Regen</Button>



                    <Button sx={{ mr: 1, bgcolor: '#006064' }} variant='contained' size="small" onClick={() => window.location.reload(false)} >reload</Button>
                    <Button sx={{ bgcolor: '#006064' }} disabled={this.state.isRunning} variant='contained' size="small" onClick={this.handleStart} >start</Button>
                    <br></br>





                </Grid>
                <Grid xs={12} sm={9}>
                    <PrimeVisulizer data={this.state.array} colorKey={this.state.colorKey} />
                </Grid>

            </Grid>
        )
    }
}

export default PrimeNumberScreen;