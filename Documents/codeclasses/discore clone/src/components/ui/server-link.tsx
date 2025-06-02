import React from "react";
import { NavLink } from "react-router-dom";

/**
 * ServerLinks Component
 * Reusable navigation link component for sidebar with fixed and variable classes.
 * - activeColor: Tailwind color class for active state (e.g., 'bg-blue-500')
 * - hoverColor: Tailwind color class for hover state (e.g., 'hover:bg-red-500')
 * The shape classes (rounded-2xl, rounded-3xl hover:rounded-2xl) are always applied.
 */
export function ServerLinks({
  to,
  activeColor = "bg-brand",
  hoverColor = "hover:bg-brand",
  children,
  ...rest
}: {
  to: string;
  activeColor?: string; // e.g. 'bg-blue-500'
  hoverColor?: string; // e.g. 'hover:bg-red-500'
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive }: { isActive: boolean }) =>
        `group relative grid size-12 place-content-center text-gray-100 transition-all duration-200 hover:rounded-2xl hover:text-white active:translate-y-px ` +
        (isActive
          ? `rounded-2xl ${activeColor} text-white`
          : `rounded-3xl bg-gray-700 text-gray-100 hover:rounded-2xl ${hoverColor} transition-all duration-200 hover:text-white`)
      }
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div
            className={`absolute top-1/2 -left-3 h-5 w-1 origin-left -translate-y-1/2 rounded-r bg-white transition-all duration-200 ${
              isActive ? "h-10 scale-100 opacity-100" : "scale-0 opacity-0"
            } group-hover:scale-100 group-hover:opacity-100`}
          ></div>
          <div
            className={
              `relative size-full overflow-hidden transition-all duration-200 ` +
              (isActive ? "rounded-2xl" : "rounded-3xl group-hover:rounded-2xl")
            }
          >
            {children}
          </div>
        </>
      )}
    </NavLink>
  );
}
