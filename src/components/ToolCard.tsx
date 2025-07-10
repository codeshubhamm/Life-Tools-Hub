
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  bgColor?: string;
  style?: React.CSSProperties;
}

const ToolCard = ({ title, description, icon: Icon, path, style }: ToolCardProps) => {
  return (
    <Link to={path} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl">
      <div
        className={`tool-card transition-transform duration-200 ease-out group-hover:scale-105 group-focus:scale-105 relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700`}
        tabIndex={0}
        aria-label={title}
        style={style}
      >
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* 3D Emoji/Icon */}
          <div className="relative p-4 bg-white/40 dark:bg-white/10 rounded-2xl backdrop-blur-sm tool-icon border border-white/20">
            <Icon className="h-10 w-10 text-gray-700 dark:text-gray-300" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
