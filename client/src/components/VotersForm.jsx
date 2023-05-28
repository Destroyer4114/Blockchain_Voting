import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";


function isNumber(str) {
  if (str.trim() === '') {
    return false;
  }

  return !isNaN(str);
}

export default function VotersForm({ contract, web3, currentAccount }) {
  
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [phno, setPhno] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    try {

      if(name.length>0 && aadhar.length==12 && phno.length==10){
        await contract.methods.addVoter(name,aadhar,phno).send({ from: currentAccount });
        console.log("voter added");
        
        window.location.reload();
        alert("voter added");

      }
      else{
        alert("Please enter the required fields correctly!!");

      }
     
    } catch (error) {
      console.log(error);
      alert("Please enter the required fields correctly!!");
    }
    setName("");
    setAadhar("");
    setPhno("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAadharChange = (event) => {
    
    setAadhar(event.target.value);
    
  };
  const handlePhnoChange = (event) => {
    setPhno(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleForm}
    >
      <Stack spacing={2}>
        <TextField
        required
        
          id="outlined-basic"
          label="Voters Address"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          // helperText="Incorrect entry."
   
        />
        <TextField
        required
          id="outlined-basic"
          label="Aadhar Number"
          variant="outlined"
          value={aadhar}
          onChange={handleAadharChange}
          helperText="eg: 123456789012"
        />
        <TextField
        required
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          value={phno}
          onChange={handlePhnoChange}
          helperText="eg: 9876543210"
        />
        <Button variant="contained" type="submit">
          Add Voter
        </Button>
      </Stack>
    </Box>
  );
}
