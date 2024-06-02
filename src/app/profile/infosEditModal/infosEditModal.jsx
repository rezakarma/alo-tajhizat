import ProfileEditorModal from "@/components/modal/profileEditModal";
import BirthDateEditModal from "./birthDateEditModal";
import EmailEditModal from "./emailEditModal";
import JobEditModal from "./jobEditModal";
import NameEditModal from "./nameEditModal";
import InfosEditPhoneNumber from "./phoneNumberEditModal/infosEditPhoneNumber";
import UsernameEditModal from "./usernameEditModal";
import PasswordEditModal from "./paswordEditModal";
import LandlineNumberEditModal from "./landlineNumberEditModal";
import PhotoWithIDCardEditModal from './photoWithIDCardEditModal'
import ProfileImageEditModal from './profileImageEditModal'
const InfosEditModals = (props) => {
  // const test = () => {if(props.modalID === 'NameEditModal'){
  //   return  <NameEditModal modalID={props.modalID} />
  // }else if (props.modalID === 'InfosEditPhoneNumber') {
  //   return <InfosEditPhoneNumber modalID={props.modalID} />
  // }else {
  //   return ''
  // }
  // }

  return (
    <>
      {props.modalID === "NameEditModal" && (
        <NameEditModal modalID={props.modalID} />
      )}
      {props.modalID === "NationalEditModal" && (
        <NameEditModal modalID={props.modalID} />
      )}
      {props.modalID === "InfosEditPhoneNumber" && (
        <InfosEditPhoneNumber modalID={props.modalID} />
      )}
      {props.modalID === "EmailEditModal" && (
        <EmailEditModal modalID={props.modalID} />
      )}
           {props.modalID === "UsernameEditModal" && (
        <UsernameEditModal modalID={props.modalID} />
      )}
      {props.modalID === "JobEditModal" && (
        <JobEditModal modalID={props.modalID} />
      )}
      {props.modalID === "BirthDateEditModal" && (
        <BirthDateEditModal modalID={props.modalID} />
      )}
      {props.modalID === "PasswordEditModal" && (
        <PasswordEditModal modalID={props.modalID} />
      )}
      {props.modalID === "landlineNumberEditModal" && (
        <LandlineNumberEditModal  modalID={props.modalID} />
      )}
      {props.modalID === "photoWithIDCardEditModal" && (
        <PhotoWithIDCardEditModal  modalID={props.modalID} />
      )}
      {props.modalID === "ProfileImageEditModal" && (
        <ProfileImageEditModal  modalID={props.modalID} />
      )}
      {props.modalID === "" && ""}
    </>
  );
};

export default InfosEditModals;
