/**
 * RegisterPage
 * -----------------
 * Displays the registration form
 * - Uses the `RegisterForm` component to handle to handle user input, validation, and submission.
 */

import { RegisterForm } from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <section className="h-[85vh] w-[100%] flex justify-center items-center lg:mt-28 mt-16">
      <RegisterForm />
    </section>
  );
}
