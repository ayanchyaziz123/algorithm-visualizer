import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { Container } from '@mui/system';
import { Flipper, Flipped } from 'react-flip-toolkit'



// const data = [10, 5, 4, 2, 100, 4 , 3, 32, 2 , 232, 2];

const SortVisualizer = ({ data, colorKey }) => {

  return (
    <Flipper flipKey={data.join('')}>

      <Box
        rounded={"lg"}
        display="grid"
        gridAutoFlow={"column"}
        gridAutoColumns={"auto"}
        minH={"full"}
        overflow={"auto"}
        flex="1"
      >
        {data.map((val, ind) => {
          return (
            <Flipped key={ind} flipId={val}>
              <Box
                display={"flex"}
                justifyContent="flex-end"
                // textAlign="center"
                flexDirection="column"
                sx={{ mr: 1 }}
                key={ind}

              >
                <p>{val}</p>
                <Box
                  key={val}
                  roundedTop={"xl"}
                  border={"1px"}
                  borderColor={"purple.200"}
                  bg={"purple.300"}
                  style={{ minHeight: `${val + 100}px`, maxWidth: '45px' }}
                  sx={{ backgroundColor: colorKey[ind] == 2 ? '#006064' : colorKey[ind] == 1 ? '#827717' : '#4e342e', borderTopRightRadius: '13px', borderTopLeftRadius: '13px' }}
                  // 2 == success , 1 == rinning
                ></Box>
              </Box>
            </Flipped>
          );
        })}
      </Box>
      <hr></hr>
    </Flipper>

  )


};
export default SortVisualizer;

