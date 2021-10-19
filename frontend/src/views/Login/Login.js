import React , { useRef , useState } from "react";
import axios from 'axios';
import md5 from 'md5';
import { Redirect } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
// loading component
import { ThreeDots } from '@agney/react-loading';
//redux
import store from "redux/store";
import { useSelector } from "react-redux";
import { Label } from "@material-ui/icons";

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
  const [ errorState , setError ] = useState({email: false , password: false});
  const [ requestState , setRequestState ] = useState(null);
  const [ wrongLogin , setWrongLogin ] = useState(false);
  const loginRequest = async () => {
    if (!RegExp('^(\\s)*$').test(email.current.value) && !RegExp('^(\\s)*$').test(password.current.value))
    {  
        setRequestState('pending');
        const token = await axios.post(`/login` , { email: email.current.value.trim() , password: md5(password.current.value) })
        .catch(({ response }) => {
          setRequestState(null);
          setWrongLogin(response.data.error);
        });

        if (token) 
        {
          store.dispatch({type: 'login' , token: token});
          setRequestState('done');
        }
    }

    else
    {
      let newError = {...errorState};
      RegExp('^(\\s)*$').test(email.current.value) ? newError.email = true : newError.email = false;
      RegExp('^(\\s)*$').test(password.current.value) ? newError.password = true : newError.password = false;
      setError(newError);
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
                  <CustomInput
                    error={errorState.email}
                    labelText="Email address"
                    id="email-address"
                    inputProps={{ inputRef: email }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    error={errorState.password}
                    labelText="Password"
                    id="password"
                    inputProps={{ type: 'password' , inputRef: password }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              {(userLoggedState || requestState === 'done') ? <Redirect to='/'/> : requestState === 'pending' ? <ThreeDots width='100'/> : <Button color="primary" onClick={loginRequest} >Login</Button>}
              <p style={{color: 'red'}}>{ wrongLogin }</p>
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
