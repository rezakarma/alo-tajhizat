import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const useFingerPrint = () => {

    const [fpHash, setFpHash] = useState();

    useEffect(() => {
      const setFp = async () => {
        const fp = await FingerprintJS.load();
  
        const { visitorId } = await fp.get();
  
        setFpHash(visitorId);
      };   
      setFp();
    }, []);

    return fpHash
}
 
export default useFingerPrint;