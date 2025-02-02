import {ReactNode, useEffect, useRef} from "react";
import "./Dialog.css"

interface DialogProps {
    openDialog: boolean;
    closeDialog: () => void;
    children: ReactNode;
}

const Dialog = ( {openDialog, closeDialog,children}: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openDialog) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [openDialog]);


    return (
        <dialog className="dialog" ref={dialogRef} onCancel={closeDialog}>
            {children}
        </dialog>
    );
}

export default Dialog;