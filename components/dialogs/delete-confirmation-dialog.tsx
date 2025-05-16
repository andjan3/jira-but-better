/**
 * DeleteConfirmationDialog component.
 * -----------------------------------
 *
 * A reusable confirmation dialog to warn users before deleting an item.
 *
 * Props:
 * - isOpen: Controls whether the dialog is visible.
 * - onClose: Callback function to close the dialog without confirming.
 * - onConfirm: Callback function invoked when the user confirms deletion.
 * - item: A string representing the type of item being deleted (used in the dialog text).
 *
 * Features:
 * - Prevents accidental deletions by requiring explicit confirmation.
 * - Displays a warning that the action is irreversible.
 * - Provides cancel and continue buttons for user choice.
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: string;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  item,
}: AlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete your ${item}
            and remove your data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
