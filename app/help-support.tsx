import { ProfileInfoPage } from '../components/profile-info-page';

const sections = [
  {
    title: 'Booking Help',
    body: 'For session timing, mentor availability, or workshop joining issues, include the mentor or workshop name and the booking date when you contact support.',
  },
  {
    title: 'Account Support',
    body: 'If your name, email, phone number, or date of birth looks incorrect, update it from Edit Profile. For locked accounts or sign-in trouble, request help from support.',
  },
  {
    title: 'Payment Questions',
    body: 'For payment failures, duplicate charges, or refund questions, keep your booking reference ready so the support team can trace the transaction quickly.',
  },
  {
    title: 'Contact',
    body: 'Email support@mentorsarthi.com or use the in-app support chat when it is available. Typical response time is within one business day.',
  },
];

export default function HelpSupportScreen() {
  return (
    <ProfileInfoPage
      title="Help & Support"
      subtitle="Get help with bookings, account details, payments, and sessions"
      sections={sections}
    />
  );
}
