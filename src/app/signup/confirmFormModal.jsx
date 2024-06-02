import { useDispatch } from 'react-redux';
import ProfileEditorModal from '../../components/modal/profileEditModal'
import { Button } from "@nextui-org/react";
import { profileEditMoadalAction } from '../../store/profileEditModal-slice'
const ConfirmFormModal = (props) => {

    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(profileEditMoadalAction.closeModal(props.modalID))
        props.onSubmit()
    }

    return ( 
        <ProfileEditorModal modalID={props.modalID}>
            <div>
                برای تایید شماره موبایل کدی به شماره ی{props.phoneNumber} ارسال میشود. از صحت شماره موبایل خود اطمینان دارید؟
            </div>
            <Button
          color="primary"
          radius="full"
          onClick={submitHandler}
        >
           گرفتن کد تایید
        </Button>
        </ProfileEditorModal>
     );
}
 
export default ConfirmFormModal;