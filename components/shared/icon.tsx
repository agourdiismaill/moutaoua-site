import {
  Eye,
  UserPlus,
  TrendingUp,
  Megaphone,
  Target,
  Search,
  Workflow,
  LayoutTemplate,
  Share2,
  Database,
  Facebook,
  ClipboardList,
  MessageCircle,
  Music2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Eye,
  UserPlus,
  TrendingUp,
  Megaphone,
  Target,
  Search,
  Workflow,
  LayoutTemplate,
  Share2,
  Database,
  Facebook,
  ClipboardList,
  MessageCircle,
  Music2,
  Sparkles,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
