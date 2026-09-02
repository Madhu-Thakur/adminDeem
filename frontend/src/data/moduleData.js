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
    path: "/accounts/voucher/sale",
    children: [
      {
        title: "Voucher",
        children: [
          { title: "Sale Voucher", path: "/accounts/voucher/sale", type: "sale" },
          {
            title: "Purchase Voucher",
            path: "/accounts/voucher/purchase",
            type: "purchase",
          },
        ],
      },
    ],
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