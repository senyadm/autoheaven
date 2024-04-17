import { Suspense } from "react";
import Loading from "../Loading";
import SvgIcon from "../SvgIcon";
import { RootState, useAppSelector } from "../../app/GlobalRedux/store";

const MenuHeader = () => {
  const userSurname = useAppSelector((state: RootState) => state?.user);
  const userName = useAppSelector(
    (state: RootState) => state?.user?.user_info?.name
  );
  const fullName = `${userName} ${userSurname}`;
  const userEmail = useAppSelector((state: RootState) => state?.user?.email);
  return (
    <div className="flex items-center mb-4">
      <Suspense fallback={<Loading />}>
        <div className="mr-4 flex-shrink-0">
          <SvgIcon
            filepath="/icons/profile.svg"
            alt="Logo"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold ">{fullName}</span>
          <span className="text-foreground text-sm text-muted-foreground">
            {userEmail}
          </span>
        </div>
      </Suspense>
    </div>
  );
};

export default MenuHeader;
