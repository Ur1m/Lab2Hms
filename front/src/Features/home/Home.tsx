import React from 'react'
import { Grid,Icon,Image } from 'semantic-ui-react'
import './home.css'


export const Home = () => {
    return (
        /*<div className="main">
            <h1>Welcome to the Hospital Menagment System</h1>
            <div className="foto1">
                <img src="assets/5.jpg" className='f'/>
            </div>
            <div className="filozofi">
                <p>Ne ofrojm sherbimet me te mira me nje staf profesional
                    shshssshshhshshs
                    shshhshshshshs
                    shshhshshshshs
                </p>

            </div>
        </div>*/
        <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
       <h1>Number of doktors 3</h1>
       <Icon name="user doctor" width={50} height={50}/>
      </Grid.Column>
      <Grid.Column>
        <Image src='assets/1.jpg' />
      </Grid.Column>
      <Grid.Column>
        <Image src='assets/1.jpg' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Image src='assets/1.jpg' />
      </Grid.Column>
      <Grid.Column>
        <Image src='assets/1.jpg' />
      </Grid.Column>
      <Grid.Column>
        <Image src='assets/1.jpg' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
    )
}
