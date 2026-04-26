export type Mentor = {
  id: number;
  name: string;
  role: string;
  rating: number;
  sessions: number;
  emoji: string;
  tag: string;
  price: string;
  exp: string;
};

export type Workshop = {
  id: number;
  title: string;
  date: string;
  seats: number;
  emoji: string;
  price: string;
};

export const categories = [
  { emoji: '💻', label: 'Tech' },
  { emoji: '📈', label: 'Business' },
  { emoji: '🎨', label: 'Design' },
  { emoji: '📊', label: 'Finance' },
  { emoji: '🧠', label: 'Career' },
  { emoji: '🗣️', label: 'Soft Skills' },
];

export const mentorFilters = ['All', ...categories.map((category) => category.label)];

export const mentors: Mentor[] = [
  { id: 1, name: 'Priya Sharma', role: 'Product Manager @ Google', rating: 4.9, sessions: 234, emoji: '👩‍💼', tag: 'Tech', price: '₹1,500/hr', exp: '8 yrs' },
  { id: 2, name: 'Rahul Verma', role: 'SDE-3 @ Amazon', rating: 4.8, sessions: 189, emoji: '👨‍💻', tag: 'Tech', price: '₹1,200/hr', exp: '6 yrs' },
  { id: 3, name: 'Anita Nair', role: 'UX Lead @ Swiggy', rating: 4.95, sessions: 312, emoji: '👩‍🎨', tag: 'Design', price: '₹1,000/hr', exp: '7 yrs' },
  { id: 4, name: 'Vikram Singh', role: 'Startup Founder', rating: 4.7, sessions: 156, emoji: '👨‍🚀', tag: 'Business', price: '₹2,000/hr', exp: '10 yrs' },
  { id: 5, name: 'Neha Gupta', role: 'Data Scientist @ Flipkart', rating: 4.85, sessions: 98, emoji: '👩‍🔬', tag: 'Tech', price: '₹900/hr', exp: '5 yrs' },
  { id: 6, name: 'Arjun Mehta', role: 'Investment Banker', rating: 4.75, sessions: 201, emoji: '💰', tag: 'Finance', price: '₹1,800/hr', exp: '9 yrs' },
  { id: 7, name: 'Meera Iyer', role: 'Career Coach @ LinkedIn', rating: 4.88, sessions: 142, emoji: '👩‍🏫', tag: 'Career', price: '₹1,100/hr', exp: '8 yrs' },
  { id: 8, name: 'Kabir Anand', role: 'Communication Coach', rating: 4.82, sessions: 176, emoji: '👨‍🏫', tag: 'Soft Skills', price: '₹950/hr', exp: '6 yrs' },
];

export const workshops: Workshop[] = [
  { id: 1, title: 'Crack FAANG Interviews', date: 'Apr 28 • 6PM', seats: 12, emoji: '🚀', price: '₹499' },
  { id: 2, title: 'Build Your Portfolio', date: 'Apr 30 • 5PM', seats: 8, emoji: '🎨', price: '₹299' },
  { id: 3, title: 'Resume Masterclass', date: 'May 2 • 7PM', seats: 20, emoji: '📄', price: 'Free' },
  { id: 4, title: 'Startup Pitch Clinic', date: 'May 5 • 6PM', seats: 10, emoji: '📈', price: '₹399' },
  { id: 5, title: 'Speak With Confidence', date: 'May 8 • 7PM', seats: 16, emoji: '🗣️', price: '₹199' },
];

export function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function findCategoryLabel(value: string) {
  const query = normalizeSearch(value);
  return categories.find((category) => category.label.toLowerCase() === query)?.label;
}

export function mentorMatchesQuery(mentor: Mentor, value: string) {
  const query = normalizeSearch(value);

  if (!query) {
    return true;
  }

  return [mentor.name, mentor.role, mentor.tag].some((field) =>
    field.toLowerCase().includes(query)
  );
}
