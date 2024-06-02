import RoadMapSvg1 from "../../../public/assets/roadMapSvg/roadMapSvg1";

const RoadMapItem = (props) => {
    return ( 
        <div className="group xl:w-1/6 items-center lg:h-4/5 m-auto flex flex-col justify-center gap-10 py-20">
            {props.svg}
            <div className="flex flex-col gap-5">
            <h1 className="text-primary font-bold text-xl text-center dark:text-primaryYellow">{props.title}</h1>
            <p className="text-center mx-auto w-2/3 lg:w-11/12">{props.description}</p>
            </div>
        </div>
     );
}
 
export default RoadMapItem;