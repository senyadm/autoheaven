import React, { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileOverview from "./ProfileOverview";
import ProfileSettings from "./ProfileSettings";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import ProfileAds from "./ProfileAds";
import ProfileMessages from "./ProfileMessages";
import ProfileCars from "./ProfileCars";
import { Locale } from "@/i18n.config";
import { getlocales } from "@/app/actions";
import { OverviewDictionary } from "@/types";

const ProfileContent = ({ lang }: { lang: Locale }) => {
  const profileComponentName = useSelector(
    (state: RootState) => state.profileNavigationMenu.menuItemName
  );
  const [dict, setDict] = useState<OverviewDictionary | null>(null);

  const userChats = useSelector(
    (state: RootState) => state?.user?.chats
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const { overview } = await getlocales(lang);
        setDict(overview);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }

    if (!dict) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  switch (profileComponentName) {
    case "edit":
      return <ProfileEdit lang={lang} />;
    case "settings":
      return <ProfileSettings lang={lang} />;
    case "ads":
      return <ProfileAds />;
    case "messages":
      return <ProfileMessages userChats={userChats}/>;
    case "cars":
      return <ProfileCars />;
    default:
      return <ProfileOverview overview={dict} />;
  }
};

export default ProfileContent;
