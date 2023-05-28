import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
// import {twilio} from "twilio";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import Candidate from "../components/CandidateCard";




function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
  console.log(document.cookie)
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}




export default function Vote({ role, contract, web3, currentAccount }) {
  // const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [vote, setVote] = useState(null);
  const [electionState, setElectionState] = useState(0);
  const [votedState, setvotedState] = useState(true);
  const [logState, setlogState] = useState(false);
  const [aadhar, setAadhar] = useState("");
  const [phone, setPhone] = useState("");
  const [Winner, setWinner] = useState("");


  const [open, setOpen] = useState(false);
  const getWinner = async () => {
    if (contract) {

      const count = await contract.methods.candidatesCount().call();
      var temp = "";
      var c = 0;
      console.log("Milgya winner?");
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();

        if (candidate[1] > c) {
          c = candidate[1];
          temp = candidate[0];
        }

      }

      console.log(temp);

      setWinner(temp);
      // setLoading(false);
    }
  };
  const getvotedState = async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      console.log("Number of voters", count);

      const vstate = await contract.methods.isvoted(currentAccount).call();
      console.log(vstate);
      console.log('this is printing');

      setvotedState(vstate);
      // setLoading(false);
    }
  };

  const getCandidates = async () => {
    if (contract) {
      // console.log(1);
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], votes: candidate[1] });
      }
      console.log(temp);
      setCandidates(temp);
      // setLoading(false);
    }
  };



  const voteCandidate = async (candidate) => {
    try {
      if (contract) {
        await contract.methods.vote(candidate).send({ from: currentAccount });
        getvotedState();
        getCandidates();
        window.location.reload();


      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getElectionState = async () => {
    if (contract) {
      // console.log(2);
      const state = await contract.methods.electionState().call();
      if (parseInt(state) === 2) {
        getWinner();
      }
      console.log(state);
      setElectionState(parseInt(state));
    }
  };
  const getloggedinState = async () => {


    if (contract) {
      const s = getCookie("Aadhar");
      // console.log(s);
      if(s){
      const arr = s.split(" ");
      // const voter = await contract.methods.getVoterDetails(currentAccount).call();
      const hash = await contract.methods.checkHash(currentAccount,arr[0],arr[1]).call();
      console.log("The hash is",hash);
      
      // console.log(voter);
      // console.log("Fetched details:", s, aadhar, voter[0]);
      if (parseInt(hash)) {
        setlogState(true);
        getvotedState();
        getElectionState();
        getCandidates();
        console.log("logged in");
        // alert("Logged in");
      }

      }
      else {
        console.log("Enter aadhar to continue");
        deleteAllCookies();


      }



    }

    else {
      deleteAllCookies();
    }

  };

  const handleForm = async (event) => {
    try {

      if (aadhar.length === 12 && phone.length === 10) {
        if (contract) {
          // const voter = await contract.methods.getVoterDetails(currentAccount).call();

         
          const hash = await contract.methods.checkHash(currentAccount,aadhar,phone).call();

        
          
          console.log( "The value of hash is",hash)
         
          
          // aadhar === voter[0] && phone === voter[1]
          if (parseInt(hash) === 1) {
            setlogState(true);
            setCookie("Aadhar", aadhar+" "+phone, 1);
            console.log("logged in");
          



          }
          else {
            console.log("incorrect Credentials");
            alert("Incorrect Credentials");



          }




        }
      }

      else {
        alert("Please enter the required fields correctly!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setAadhar("");
    setPhone("");


  };




  useEffect(() => {

    getloggedinState();



  }, [contract]);

  const handleVoteChange = (event) => {
    setVote(event.target.value);
  };

  const handleVote = (event) => {
    event.preventDefault();
    voteCandidate(vote);
  };

  const handleAadharChange = (event) => {
    setAadhar(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


  return (

    <Box>
      <Grid item xs={12}>
        <Typography align="center" variant="h5">
          {"Welcome   "}
          {currentAccount}

        </Typography>
        <Divider />
      </Grid>
      {logState === false &&
        <Grid
          item
          xs={12}
          sx={{
            overflowY: "hidden",
            overflowX: "auto",
            display: "flex",
            width: "98vw",
            justifyContent: "center",
          }}
        >
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
                label="Aadhar Number"
                variant="outlined"
                value={aadhar}
                onChange={handleAadharChange}
                type="password"
                autoComplete="current-password"
                helperText="12 digit Aadhar Number eg. 123456789012"
              />


              <TextField
              required
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={handlePhoneChange}
                type="password"
                autoComplete="current-password"
                helperText="10 digit Phone Number eg. 1234567890"
              />

              <Button variant="contained" type="submit">
                Verify Credentials
              </Button>
            </Stack>
          </Box>


        </Grid>

      }



      {logState === true &&
        <Grid>

          {votedState === true && "Can not vote" &&
            <Grid>
              {electionState === 1 && votedState === true && (
                <>
                  <Grid item xs={12}>
                    <Typography align="center" variant="h4">
                      {"Already voted!! Please wait for results"}

                    </Typography>
                    <Divider />
                  </Grid>
                </>
              )}
            </Grid>
          }

          {votedState === false && "Can vote" &&
            <form onSubmit={handleVote}>
              <Grid container sx={{ mt: 0 }} spacing={6} justifyContent="center">
                <Grid item xs={12}>
                  <Typography align="center" variant="h4">
                    {electionState === 0 &&
                      "Please Wait... Election has not started yet."}

                    {electionState === 1 && "VOTE HERE"}
                    {electionState === 2 &&
                      "Election has ended. See the results below."}

                  </Typography>
                  <Divider />
                </Grid>

                {electionState === 1 && votedState === false && (
                  <>
                    <Grid item xs={12}>
                      <FormControl>
                        <RadioGroup
                          row
                          sx={{
                            overflowY: "hidden",
                            overflowX: "auto",
                            display: "flex",
                            width: "98vw",
                            justifyContent: "center",
                          }}
                          value={vote}
                          onChange={handleVoteChange}
                        >
                          {candidates.map((candidate, index) => (
                            <FormControlLabel
                              key={index}
                              labelPlacement="top"
                              control={<Radio />}
                              value={index}
                              label={<Candidate id={index} name={candidate.name} />}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ margin: 20 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ width: "100%" }}
                        >
                          Vote
                        </Button>
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          }
          {electionState === 2 && (


            <Grid >
              <Divider />
              <Typography align="center" variant="h4">

                {"Election has ended. See the results below.\n\n\n\n"}


              </Typography>
              <Divider />
            </Grid>

          )}



          {electionState === 2 && (





            <Grid
              item
              xs={12}
              sx={{
                overflowY: "hidden",
                overflowX: "auto",
                display: "flex",
                width: "98vw",
                justifyContent: "center",
              }}
            >


              {candidates &&
                candidates.map((candidate, index) => (
                  <Box sx={{ mx: 2 }} key={index}>
                    <Candidate
                      id={index}
                      name={candidate.name}
                      voteCount={candidate.votes}
                    />
                  </Box>
                ))}
            </Grid>
          )}

          {electionState === 2 && (





            <Grid item xs={12}>
              <Divider />
              <Divider />
              <Divider />
              <Typography align="center" variant="h5">

                {" The winner is   "}
                {Winner}

              </Typography>
              <Divider />
            </Grid>
          )}


        </Grid>

      }



    </Box>
  );
}
