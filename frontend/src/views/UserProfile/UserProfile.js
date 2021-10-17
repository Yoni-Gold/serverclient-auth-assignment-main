import React , { useState , useRef , useEffect } from "react";
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

import avatar from "assets/img/faces/marc.jpg";

import md5 from "md5";

import axios from "axios";

import { ThreeDots } from '@agney/react-loading';

import { useSelector } from 'react-redux';

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

export default function UserProfile() {
  const classes = useStyles();
  const userLoggedState = useSelector(store => store);
  const [ user , setUser ] = useState(null);
  const [ errorState , setError ] = useState({userName: false, email: false, firstName: false, lastName: false, city: false, country: false, postalCode: false})
  const [ requestState , setRequestState ] = useState(null);
  const userName = useRef();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const city = useRef();
  const country = useRef();
  const postalCode = useRef();
  const aboutMe = useRef();

  useEffect(() => {(async () => {
    const { data: userInfo } = await axios.get('/user');
    setUser(userInfo);
  })()} , []);

  const handleSubmit = async () => {
    if ([userName, email, firstName, lastName, city, country, postalCode].every(field => !RegExp('^(\\s)*$').test(field.current.value)))
    {  
        setRequestState('pending');
        const token = await axios.put(`/user` , { 
          userName: userName.current.value.trim(),  
          email: email.current.value.trim(), 
          firstName: firstName.current.value.trim(),
          lastName: lastName.current.value.trim(),
          city: city.current.value.trim(),
          country: country.current.value.trim(),
          postalCode: postalCode.current.value.trim(),
          aboutMe: aboutMe.current.value.trim()
        })
        .catch(error => {
          console.log('an error happened');
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
      [userName, email, firstName, lastName, city, country, postalCode].forEach(field => { 
        RegExp('^(\\s)*$').test(field.current.value) ? newError[field.current.id] = true : newError[field.current.id] = false;
      });
      setError(newError);
    }
  };

  return (
    <>{user ? <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    error={errorState.userName}
                    labelText="Username"
                    id="userName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.userName,
                      inputRef: userName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.email}
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.email,
                      inputRef: email
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
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.firstName,
                      inputRef: firstName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    error={errorState.lastName}
                    labelText="Last Name"
                    id="lastName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.lastName,
                      inputRef: lastName
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
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.city,
                      inputRef: city
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.country}
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.country,
                      inputRef: country
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    error={errorState.postalCode}
                    labelText="Postal Code"
                    id="postalCode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: user.postalCode,
                      inputRef: postalCode
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
                      defaultValue: user.aboutMe,
                      inputRef: aboutMe,
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {userLoggedState ? <></> : <Redirect to='/'/>}
              {requestState === 'done' ? <Redirect to='/' /> : requestState === 'pending' ? <ThreeDots width='100'/> : <Button onClick={handleSubmit} color="primary">Update Profile</Button>}
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
    </div> : <ThreeDots width='200' />}</>
  );
}
