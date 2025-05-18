/**
 * ProfileSettings component.
 * -----------------------------------
 *
 * Renders user profile settings UI, including:
 * - A toggleable form to update the user's password.
 * - A button to delete the user account, which opens a confirmation dialog.
 *
 * Functionality:
 * - Uses `useSession` to get the current user session.
 * - Allows toggling the password form visibility.
 * - On delete confirmation, calls `removeAccount` to delete the user's account.
 * - Signs out the user and redirects to the landingpage after successful deletion.
 */

"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { ChangePasswordForm } from "../form/change-password-form";
import { signOut, useSession } from "next-auth/react";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { removeAccount } from "@/app/actions/client-actions";

export const ProfileSettings = () => {
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handlePasswordForm = () => {
    setIsPasswordFormVisible(!isPasswordFormVisible);
  };

  const handleConfirmDelete = async () => {
    if (!session?.user.id) {
      toast.error("No user session found");
      return;
    }

    try {
      const result = await removeAccount(Number(session.user.id));

      if (result?.success) {
        toast.success("Account deleted successfully");
        setIsAlertOpen(false);

        await signOut({ callbackUrl: "/" });
      } else {
        toast.error("Failed to delete account", {
          description: result?.error || "Unknown error",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Unexpected error during deletion");
    }
  };
  return (
    <section className="flex flex-col w-[90%] lg:w-[92%] mx-auto gap-5 my-10 mt-20 lg:mt-40">
      <h1>Settings</h1>

      <div className="text-xl p-4 w-[100%] lg:w-[90%]  gap-4 mb-5 rounded-xl border border-slate-200 text-slate-950 shadow py-5">
        <button
          className="flex items-center justify-between cursor-pointer text-[20px] font-bold w-full"
          onClick={() => handlePasswordForm()}
        >
          Change password
          <GoPlus fontSize={35} aria-label="Plus icon" />
        </button>

        {isPasswordFormVisible && <ChangePasswordForm />}
      </div>

      <div className="text-xl p-4 w-[100%] lg:w-[90%] flex items-center justify-between gap-4 mb-5 rounded-xl border border-slate-200 text-slate-950 shadow">
        <h2>Delete account</h2>
        <button
          className="bg-[#E5484D] hover:bg-[#D43C40] text-white w-auto px-6 p-2 rounded-lg font-normal"
          onClick={() => setIsAlertOpen(true)}
        >
          Delete
        </button>
      </div>

      <DeleteConfirmationDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmDelete}
        item={"account"}
      />
    </section>
  );
};
