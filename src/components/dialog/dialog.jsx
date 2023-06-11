import { createContext, useState } from 'react';
import './dialog.css';

export const DialogContext = createContext();

export function DialogProvider({ children }) {
    const [DialogComponent, setDialog] = useState();
    const [open, setOpen] = useState(false);

    const openDialog = (newDialog) => {
        setDialog(newDialog);
        setOpen(true);
    }

    const closeDialog = () => {
        setDialog(undefined);
        setOpen(false);
    }

    return <DialogContext.Provider value={{ openDialog, open, DialogComponent, closeDialog }}>
        {children}
    </DialogContext.Provider>;
}

export function Dialog(props) {
    return <dialog></dialog>
}