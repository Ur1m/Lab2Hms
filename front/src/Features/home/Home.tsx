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
       <h1>Numri i mjekeve: {doktorat.length}</h1>
     <img src="assets/5.jpg"/>
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i deparatmenteve: {Departmentet.length}</h1>
        <Image src='assets/depp.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i pacientave: {pacientat.length}</h1>
        <Image src='assets/aaa.jpg' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
      <h1>Numri i pajisjeve: {paisjet.length}</h1>
        <Image src='assets/paisjet.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i terminave: {terminet.length}</h1>
        <Image src='assets/ter.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i barnave: {Barnat.length}</h1>
        <Image src='assets/sss.jpg' />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      <h1>Numri i faturave: {Faturat.length}</h1>
        <Image src='assets/pay.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i dhomave: {Dhomat.length}</h1>
        <Image src='assets/rooms.jpg' />
      </Grid.Column>
      <Grid.Column>
      <h1>Numri i shtreterve: {Shtreter.length}</h1>
        <Image src='assets/bed.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  
    )
}
