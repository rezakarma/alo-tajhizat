import { CheckCircle2 } from 'lucide-react';

const SuccessForm = (props) => {
    return ( 
        <>
        {props.message &&  <div className="bg-emerald-500/[15%] p-3 rounded-xl flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircle2 className="w-4 h-4 "/>
        <p>{props.message}</p>
        </div>}
        </>
     );
}
 
export default SuccessForm;