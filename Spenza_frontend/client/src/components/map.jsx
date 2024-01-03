import { Box, Typography, styled } from "@mui/material";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useState,useEffect } from "react";

///constants
import { Regions } from "../constants/data.js";

const Container = styled(Box)`
  height: 500px;
  width: 800px;
  display: flex;
  margin: auto;
  align-items:center;
  `;
  
const Info=styled(Box)`
  width: 800px;
  margin: auto;
  margin-top:20px;
`

const Name=styled(Typography)`
    font-size:20px;
    color:#868686;
    font-weight:600;
`

const Map = () => {
  const [data, setData] = useState(null);


  return (
    <Box>
      <Container>
        <VectorMap
          map={worldMill}
          containerStyle={{
            width: "500px",
            height: "600px",
          }}
          markers={Regions}
          markerStyle={{
            initial: {
              fill:"blue",
            },
          }}
          onMarkerClick={(event, index, code) => {
            setData(Regions[index]);
          }}
          backgroundColor="#B4D4FF"
        />
      </Container>

      <Info>

        {data && (
          <Box>
            <Name>Name: {data.name}</Name>
            <Typography style={{fontSize:"18px",fontWeight:600}}>Data-Usage: {data.used_data}</Typography>
          </Box>
        )}
      </Info>

    </Box>
  );
};

export default Map;
