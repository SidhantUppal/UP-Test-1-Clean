import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to a route that uses the (main) layout
  redirect('/home');
}