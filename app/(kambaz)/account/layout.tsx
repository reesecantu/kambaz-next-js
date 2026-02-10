import { ReactNode } from "react";
import ProfileNavigation from "./ProfileNavigation";


export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              {" "}
              <ProfileNavigation />{" "}
            </td>
            <td valign="top" width="100%">
              {" "}
              {children}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
