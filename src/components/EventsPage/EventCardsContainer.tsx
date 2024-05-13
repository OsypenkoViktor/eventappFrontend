import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { IGetEventsResponse, IEvent, SortBy } from "../../helpers/types";
import EventCard from "./EventCard";
import { Spin, notification } from "antd";
import SearchBar from "../SearchBar";
import SortSelect from "./SortSelect";
import useSortedEvents from "../../helpers/useSortedEvents";
import { useEvents } from "../../helpers/EventsContext";

const EventCardsContainer = () => {
  //поточний список івентів
  const { events, setEvents } = useEvents();
  //стейт для формування запиту на сервер
  //і отримання нової порції данних
  const [currentPage, setCurrentPage] = useState(1);
  //обраний тип сортування івентів
  const [sortingType, setSortingType] = useState<SortBy | undefined>(undefined);
  const [error, setError] = useState();
  const isFetching = useRef(false);
  const contentCardRef = useRef<HTMLDivElement>(null);
  //кастомний хук для сортування івентів
  const sortedEvents = useSortedEvents(events, sortingType);

  useEffect(() => {
    getEvents();
  }, [currentPage]);

  /* реалізація динамічного довантаження контенту
   *  після скролу до кінця поточного списку івентів
   */
  useEffect(() => {
    const debouncedPageEndDetector = debounce(pageEndDetector, 200);
    if (contentCardRef.current !== null) {
      const contentCard = document.getElementById("contentCard");

      contentCard!.addEventListener("scroll", debouncedPageEndDetector);

      return () => {
        contentCard!.removeEventListener("scroll", debouncedPageEndDetector);
      };
    }
  }, [events]);

  async function getEvents() {
    await axios
      .get<IGetEventsResponse>(
        (process.env.REACT_APP_BASE_API_URL as string) + "/events",
        {
          params: {
            _page: currentPage,
          },
        }
      )
      .then((res) => {
        if (events) {
          const newEvents = res.data.events.filter(
            (event) =>
              !events.find((existingEvent) => existingEvent.id === event.id)
          );
          setEvents([...events, ...newEvents]);
        } else {
          setEvents(res.data.events);
        }
        isFetching.current = false;
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function pageEndDetector() {
    if (isFetching.current) return;
    const contentCard = document.getElementById("scrolContent");
    const contentCardPosition = contentCard!.getBoundingClientRect();
    if (contentCardPosition.bottom <= window.innerHeight) {
      setCurrentPage((currentPage) => currentPage + 1);
      isFetching.current = true;
    }
  }

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  /* колбек-функція для оновлення стейту обраного сортування з дочірнього
   *  селект-компонента
   */
  function refreshSortingType(searchType: SortBy) {
    setSortingType(searchType);
  }

  if (!events)
    return (
      <>
        <Spin />
      </>
    );

  return (
    <>
      <SortSelect refreshSortingType={refreshSortingType} />
      <h1>Events list</h1>
      <div ref={contentCardRef} style={contentContainerStyle} id="contentCard">
        <div style={contentStyle} id="scrolContent">
          {sortedEvents?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventCardsContainer;

const contentContainerStyle: React.CSSProperties = {
  backgroundColor: "#85dcb0",
  height: "70vh",
  padding: "25px",
  width: "100%",
  borderRadius: 10,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "20px",
  alignItems: "center",
  overflowY: "auto",
};

const contentStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "20px",
  alignItems: "center",
};
