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
        <Grid columns={3} >
    <Grid.Row>
      <Grid.Column>
      <div className="ui card bb">
  
    <img className="c" src="assets/5.jpg" />
 
  <div className="content">
    <a className="header" href="#">Mjeket</a>
    <div className="meta">
      <a className="nr">Numri i mjekeve : {doktorat.length}</a>
    </div>
  </div>
</div>
      
      </Grid.Column>
      <Grid.Column>
        <div className="ui card bb">
  
    <img  className="c"src="assets/depp.jpg" />
  
  <div className="content">
    <a className="header" href="#">Departmentet</a>
    <div className="meta">
      <a className="nr">Numri i deparatmenteve: {Departmentet.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui card bb">
  
    <img className="c" src="assets/aaa.jpg" />
  
  <div className="content">
    <a className="header" href="#">Pacientet</a>
    <div className="meta">
      <a className="nr">Numri i pacientave: {pacientat.length}</a>
    </div>
  </div>
</div>
        
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <div className="ui card bb">
  
    <img  className="c"src="assets/paisjet.jpg"/>
  
  <div className="content">
    <a className="header" href="#">Paisjet</a>
    <div className="meta">
      <a className="nr">Numri i Paisjeve: {paisjet.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui card bb">
  
    <img className="c" src="assets/ter.jpg"/>
  
  <div className="content">
    <a className="header" href="#">Terminet</a>
    <div className="meta">
      <a className="nr">Numri i terminave: {terminet.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui card bb">
  
    <img className="c" src="assets/sss.jpg"/>
 
  <div className="content">
    <a className="header" href="#">Barnat</a>
    <div className="meta">
      <a className="nr">Numri i barnave: {Barnat.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
      
        <div className="ui card bb">

    <img  className="c" src="assets/pay.jpg"/>
  
  <div className="content">
    <a className="header" href="#">Faturat</a>
    <div className="meta">
      <a className="nr">Numri i faturave: {Faturat.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
      <Grid.Column>
     
        <div className="ui card bb">

    <img  className="c"src="assets/rooms.jpg"/>
  
  <div className="content">
    <a className="header" href="#">Dhomat</a>
    <div className="meta">
      <a className="nr">Numri i dhomave: {Dhomat.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
      <Grid.Column>
        <div className="ui card bb">
  
    <img className="c" src="assets/rooms.jpg"/>
  
  <div className="content">
    <a className="header" href="#">Shtreterit</a>
    <div className="meta">
      <a className="nr">Numri i shtreterve: {Shtreter.length}</a>
    </div>
  </div>
</div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  
    )
}
