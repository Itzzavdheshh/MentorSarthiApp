import { ProfileInfoPage } from '../components/profile-info-page';

const sections = [
  {
    title: 'Information We Use',
    body: 'Your profile details, booking activity, saved mentors, and support messages help us personalize mentoring, show relevant sessions, and keep your account usable.',
  },
  {
    title: 'How Data Helps Your Experience',
    body: 'Name and email are used across your profile and booking flows. Phone number and date of birth help with account verification, scheduling, and support context.',
  },
  {
    title: 'Data Protection',
    body: 'We keep account data limited to the platform experience and protect it from unnecessary access. Sensitive account updates should be made only from your own device.',
  },
  {
    title: 'Your Choices',
    body: 'You can update profile details from Edit Profile. For privacy questions, corrections, or removal requests, contact support from the Help & Support page.',
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <ProfileInfoPage
      title="Privacy Policy"
      subtitle="How your profile and mentoring data are handled"
      sections={sections}
    />
  );
}
