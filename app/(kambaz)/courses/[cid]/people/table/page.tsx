"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";

export default function CoursePeoplePage() {
  const [users, setUsers] = useState<any[]>([]);
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");

  const fetchUsers = async () => {
    if (!cid) {
      setUsers([]);
      return;
    }
    const enrolledUsers = await client.findUsersForCourse(cid);
    setUsers(enrolledUsers);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
