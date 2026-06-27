"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { name: "Sophie Martin", image: "avatar-10.webp" },
  { name: "Leo Anderson", image: "avatar-11.webp" },
  { name: "Chloe Thompson", image: "avatar-12.webp" },
  { name: "Max Rodriguez", image: "avatar-13.webp" },
];

export default function AvatarGroup() {
  return (
    <div className="flex items-center -space-x-2 *:ring-3 *:ring-background">
      {users.map((user, index) => (
        <Avatar key={index}>
          <AvatarImage
            src={`/images/avatar/${user.image}`}
            alt={user.name}
          />
          <AvatarFallback>
            {user.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
