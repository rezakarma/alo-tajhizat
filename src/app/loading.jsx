import {Spinner} from "@nextui-org/react";
export default function Loading() {
    // Or a custom loading skeleton component
    return  <div className="h-screen w-full flex justify-center items-center rtl">
      <Spinner label="Loading..." color="primary" size="lg"/>
    </div>
  }