import {useEffect, useRef} from "react";
import "./Dialog.css"
import AddRecipeForm from "../Forms/AddRecipeForm.tsx";

interface DialogProps {
    openDialog: boolean;
    closeDialog: () => void;
}

const Dialog = ( {openDialog, closeDialog}: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        if (openDialog) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [openDialog]);

    const handleFormSubmit = (data: any) => {
        console.log("Formularz wysłany:", data);
        closeDialog();
    };


    return (
        <dialog className="dialog" ref={dialogRef} onCancel={closeDialog}>
            <AddRecipeForm onSubmit={handleFormSubmit} onCancel={closeDialog} />
        </dialog>
    );
}

export default Dialog;