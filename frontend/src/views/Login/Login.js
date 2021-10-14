import React , { useRef , useState } from "react";
import axios from 'axios';
import md5 from 'md5';
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

import { ThreeDots } from '@agney/react-loading';

//redux
import store from "redux/store";
import { useSelector } from "react-redux";

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

export default function Login() {
  const classes = useStyles();
  const userLoggedState = useSelector(store => store);
  const email = useRef();
  const password = useRef();
  const [ requestState , setRequestState ] = useState(null);
  const loginRequest = async () => {
    if (!RegExp('^(\\s)*$').test(email.current.value) && !RegExp('^(\\s)*$').test(password.current.value))
    {  
        setRequestState('pending');
        const token = await axios.post(`http://localhost:3002/login` , { email: email.current.value.trim() , password: md5(password.current.value) })
        .catch(error => {
          console.log('wrong email or password');
          setRequestState(null);
        });
        
        if (token) 
        {
          store.dispatch({type: 'login' , token: token});
          setRequestState('done');
        }
    }
  };
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login</h4>
              <p className={classes.cardCategoryWhite}>Enter Email address and password</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {/* <CustomInput ref={email} 
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}
                  <input ref={email}/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {/* <CustomInput ref={password}
                    labelText="Password"
                    id="password"
                    inputProps={{ type: 'password' }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> */}
                  <input ref={password}/>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {(userLoggedState || requestState === 'done') ? <Redirect to='/'/> : requestState === 'pending' ? <ThreeDots width='100'/> : <Button color="primary" onClick={loginRequest} >Login</Button>}
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
