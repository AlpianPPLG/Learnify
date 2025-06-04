// Course types
export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  category: string;
  image: string;
  nextLesson: {
    title: string;
    date: string;
  };
  colorAccent: string;
}

// Schedule types
export interface ScheduleEvent {
  id: string;
  title: string;
  course: string;
  type: "lecture" | "workshop" | "assignment" | "exam";
  date: string;
  duration: number; // in minutes
  location: string;
}

// Mock courses data
export const courses: Course[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    description:
      "Learn the core concepts of web development including HTML, CSS, and JavaScript.",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    category: "Development",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    nextLesson: {
      title: "Advanced JavaScript Concepts",
      date: "2025-04-16T14:00:00",
    },
    colorAccent: "#3B82F6",
  },
  {
    id: "2",
    title: "Data Science Essentials",
    instructor: "Prof. Michael Chen",
    description:
      "Introduction to data analysis, visualization, and basic machine learning concepts.",
    progress: 45,
    totalModules: 10,
    completedModules: 4,
    category: "Data",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    nextLesson: {
      title: "Statistical Analysis Methods",
      date: "2025-04-17T10:30:00",
    },
    colorAccent: "#14B8A6",
  },
  {
    id: "3",
    title: "UX Design Principles",
    instructor: "Maya Rodriguez",
    description:
      "Master the fundamentals of user experience design and usability testing.",
    progress: 90,
    totalModules: 8,
    completedModules: 7,
    category: "Design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    nextLesson: {
      title: "Final Project Preparation",
      date: "2025-04-18T15:00:00",
    },
    colorAccent: "#F97316",
  },
  {
    id: "4",
    title: "Introduction to Machine Learning",
    instructor: "Dr. James Wilson",
    description:
      "Learn the fundamentals of machine learning algorithms and their applications.",
    progress: 15,
    totalModules: 15,
    completedModules: 2,
    category: "Data",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    nextLesson: {
      title: "Supervised Learning Techniques",
      date: "2025-04-19T13:15:00",
    },
    colorAccent: "#8B5CF6",
  },
];

// Mock schedule data
export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Web Development Live Session",
    course: "Web Development Fundamentals",
    type: "lecture",
    date: "2025-04-16T14:00:00",
    duration: 90,
    location: "Room 203",
  },
  {
    id: "2",
    title: "Data Science Lab",
    course: "Data Science Essentials",
    type: "workshop",
    date: "2025-04-17T10:30:00",
    duration: 120,
    location: "Computer Lab 2",
  },
  {
    id: "3",
    title: "UX Design Project Submission",
    course: "UX Design Principles",
    type: "assignment",
    date: "2025-04-18T23:59:00",
    duration: 0,
    location: "Online",
  },
  {
    id: "4",
    title: "Machine Learning Introduction",
    course: "Introduction to Machine Learning",
    type: "lecture",
    date: "2025-04-19T13:15:00",
    duration: 90,
    location: "Room 105",
  },
  {
    id: "5",
    title: "Web Development - Assignment #3",
    course: "Web Development Fundamentals",
    type: "assignment",
    date: "2025-04-15T23:59:00",
    duration: 0,
    location: "Online",
  },
  {
    id: "6",
    title: "Data Science Midterm Exam",
    course: "Data Science Essentials",
    type: "exam",
    date: "2025-04-25T09:00:00",
    duration: 180,
    location: "Exam Hall B",
  },
];

// Activity data for charts
export const weeklyActivity = [
  { day: "Monday", hours: 2.5 },
  { day: "Tuesday", hours: 1.8 },
  { day: "Wednesday", hours: 3.2 },
  { day: "Thursday", hours: 2.1 },
  { day: "Friday", hours: 1.5 },
  { day: "Saturday", hours: 4.0 },
  { day: "Sunday", hours: 2.7 },
];

// Course progress data for radar chart
export const skillProgress = [
  { subject: "HTML/CSS", score: 90 },
  { subject: "JavaScript", score: 75 },
  { subject: "React", score: 65 },
  { subject: "Node.js", score: 50 },
  { subject: "Database", score: 60 },
  { subject: "UI/UX", score: 70 },
];
