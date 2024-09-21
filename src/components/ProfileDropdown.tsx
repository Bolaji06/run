import { profileDropdownLinks } from "@/utils/links";

export default function ProfileDropdown() {
  return (
    <>
      <nav
        className="bg-gray-800 w-[200px] py-3 rounded-md text-slate-300
            absolute right-1"
      >
        <ul className="space-y-2">
          {profileDropdownLinks.map((item) => {
            return (
              <li className="" key={item.href}>
                <div className="inline-flex gap-2 items-center w-full py-1 hover:bg-gray-600">
                  <item.icon size={18} className="ml-2"/>
                  <a className="w-full px-1" href={item.href}>{item.name}</a>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
