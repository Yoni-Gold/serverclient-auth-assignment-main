import React , { useState , useRef } from "react";
import { Redirect } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// axios
import axios from "axios";
//redux
import { useSelector } from "react-redux";

import md5 from "md5";

import { ThreeDots } from '@agney/react-loading';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Signup() {
  const classes = useStyles();
  const userLoggedState = useSelector(store => store);
  const [ errorState , setError ] = useState({userName: false, email: false, password: false, firstName: false, lastName: false, city: false, country: false, postalCode: false})
  const [ requestState , setRequestState ] = useState(null);
  const userName = useRef();
  const password = useRef();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const city = useRef();
  const country = useRef();
  const postalCode = useRef();
  const aboutMe = useRef();

  const handleSubmit = async () => {
    if ([userName, password, email, firstName, lastName, city, country, postalCode].every(field => !RegExp('^(\\s)*$').test(field.current.value)))
    {  
        setRequestState('pending');
        const token = await axios.post(`/user` , { user: { 
          userName: userName.current.value.trim(),  
          email: email.current.value.trim(), 
          password: md5(password.current.value),
          firstName: firstName.current.value.trim(),
          lastName: lastName.current.value.trim(),
          city: city.current.value.trim(),
          country: country.current.value.trim(),
          postalCode: postalCode.current.value.trim(),
          aboutMe: aboutMe.current.value.trim()
        }})
        .catch(error => {
          console.log('user email exists');
          setRequestState(null);
        });
        
        if (token) 
        {
          setRequestState('done');
        }
    }

    else
    {
      let newError = {...errorState};
      [userName, password, email, firstName, lastName, city, country, postalCode].forEach(field => {
        RegExp('^(\\s)*$').test(field.current.value) ? newError[field.current.id] = true : newError[field.current.id] = false;
      });
      console.log([userName.current.value, password, email, firstName, lastName, city, country, postalCode]);
      console.log(newError);
      setError(newError);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Signup</h4>
              <p className={classes.cardCategoryWhite}>Fill out the information to register</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.userName}
                    labelText="Username"
                    id="userName"
                    inputProps={{ inputRef: userName }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.email}
                    labelText="Email address"
                    id="email"
                    inputProps={{ inputRef: email }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.password}
                    labelText="Password"
                    id="password"
                    inputProps={{ inputRef: password , type: 'password' }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    error={errorState.firstName}
                    labelText="First Name"
                    id="firstName"
                    inputProps={{ inputRef: firstName }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    error={errorState.lastName}
                    labelText="Last Name"
                    id="lastName"
                    inputProps={{ inputRef: lastName }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.city}
                    labelText="City"
                    id="city"
                    inputProps={{ inputRef: city }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.country}
                    labelText="Country"
                    id="country"
                    inputProps={{ inputRef: country }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.postalCode}
                    labelText="Postal Code"
                    id="postalCode"
                    inputProps={{ inputRef: postalCode }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="aboutMe"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      inputRef: aboutMe,
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {userLoggedState ? <Redirect to='/'/> : <></>}
              {requestState === 'done' ? <Redirect to='/login' /> : requestState === 'pending' ? <ThreeDots width='100'/> : <Button onClick={handleSubmit} color="primary">Signup</Button>}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
