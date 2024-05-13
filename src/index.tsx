import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventCardsContainer from "./components/EventsPage/EventCardsContainer";
import LayoutPage from "./components/LayoutPage";
import RegisterForm from "./components/RegisterPage.tsx/RegisterForm";
import EventsViewPage from "./components/EventsViewPage/EventsViewPage";
import { EventsProvider } from "./helpers/EventsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <EventsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route path="/" element={<EventCardsContainer />} />
            <Route
              path="/events/register/:eventId"
              element={<RegisterForm />}
            />
            <Route
              path="/events/participants/:eventId"
              element={<EventsViewPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </EventsProvider>
  </React.StrictMode>
);
