/* eslint-disable react/prop-types */
const ItemBlock = ({ item, onClick }) => {
    return <div onClick={onClick} style={{cursor:item===''?"pointer":"not-allowed", border: '1px solid', height: '50px', width: '50px' ,display:'flex', justifyContent:'center', alignItems:'center'}}>
        {item}
    </div>
}
export { ItemBlock }

