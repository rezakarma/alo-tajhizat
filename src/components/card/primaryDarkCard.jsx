const PrimaryDarkCard = (props) => {
    return ( 
        <div className={`group rounded-2xl hover:bg-primaryDark  transition-all hover:scale-110 ${props.className}`}>
            {props.children}
        </div>
     );
}
 
export default PrimaryDarkCard;