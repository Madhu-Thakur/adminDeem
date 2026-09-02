import {
  Users,
  FileText,
  UserRound,
  GraduationCap,
  User,
  UsersRound,
  IndianRupee,
  ListTodo,
  MessageSquare,
  UserPlus,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";

export const modules = [
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Invoices",
    icon: FileText,
    path: "/invoices",
  },
  {
    title: "Employees",
    icon: UserRound,
    path: "/employees",
  },
  {
    title: "Students",
    icon: GraduationCap,
    path: "/students",
  },
  {
    title: "Users",
    icon: User,
    path: "/users",
  },
  {
    title: "Teams",
    icon: UsersRound,
    path: "/teams",
  },
  {
    title: "Accounts",
    icon: IndianRupee,
    path: "/accounts/voucher",
  },
  {
    title: "Tasks",
    icon: ListTodo,
    path: "/tasks",
  },
  {
    title: "Interview",
    icon: MessageSquare,
    path: "/interview",
  },
  {
    title: "New Joining",
    icon: UserPlus,
    path: "/new-joining",
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    path: "/attendance",
  },
  {
    title: "Leave",
    icon: ClipboardList,
    path: "/leave",
  },
];
