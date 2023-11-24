import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const  Item = (props) => {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          //to visulize
          // bgcolor: (theme) => (props.bgcolor ? 'red' : theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          // bgcolor: (theme) => (props.bgcolor == 1 ? 'secondary' :  props.bgcolor === 2 ? 'success' : 'grey.100'),
          // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };


const BinarySearchVisulizer = ({data, colorKey}) =>{
    return(
        <>
         <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        {
            data.map((val, ind)=>{
                return(
                    <Item sx={{backgroundColor: colorKey[ind] == 2 ? '#006064' : colorKey[ind] == 1 ? '#5d4037': colorKey[ind] == 3 ? '#827717' : 'white' , color: colorKey[ind] == 0 ? 'black' : '#fff'}}>{val}</Item>
                )
            })
        }
      </Box>
        </>
    )
}
export default BinarySearchVisulizer;