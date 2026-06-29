import type { ChangeEvent } from "react";
import { Shield, Users, Wrench } from "lucide-react";

export type UserRole = "admin" | "pm" | "vendor";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  error?: string;
}

const roles = [
  {
    value: "admin" as UserRole,
    label: "Administrator",
    description: "Full system access and control",
    icon: Shield,
    color: "var(--gold)",
    bgColor: "rgba(201,161,74,0.12)",
    borderColor: "rgba(201,161,74,0.3)"
  },
  {
    value: "pm" as UserRole,
    label: "Property Manager",
    description: "Manage properties and work orders",
    icon: Users,
    color: "var(--blu)",
    bgColor: "rgba(111,168,199,0.12)",
    borderColor: "rgba(111,168,199,0.3)"
  },
  {
    value: "vendor" as UserRole,
    label: "Vendor",
    description: "Handle assigned work orders",
    icon: Wrench,
    color: "var(--teal)",
    bgColor: "rgba(95,179,168,0.12)",
    borderColor: "rgba(95,179,168,0.3)"
  }
];

export default function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as UserRole);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs text-[var(--t2)] uppercase tracking-[0.5px] font-semibold">
        Select Your Role
      </label>
      
      <div className="space-y-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = value === role.value;
          
          return (
            <label
              key={role.value}
              className={`
                relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:translate-x-1
                ${isSelected 
                  ? `bg-opacity-10 border-opacity-30 shadow-[0_0_0_4px_rgba(201,161,74,0.08)] animate-pulse` 
                  : 'bg-gray-800 border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value={role.value}
                checked={isSelected}
                onChange={handleRoleChange}
                className="sr-only"
              />
              
              {/* Role Icon */}
              <div 
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                  ${isSelected ? 'bg-[var(--surf3)] scale-110' : 'bg-[var(--surf3)]'}
                `}
              >
                <Icon 
                  className="w-5 h-5 transition-colors duration-200" 
                  style={{ color: isSelected ? role.color : 'var(--t2)' }}
                />
              </div>
              
              {/* Role Info */}
              <div className="flex-1">
                <div className="font-semibold text-[var(--t1)] text-sm">
                  {role.label}
                </div>
                <div className="text-xs text-[var(--t3)] mt-0.5">
                  {role.description}
                </div>
              </div>
              
              {/* Radio Indicator */}
              <div className={`
                w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                ${isSelected 
                  ? `border-[${role.color}] bg-[${role.color}]` 
                  : 'border-[var(--bord2)] bg-transparent'
                }
              `}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </label>
          );
        })}
      </div>
      
      {error && (
        <p className="text-xs text-[var(--red)] font-medium flex items-center gap-1">
          <span className="text-xs">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
