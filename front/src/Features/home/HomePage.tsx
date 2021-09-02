import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import '../../app/layout/styles.css';



export default observer( function HomePage(){
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            
            <Container text>
                
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' className="logo" style={{marginBottom:12}} />
                    Hospital Management System
                </Header>
                {userStore.isLoggedIn ?(
                    <>
                        <Header as='h2'  className='asas' inverted content='Welcome to Hospital Management System' />
                        <Button as={Link} to='/home' size='huge' inverted>
                            Go to Home!
                        </Button>
                    </>

                ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                                Register!
                            </Button>
                        </>
                    
                )}
                
                
            </Container>
     </Segment>
    )
})