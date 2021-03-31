import { useRouter } from 'next/router';
import React from 'react';
import { MainTemplate } from '../../components/Templates/Main';
import { Profile } from '../../components/Profile';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainTemplate title={"Профиль"} className="container" showHeader>
      <div className="mt-6">
        <Profile
          avatarUrl="https://sun9-65.userapi.com/s/v1/if2/tMf6TrjBv7zgUvEaPyn1JkQD_Zjg20j9-Oqao0pT4iatzNV-IWwE-uBsTETWPPi6U_bgEAgceOi2qjZYPsvK0dKP.jpg?size=200x0&quality=96&crop=704,0,1443,1443&ava=1"
          fullname="Max Tomanov"
          username="Maxim760"
          about="Test info"
        />
      </div>
    </MainTemplate>
  );
}
