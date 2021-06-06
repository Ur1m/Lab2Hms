export const datanormale=(date:Date)=>{
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDay();
    const DataString=`${year}-${month}-${day}`

    return new Date(DataString)

}