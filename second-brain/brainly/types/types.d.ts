export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export interface BrainContent {
  _id: string;
  link: string;
  title: string;
  type: string;
  tags: string[];
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

export interface NotificationProps {
  message: string;
  duration: number; // duration in milliseconds
  animationDelay: number;
  variant?: "success" | "fail" | "neutral";
}

interface HeaderProps {
  loggedInUserHeader?: boolean;
}
