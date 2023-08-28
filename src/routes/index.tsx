import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { BoardsInProfile, Pins } from '@/components';
import { Home, Login, Logout, NoMatch } from '@/pages';
import { BottomSlideover, MainLayout, ProfileLayout } from '@/pages/Layouts';

export const AppRouter = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="p">
            <Route index element={<NoMatch />} />
            <Route path=":npub" element={<ProfileLayout />}>
              <Route index element={<BoardsInProfile />} />
              <Route path=":title" element={<Pins />} />
            </Route>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="p" element={<BottomSlideover />}>
            <Route index element={<NoMatch />} />
            <Route path=":npub" element={<ProfileLayout />}>
              <Route index element={<BoardsInProfile />} />
              <Route path=":title" element={<Pins />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
