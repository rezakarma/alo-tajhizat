import ProfileEditorModal from "../../../../components/modal/profileEditModal";
import AddProductForm from "../addProduct/addProductFrom/AddProductForm";

const EditProductModal = (props) => {
    return ( 
        <ProfileEditorModal modalID={'editProductModal'}>
            <AddProductForm productId={'6632b8aa38b1cd6bdfa58426'}/>
        </ProfileEditorModal>
     );
}
 
export default EditProductModal;