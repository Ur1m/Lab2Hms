import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer (function InfermierjaDetails(){

    const {infermierjaStore}=useStore();
    const{selectedInfermierja: infermierja,loadInfermierja,loadingInitial}=infermierjaStore;
    const{Infermierja_Id}=useParams<{Infermierja_Id:string}>();

    useEffect(()=>{
        if(Infermierja_Id) loadInfermierja(Infermierja_Id);

    },[Infermierja_Id, loadInfermierja]);

    if(loadingInitial || !infermierja) return <LoadingComponent/>;

    return(
        <Card fluid>
            <Image src={`/assets/InfermierjaImages/${infermierja.infermierja_id}/.jpg`} />
            <Card.Content>
                <Card.Header>{infermierja.emri}</Card.Header>
                <Card.Meta>
                    <span>{infermierja.mbiemri}</span>
                </Card.Meta>
                <Card.Description>
                    {infermierja.koeficienti}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to ={`/manage/${infermierja.infermierja_id}`}basic color='blue' content='Edit'/>
                    <Button as={Link} to ='/infermieret' basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})

