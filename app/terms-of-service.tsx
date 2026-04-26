import { ProfileInfoPage } from '../components/profile-info-page';

const sections = [
  {
    title: 'Using MentorSarthi',
    body: 'MentorSarthi connects mentees with mentors for guidance, workshops, and learning sessions. Use the platform respectfully and provide accurate booking and profile details.',
  },
  {
    title: 'Sessions and Bookings',
    body: 'Booked sessions should be attended on time. If a session needs to be changed, use the booking flow or support options so both mentor and mentee have clear notice.',
  },
  {
    title: 'Community Conduct',
    body: 'Harassment, abusive language, spam, or misuse of mentor information is not allowed. Accounts may be limited when platform trust or user safety is affected.',
  },
  {
    title: 'Payments',
    body: 'Paid sessions and workshops show their price before booking. Any refunds or payment issues should be raised through Help & Support with the booking details.',
  },
];

export default function TermsOfServiceScreen() {
  return (
    <ProfileInfoPage
      title="Terms of Service"
      subtitle="The rules for using MentorSarthi sessions and workshops"
      sections={sections}
    />
  );
}
