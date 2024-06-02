import { AlertTriangle  } from 'lucide-react';

const ErrorForm = (props) => {
    return ( 
        <>
        {props.message &&  <div className="bg-red-100 p-3  rounded-xl flex justify-center items-center gap-x-2 text-sm text-red-700">
        <AlertTriangle className="w-4 h-4 "/>
        <p>{props.message}</p>
        </div>}
        </>
     );
}
 
export default ErrorForm;