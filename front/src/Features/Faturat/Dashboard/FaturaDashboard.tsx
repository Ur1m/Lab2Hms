import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import FaturaTable from '../Form/FaturaTable';


export default observer( function FaturaDashboard() {
    
    const {faturaStore} = useStore();
    const {selectedFatura, editMode} = faturaStore;

    useEffect(() => {
      faturaStore.loadFaturat();
    }, [])
  
    if(faturaStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        
        <FaturaTable/>

    )
})