/**
 * LoginPage
 * -----------------
 * Displays the login form.
 * - Uses the `LoginForm` component to handle authentication input and logic.
 */

import { LoginForm } from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <main className="h-[85vh] w-[100%] flex justify-center items-center lg:mt-28 mt-16">
      <LoginForm />
    </main>
  );
}
