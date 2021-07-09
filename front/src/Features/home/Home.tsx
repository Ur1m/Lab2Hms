import React, { useEffect } from 'react'
import { Grid,Icon,Image } from 'semantic-ui-react'
import { useStore, useStoreBarnat, useStoreDoktorat, useStorePacientat, useStorePaisjet, useStoreTerminet } from '../../app/stores/store';
import './home.css'


export const Home = () => {
  const {DoktoratStore}=useStoreDoktorat();
  const{doktorat}=DoktoratStore;
  const {departmentStore} = useStore();
    const { Departmentet} = departmentStore;
    const {PaisjetStore}=useStorePaisjet();
    const{paisjet}=PaisjetStore;
    const {PacientatStore}=useStorePacientat();
    const{pacientat}=PacientatStore
    const {TerminetStore}=useStoreTerminet();
    const{terminet}=TerminetStore;
    const {BarnatStore}=useStoreBarnat();
    const{Barnat}=BarnatStore;
    const {faturaStore} = useStore();
    const { Faturat} = faturaStore;
    const {dhomaStore} = useStore();
    const { Dhomat} = dhomaStore;
    const {shtratStore} = useStore();
    const { Shtreter} = shtratStore;
  useEffect(()=>{
    DoktoratStore.loadDoktorat();
    departmentStore.loadDepartamentet();
    PacientatStore.loadPacientat();
    PaisjetStore.loadPaisjet();
    TerminetStore.loadTerminet();
    BarnatStore.loadBarnat();
    faturaStore.loadFaturat();
    dhomaStore.loadDhomat();
    shtratStore.loadShtreter();
},[DoktoratStore,departmentStore,PaisjetStore,PacientatStore,TerminetStore,BarnatStore,faturaStore,dhomaStore,shtratStore]);
  
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
       <h1>Number of doktors {doktorat.length}</h1>
     <img src="assets/5.jpg"/>
      </Grid.Column>
      <Grid.Column>
      <h1>Number of departments {Departmentet.length}</h1>
        <Image src='assets/depp.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Number of pacients {pacientat.length}</h1>
        <Image src='assets/pac.jpg' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
      <h1>Number of equipments {paisjet.length}</h1>
        <Image src='assets/paisjet.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Number of termineve {terminet.length}</h1>
        <Image src='assets/ter.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Number of medikaments {Barnat.length}</h1>
        <Image src='assets/barna.jpg' />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <h1>Number of bills {Faturat.length}</h1>
        <Image src='assets/pay.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Number of rooms {Dhomat.length}</h1>
        <Image src='assets/rooms.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Number of bads {Shtreter.length}</h1>
        <Image src='assets/bad.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  
    )
}
