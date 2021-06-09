import React, { useEffect}  from 'react'
import { Grid } from 'semantic-ui-react'
import { ILaboratori } from '../../../app/models/ILaboratori'
import LaboratoriDetails from '../Details/LaboratoriDetails'
import LaboratoriForm from '../Form/LaboratoriForm'
import LaboratoriList from './LaboratoriList'

interface IProps{
    laboratoret: ILaboratori[]
    selectLaboratori: (id: string) => void;
    selectedLaboratori: ILaboratori | null;
    editMode:boolean;
    setEditMode:(editMode: boolean)=>void;
    setSelectedLaboratori:(laboratori: ILaboratori| null)=>void;
    createLaboratori: (laboratori: ILaboratori) =>void;
    editLaboratori: (laboratori: ILaboratori) =>void;
    deleteLaboratori:(id:string)=>void;

}

const LaboratoriDashboard : React.FC<IProps> = ({
    laboratoret,
    selectLaboratori,
    selectedLaboratori,
    editMode,
    setEditMode,
    setSelectedLaboratori,
    createLaboratori,
    editLaboratori,
    deleteLaboratori,

}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <LaboratoriList laboratoret ={laboratoret} 
                selectLaboratori={selectLaboratori}
                deleteLaboratori={deleteLaboratori}
                />
            </Grid.Column>

            <Grid.Column width={6}>
                {selectedLaboratori && !editMode && (
                    <LaboratoriDetails 
                 laboratori={selectedLaboratori} 
                 setEditMode={setEditMode}
                 setSelectedLaboratori={setSelectedLaboratori}
                 />
                 )}
                {editMode && (
                <LaboratoriForm 
                key={selectedLaboratori && selectedLaboratori.id || 0}
                setEditMode={setEditMode}
                 laboratori={selectedLaboratori!} 
                 createLaboratori={createLaboratori}
                 editLaboratori={editLaboratori}
                 />
                 )}
            </Grid.Column>
        </Grid>
    )
}

export default LaboratoriDashboard
