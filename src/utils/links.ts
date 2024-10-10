
import { Briefcase, User, ReceiptText, LogOut } from "lucide-react"

export const profileDropdownLinks = [
    {
        name: 'Workspace',
        href: '/workspace',
        icon: Briefcase,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: User,
    },
    {
        name: 'Support',
        href: '/support',
        icon: ReceiptText,
    },
    // {
    //     name: 'Logout',
    //     href: '/logout',
    //     icon: LogOut
    // },
]